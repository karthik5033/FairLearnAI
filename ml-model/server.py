from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import uvicorn
import os

app = FastAPI(title="FairLearnAI Classification API")

MODEL_PATH = "./model_output"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

print(f"Loading model from {MODEL_PATH} on {DEVICE}...")

# Global model variables
model = None
tokenizer = None
id2label = {
    0: 'ALLOWED',
    1: 'DISALLOWED',
    2: 'HINT_ONLY',
    3: 'OFF_TOPIC'
}

@app.on_event("startup")
async def load_model():
    global model, tokenizer
    try:
        if os.path.exists(MODEL_PATH):
            tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH)
            model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
            model.to(DEVICE)
            model.eval()
            print("✅ Model loaded successfully!")
        else:
            print("⚠️ Model not found at path. Please train it first.")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

class PromptRequest(BaseModel):
    prompt: str

@app.post("/predict")
async def predict_prompt(req: PromptRequest):
    if not model or not tokenizer:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    inputs = tokenizer(
        req.prompt, 
        return_tensors="pt", 
        truncation=True, 
        max_length=128, 
        padding=True
    ).to(DEVICE)
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.nn.functional.softmax(logits, dim=1)
        pred_idx = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred_idx].item()
    
    label = id2label.get(pred_idx, "UNKNOWN")
    
    reason = "AI Model Prediction"
    if label == "DISALLOWED":
        reason = "Content flagged as potential academic dishonesty."
    elif label == "HINT_ONLY":
        reason = "Educational inquiry requiring guidance, not answers."
        
    return {
        "label": label,
        "confidence": confidence,
        "reason": reason
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
