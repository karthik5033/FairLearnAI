import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import os

# This assumes your server.py successfully loaded the model
# We'll load it the same way and save it properly

MODEL_PATH = './model_output'

print("🔄 Checking if model exists...")
if os.path.exists(MODEL_PATH):
    print(f"✅ Model folder found at {MODEL_PATH}")
    
    # Try to load and verify
    try:
        tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH)
        model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
        print("✅ Model loaded successfully!")
        
        # Re-save to ensure all files are present
        model.save_pretrained(MODEL_PATH)
        tokenizer.save_pretrained(MODEL_PATH)
        print(f"✅ Model re-saved to {MODEL_PATH}")
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
else:
    print(f"❌ Model folder not found at {MODEL_PATH}")
    print("   You need to train the model first or copy it from another location.")
