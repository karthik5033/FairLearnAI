import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification, get_linear_schedule_with_warmup
from torch.optim import AdamW
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from tqdm import tqdm
import os
import glob
import numpy as np

# --- Configuration ---
DATA_DIR = 'dataset'
OUTPUT_DIR = './model_output'
MODEL_NAME = 'distilbert-base-uncased'
MAX_LEN = 128
BATCH_SIZE = 32  # Good for RTX 4060
EPOCHS = 2
LEARNING_RATE = 2e-5

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# --- 1. Data Loading & Cleaning ---
print("🚀 Loading and cleaning datasets...")

csv_files = glob.glob(os.path.join(DATA_DIR, '*.csv'))
dfs = []

for file in csv_files:
    try:
        print(f"   Reading {file}...")
        df = pd.read_csv(file)
        # Normalize columns just in case
        df.columns = [c.lower().strip() for c in df.columns]
        if 'prompt' in df.columns and 'label' in df.columns:
            dfs.append(df[['prompt', 'label']])
        else:
            print(f"   ⚠️ Skipping {file}: Missing 'prompt' or 'label' columns.")
    except Exception as e:
        print(f"   ❌ Error reading {file}: {e}")

if not dfs:
    print("❌ No valid datasets found! Exiting.")
    exit(1)

full_df = pd.concat(dfs, ignore_index=True)
print(f"   Total raw samples: {len(full_df)}")

# Remove duplicates
full_df.drop_duplicates(subset=['prompt'], inplace=True)
# Remove Nulls
full_df.dropna(subset=['prompt', 'label'], inplace=True)
# Clean text lightly
full_df['prompt'] = full_df['prompt'].astype(str).str.strip()

print(f"   Cleaned samples: {len(full_df)}")

# Label Mapping
label_map = {
    'ALLOWED': 0,
    'DISALLOWED': 1,
    'HINT_ONLY': 2,
    'OFF_TOPIC': 3
}

# Inverse map for reporting
id2label = {v: k for k, v in label_map.items()}

# Filter unknown labels
full_df = full_df[full_df['label'].isin(label_map.keys())]
full_df['label_id'] = full_df['label'].map(label_map)

print(f"   Final Training Set Size: {len(full_df)}")
print("   Class Distribution:")
print(full_df['label'].value_counts())

# --- 2. Dataset Preparation ---
class TextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, item):
        text = str(self.texts[item])
        label = self.labels[item]

        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

# Split Data
train_df, val_df = train_test_split(full_df, test_size=0.1, random_state=42, stratify=full_df['label'])

tokenizer = DistilBertTokenizer.from_pretrained(MODEL_NAME)

train_dataset = TextDataset(
    texts=train_df.prompt.to_numpy(),
    labels=train_df.label_id.to_numpy(),
    tokenizer=tokenizer,
    max_len=MAX_LEN
)

val_dataset = TextDataset(
    texts=val_df.prompt.to_numpy(),
    labels=val_df.label_id.to_numpy(),
    tokenizer=tokenizer,
    max_len=MAX_LEN
)

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, num_workers=0)

# --- 3. Model Setup ---
print("\n🧠 Initializing GPU Model...")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"   Using device: {device}")

model = DistilBertForSequenceClassification.from_pretrained(
    MODEL_NAME, 
    num_labels=len(label_map)
)
model = model.to(device)

optimizer = AdamW(model.parameters(), lr=LEARNING_RATE)
total_steps = len(train_loader) * EPOCHS
scheduler = get_linear_schedule_with_warmup(
    optimizer,
    num_warmup_steps=0,
    num_training_steps=total_steps
)

loss_fn = torch.nn.CrossEntropyLoss().to(device)

# --- 4. Training Loop ---
def train_epoch(model, data_loader, loss_fn, optimizer, device, scheduler, n_examples):
    model = model.train()
    losses = []
    correct_predictions = 0
    
    progress_bar = tqdm(data_loader, desc="Training", unit="batch")
    
    for d in progress_bar:
        input_ids = d["input_ids"].to(device)
        attention_mask = d["attention_mask"].to(device)
        targets = d["labels"].to(device)

        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        
        logits = outputs.logits
        preds = torch.argmax(logits, dim=1)
        loss = loss_fn(logits, targets)

        correct_predictions += torch.sum(preds == targets)
        losses.append(loss.item())

        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()
        scheduler.step()
        optimizer.zero_grad()
        
        progress_bar.set_postfix(loss=np.mean(losses))

    return correct_predictions.double() / n_examples, np.mean(losses)

def eval_model(model, data_loader, loss_fn, device, n_examples):
    model = model.eval()
    losses = []
    correct_predictions = 0

    with torch.no_grad():
        for d in tqdm(data_loader, desc="Evaluating", unit="batch"):
            input_ids = d["input_ids"].to(device)
            attention_mask = d["attention_mask"].to(device)
            targets = d["labels"].to(device)

            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask
            )
            
            logits = outputs.logits
            preds = torch.argmax(logits, dim=1)
            loss = loss_fn(logits, targets)

            correct_predictions += torch.sum(preds == targets)
            losses.append(loss.item())

    return correct_predictions.double() / n_examples, np.mean(losses)

# Run Training
print(f"\n🔥 Starting Training for {EPOCHS} epochs...")

best_accuracy = 0

for epoch in range(EPOCHS):
    print(f"\nEpoch {epoch + 1}/{EPOCHS}")
    print('-' * 10)

    train_acc, train_loss = train_epoch(
        model,
        train_loader,
        loss_fn,
        optimizer,
        device,
        scheduler,
        len(train_df)
    )

    print(f"   Train loss {train_loss} accuracy {train_acc}")

    val_acc, val_loss = eval_model(
        model,
        val_loader,
        loss_fn,
        device,
        len(val_df)
    )

    print(f"   Val   loss {val_loss} accuracy {val_acc}")

    if val_acc > best_accuracy:
        print("   🏆 New best model! Saving...")
        model.save_pretrained(OUTPUT_DIR)
        tokenizer.save_pretrained(OUTPUT_DIR)
        best_accuracy = val_acc

print("\n✅ Training Complete.")
print(f"Best Validation Accuracy: {best_accuracy}")
