from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
from typing import List, Dict
import uvicorn
import os
import sys
import logging
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.dirname(script_dir)  # Go up one level to the project root

logger.info(f"Script directory: {script_dir}")
logger.info(f"Base directory: {base_dir}")

# Load model and encoders
try:
    model_path = os.path.join(base_dir, "LogReg.pkl")
    le_path = os.path.join(base_dir, "label_encoders.pkl")
    column_transformer_path = os.path.join(base_dir, "column_transformer.pkl")
    y_encoder_path = os.path.join(base_dir, "y_encoder.pkl")
    
    logger.info(f"Loading model from: {model_path}")
    logger.info(f"Loading label encoders from: {le_path}")
    logger.info(f"Loading column transformer from: {column_transformer_path}")
    logger.info(f"Loading y encoder from: {y_encoder_path}")
    
    # Check if files exist
    for file_path in [model_path, le_path, column_transformer_path, y_encoder_path]:
        if not os.path.exists(file_path):
            logger.error(f"File not found: {file_path}")
            raise FileNotFoundError(f"File not found: {file_path}")
    
    model = joblib.load(model_path)
    logger.info("Model loaded successfully")
    
    le = joblib.load(le_path)
    logger.info("Label encoders loaded successfully")
    
    column_transformer = joblib.load(column_transformer_path)
    logger.info("Column transformer loaded successfully")
    
    y_encoder = joblib.load(y_encoder_path)
    logger.info("Y encoder loaded successfully")
    
except Exception as e:
    logger.error(f"Error loading model files: {str(e)}")
    raise

class CropPrediction(BaseModel):
    crop: str
    probability: float

class CropRequest(BaseModel):
    state: str
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    soil_type: str
    land_size: float

def preprocess_input(data: pd.DataFrame):
    try:
        logger.info(f"Preprocessing input data: {data.head()}")
        # Apply label encoding
        for col, encoder in le.items():
            if col in data.columns:
                # Handle unseen labels
                if not data[col].isin(encoder.classes_).all():
                    invalid = data[col][~data[col].isin(encoder.classes_)].unique()
                    logger.warning(f"Invalid {col} value(s): {invalid}. Allowed values: {encoder.classes_.tolist()}")
                    raise ValueError(f"Invalid {col} value(s): {invalid}. Allowed values: {encoder.classes_.tolist()}")
                data[col] = encoder.transform(data[col])
        
        # Apply column transformations
        if column_transformer:
            data = column_transformer.transform(data)
        
        logger.info("Data preprocessing completed successfully")
        return data
    except Exception as e:
        logger.error(f"Error in preprocessing: {str(e)}")
        raise

@app.post("/predict", response_model=List[CropPrediction])
async def predict(request: CropRequest):
    try:
        logger.info(f"Received prediction request: {request}")
        # Convert request to DataFrame and capitalize state and soil type
        input_data = request.dict()
        input_data['state'] = input_data['state'].capitalize()  # Capitalize state
        input_data['Soil Type'] = input_data.pop('soil_type').capitalize()  # Capitalize soil type
        
        df = pd.DataFrame([input_data])
        logger.info(f"Created dataframe: {df.to_dict()}")

        # Preprocess data
        processed_data = preprocess_input(df)

        # Make prediction
        probabilities = model.predict_proba(processed_data)[0]
        
        # Get top 5 predictions
        top5_idx = np.argsort(probabilities)[-5:][::-1]
        crops = y_encoder.inverse_transform(top5_idx)
        scores = probabilities[top5_idx]
        
        logger.info(f"Prediction results: {list(zip(crops, scores))}")

        return [{"crop": crop, "probability": float(score)} 
                for crop, score in zip(crops, scores)]
        
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Crop Recommendation API - Send POST requests to /predict"}

if __name__ == "__main__":
    logger.info("Starting FastAPI server on http://127.0.0.1:8000")
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000)
    except Exception as e:
        logger.error(f"Error starting server: {str(e)}")
        raise 