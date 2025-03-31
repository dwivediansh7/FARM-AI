from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
from pathlib import Path

app = FastAPI()

# Load the models
try:
    model_path = Path(__file__).parent.parent.parent.parent / 'models'
    
    with open(model_path / 'LogReg.pkl', 'rb') as f:
        model = pickle.load(f)
        
    with open(model_path / 'column_transformer.pkl', 'rb') as f:
        column_transformer = pickle.load(f)
        
    with open(model_path / 'label_encoders.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
        
    with open(model_path / 'y_encoder.pkl', 'rb') as f:
        y_encoder = pickle.load(f)
except Exception as e:
    print(f"Error loading models: {e}")
    raise

class PredictionInput(BaseModel):
    N: float
    P: float
    K: float
    Temperature: float
    Humidity: float
    pH: float
    Rainfall: float
    State: str
    Area: float

def make_prediction(data: dict):
    try:
        # Create features array in the correct order
        features = np.array([
            data['N'],
            data['P'],
            data['K'],
            data['Temperature'],
            data['Humidity'],
            data['pH'],
            data['Rainfall'],
            data['State'],
            data['Area']
        ]).reshape(1, -1)

        # Transform the features
        X_transformed = column_transformer.transform(features)
        
        # Make prediction
        prediction = model.predict(X_transformed)[0]
        
        # Decode prediction
        crop = y_encoder.inverse_transform([prediction])[0]
        
        return crop
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict(data: PredictionInput):
    try:
        prediction = make_prediction(data.dict())
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 