from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import uvicorn
import logging
import json
import math
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

# In-memory implementation of crop prediction
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

# Crop requirements based on research
CROP_REQUIREMENTS = {
    'Rice': {
        'N': {'min': 80, 'max': 120, 'weight': 0.15},
        'P': {'min': 30, 'max': 60, 'weight': 0.1},
        'K': {'min': 40, 'max': 80, 'weight': 0.1},
        'ph': {'min': 5.5, 'max': 6.8, 'weight': 0.15},
        'temperature': {'min': 22, 'max': 32, 'weight': 0.2},
        'humidity': {'min': 70, 'max': 90, 'weight': 0.15},
        'rainfall': {'min': 200, 'max': 300, 'weight': 0.25},
    },
    'Wheat': {
        'N': {'min': 60, 'max': 100, 'weight': 0.2},
        'P': {'min': 30, 'max': 60, 'weight': 0.1},
        'K': {'min': 25, 'max': 50, 'weight': 0.1},
        'ph': {'min': 6.0, 'max': 7.5, 'weight': 0.1},
        'temperature': {'min': 15, 'max': 25, 'weight': 0.2},
        'humidity': {'min': 40, 'max': 65, 'weight': 0.1},
        'rainfall': {'min': 75, 'max': 150, 'weight': 0.2},
    },
    'Maize': {
        'N': {'min': 50, 'max': 90, 'weight': 0.15},
        'P': {'min': 25, 'max': 45, 'weight': 0.1},
        'K': {'min': 40, 'max': 80, 'weight': 0.15},
        'ph': {'min': 5.8, 'max': 7.0, 'weight': 0.1},
        'temperature': {'min': 20, 'max': 30, 'weight': 0.2},
        'humidity': {'min': 50, 'max': 75, 'weight': 0.1},
        'rainfall': {'min': 150, 'max': 250, 'weight': 0.2},
    },
    'Cotton': {
        'N': {'min': 40, 'max': 80, 'weight': 0.1},
        'P': {'min': 20, 'max': 40, 'weight': 0.1},
        'K': {'min': 50, 'max': 70, 'weight': 0.15},
        'ph': {'min': 6.0, 'max': 8.0, 'weight': 0.1},
        'temperature': {'min': 25, 'max': 35, 'weight': 0.25},
        'humidity': {'min': 40, 'max': 70, 'weight': 0.1},
        'rainfall': {'min': 150, 'max': 200, 'weight': 0.2},
    },
    'Chickpea': {
        'N': {'min': 20, 'max': 40, 'weight': 0.1},
        'P': {'min': 30, 'max': 60, 'weight': 0.15},
        'K': {'min': 20, 'max': 40, 'weight': 0.1},
        'ph': {'min': 6.0, 'max': 8.0, 'weight': 0.1},
        'temperature': {'min': 18, 'max': 28, 'weight': 0.15},
        'humidity': {'min': 30, 'max': 60, 'weight': 0.15},
        'rainfall': {'min': 60, 'max': 150, 'weight': 0.25},
    },
    'Sugarcane': {
        'N': {'min': 80, 'max': 150, 'weight': 0.15},
        'P': {'min': 40, 'max': 80, 'weight': 0.1},
        'K': {'min': 80, 'max': 150, 'weight': 0.15},
        'ph': {'min': 6.0, 'max': 7.5, 'weight': 0.1},
        'temperature': {'min': 20, 'max': 35, 'weight': 0.2},
        'humidity': {'min': 70, 'max': 90, 'weight': 0.1},
        'rainfall': {'min': 200, 'max': 300, 'weight': 0.2},
    },
    'Potato': {
        'N': {'min': 60, 'max': 120, 'weight': 0.15},
        'P': {'min': 50, 'max': 100, 'weight': 0.15},
        'K': {'min': 80, 'max': 120, 'weight': 0.15},
        'ph': {'min': 5.5, 'max': 6.5, 'weight': 0.15},
        'temperature': {'min': 15, 'max': 25, 'weight': 0.15},
        'humidity': {'min': 60, 'max': 80, 'weight': 0.1},
        'rainfall': {'min': 120, 'max': 180, 'weight': 0.15},
    },
    'Mustard': {
        'N': {'min': 40, 'max': 80, 'weight': 0.15},
        'P': {'min': 20, 'max': 50, 'weight': 0.15},
        'K': {'min': 20, 'max': 50, 'weight': 0.15},
        'ph': {'min': 6.0, 'max': 7.5, 'weight': 0.1},
        'temperature': {'min': 15, 'max': 25, 'weight': 0.2},
        'humidity': {'min': 50, 'max': 70, 'weight': 0.1},
        'rainfall': {'min': 80, 'max': 160, 'weight': 0.15},
    }
}

def predict_crop_suitability(data):
    """
    Predict crop suitability based on soil and climate parameters
    """
    N = data.N
    P = data.P
    K = data.K
    ph = data.ph
    temperature = data.temperature
    humidity = data.humidity
    rainfall = data.rainfall
    state = data.state
    
    # Calculate suitability scores
    results = []
    for crop, requirements in CROP_REQUIREMENTS.items():
        total_score = 0
        total_weight = 0
        
        for param, value in [
            ("N", N), ("P", P), ("K", K), ("ph", ph),
            ("temperature", temperature), ("humidity", humidity), ("rainfall", rainfall)
        ]:
            if param in requirements:
                req = requirements[param]
                min_val = req['min']
                max_val = req['max']
                weight = req['weight']
                
                # Calculate parameter score
                if min_val <= value <= max_val:
                    # Within optimal range - calculate how close to the middle
                    middle = (min_val + max_val) / 2
                    distance = abs(value - middle) / ((max_val - min_val) / 2)
                    param_score = 1 - (distance * 0.2)  # Small penalty for being away from ideal
                else:
                    # Outside optimal range - calculate penalty
                    distance = min(abs(value - min_val), abs(value - max_val))
                    range_size = max_val - min_val
                    param_score = max(0, 1 - (distance / range_size))
                
                total_score += param_score * weight
                total_weight += weight
        
        # Calculate overall score
        if total_weight > 0:
            final_score = 0.5 + (total_score / total_weight) * 0.5  # Base score + weighted factors
        else:
            final_score = 0.5  # Default score if no weights
            
        # Add state preference bonus - specific crops grow better in certain states
        state_preferences = {
            'Rice': ['West Bengal', 'Andhra Pradesh', 'Punjab'],
            'Wheat': ['Punjab', 'Uttar Pradesh', 'Rajasthan'],
            'Maize': ['Karnataka', 'Rajasthan', 'Punjab'],
            'Cotton': ['Gujarat', 'Maharashtra', 'Punjab'],
            'Sugarcane': ['Uttar Pradesh', 'Maharashtra', 'Karnataka'],
            'Chickpea': ['Rajasthan', 'Maharashtra', 'Punjab']
        }
        
        if crop in state_preferences and state in state_preferences[crop]:
            final_score += 0.1  # Bonus for preferred state
            
        # Ensure score is between 0 and 1
        final_score = min(0.98, max(0.05, final_score))
        
        results.append({
            "crop": crop,
            "probability": final_score
        })
    
    # Sort by probability (highest first)
    results.sort(key=lambda x: x["probability"], reverse=True)
    return results

@app.post("/predict", response_model=List[CropPrediction])
async def predict(request: CropRequest):
    try:
        logger.info(f"Received prediction request: {request}")
        
        # Make predictions
        predictions = predict_crop_suitability(request)
        logger.info(f"Predictions: {predictions}")
        
        return predictions
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Crop Recommendation API - Send POST requests to /predict"}

if __name__ == "__main__":
    logger.info("Starting simplified crop recommendation server on http://127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000) 