import os
import pickle
import logging
from typing import Dict
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load all required models and transformers
try:
    base_path = os.path.dirname(__file__)
    
    with open(os.path.join(base_path, 'LogReg.pkl'), 'rb') as f:
        model = pickle.load(f)
    
    with open(os.path.join(base_path, 'column_transformer.pkl'), 'rb') as f:
        column_transformer = pickle.load(f)
    
    with open(os.path.join(base_path, 'label_encoders.pkl'), 'rb') as f:
        label_encoders = pickle.load(f)
    
    with open(os.path.join(base_path, 'y_encoder.pkl'), 'rb') as f:
        y_encoder = pickle.load(f)
        
    logger.info("All models and transformers loaded successfully")
except Exception as e:
    logger.error(f"Error loading models: {str(e)}")
    raise

class PredictionInput(BaseModel):
    State: str
    N: float
    P: float
    K: float
    pH: float
    Temperature: float = 25.1  # default values
    Rainfall: float = 200.5
    Humidity: float = 80.2
    Area: float = 1.0

    @validator('pH')
    def validate_ph(cls, v):
        if not 0 <= v <= 14:
            raise ValueError('pH must be between 0 and 14')
        return v

    @validator('N', 'P', 'K')
    def validate_nutrients(cls, v):
        if v < 0:
            raise ValueError('Nutrient values must be positive')
        return v

def predict(input_data: Dict):
    try:
        # Create feature array in the correct order
        features = [
            input_data['N'],
            input_data['P'],
            input_data['K'],
            input_data['Temperature'],
            input_data['Humidity'],
            input_data['pH'],
            input_data['Rainfall'],
            input_data['State'],
            input_data['Area']
        ]
        
        # Transform the input using column transformer
        X_transformed = column_transformer.transform([features])
        
        # Make prediction
        prediction_encoded = model.predict(X_transformed)[0]
        
        # Decode the prediction
        prediction = y_encoder.inverse_transform([prediction_encoded])[0]
        
        logger.info(f"Prediction made successfully: {prediction}")
        return {"prediction": prediction}
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

app = FastAPI()

@app.post("/api/predict")
async def get_prediction(data: PredictionInput):
    try:
        prediction = predict(data.dict())
        return prediction
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 