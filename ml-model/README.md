# FairLearnAI Machine Learning Model

This directory contains the training scripts and API server for the advanced cheating detection model.

## Setup

Ensure you have Python 3.8+ installed (Anaconda recommended).

1. Install dependencies:
   ```bash
   pip install torch transformers pandas scikit-learn fastapi uvicorn
   ```

## Training the Model

To train the model on your GPU (RTX 4060):

```bash
python ml-model/train.py
```

This script will:
1. Load ~200k samples from the `dataset/` folder.
2. Clean and merge the data (removing ~150k duplicates/overlaps).
3. Fine-tune `distilbert-base-uncased` on your GPU.
4. Save the trained model to `model_output/`.

## Running the API

Once trained, start the specialized inference server:

```bash
python ml-model/server.py
```

The API runs at `http://localhost:8000`.

## Integration

The Next.js web app is configured to automatically check `localhost:8000` for deep learning predictions. If the API is offline, it falls back to keyword matching.
