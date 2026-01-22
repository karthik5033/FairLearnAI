import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, roc_auc_score
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import os
import glob

# --- Configuration ---
DATA_DIR = 'dataset'
MODEL_PATH = './model_output'
MAX_LEN = 128
BATCH_SIZE = 32

print("📊 Generating Advanced Performance Report...")

# 1. Load Data (Same logic as training to ensure consistency)
csv_files = glob.glob(os.path.join(DATA_DIR, '*.csv'))
dfs = []
for file in csv_files:
    try:
        df = pd.read_csv(file)
        df.columns = [c.lower().strip() for c in df.columns]
        if 'prompt' in df.columns and 'label' in df.columns:
            dfs.append(df[['prompt', 'label']])
    except: pass

full_df = pd.concat(dfs, ignore_index=True)
full_df.drop_duplicates(subset=['prompt'], inplace=True)
full_df.dropna(subset=['prompt', 'label'], inplace=True)
full_df['prompt'] = full_df['prompt'].astype(str).str.strip()

label_map = {'ALLOWED': 0, 'DISALLOWED': 1, 'HINT_ONLY': 2, 'OFF_TOPIC': 3}
full_df = full_df[full_df['label'].isin(label_map.keys())]
full_df['label_id'] = full_df['label'].map(label_map)

# Split (Recreating the validation set)
_, val_df = train_test_split(full_df, test_size=0.1, random_state=42, stratify=full_df['label'])

print(f"   Testing on {len(val_df)} unseen samples.")

# 2. Load Model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
model.to(device)
model.eval()

# 3. Inference Loop
y_true = []
y_pred = []
y_probs = []

print("   Running inference...", end="")

batch_size = 64
prompts = val_df['prompt'].tolist()
labels = val_df['label_id'].tolist()

with torch.no_grad():
    for i in range(0, len(prompts), batch_size):
        batch_prompts = prompts[i:i+batch_size]
        batch_labels = labels[i:i+batch_size]
        
        inputs = tokenizer(batch_prompts, return_tensors="pt", padding=True, truncation=True, max_length=MAX_LEN).to(device)
        outputs = model(**inputs)
        
        logits = outputs.logits
        probs = torch.nn.functional.softmax(logits, dim=1)
        preds = torch.argmax(probs, dim=1)
        
        y_true.extend(batch_labels)
        y_pred.extend(preds.cpu().numpy())
        y_probs.extend(probs.cpu().numpy())
        
        if i % 1000 == 0: print(".", end="")

print("\n")

# 4. Metrics
print("="*60)
print("             🤖 AI MODEL PERFORMANCE REPORT             ")
print("="*60)

acc = accuracy_score(y_true, y_pred)
print(f"\n✅ OVERALL ACCURACY: {acc:.4f} ({acc*100:.2f}%)")

print("\n📊 DETAILED CLASSIFICATION REPORT:\n")
target_names = ['ALLOWED', 'DISALLOWED', 'HINT_ONLY', 'OFF_TOPIC']
print(classification_report(y_true, y_pred, target_names=target_names, labels=[0, 1, 2, 3], digits=4))

print("\n🧩 CONFUSION MATRIX (Row=True, Col=Pred):\n")
cm = confusion_matrix(y_true, y_pred, labels=[0, 1, 2, 3])
print(f"{'':<12} {'ALLOWED':<10} {'DISALLOWED':<10} {'HINT':<10} {'OFF_TOPIC':<10}")
for i, row in enumerate(cm):
    print(f"{target_names[i]:<12} {row[0]:<10} {row[1]:<10} {row[2]:<10} {row[3]:<10}")

print("\n" + "="*60)
