from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import uvicorn
from pathlib import Path
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models at startup
try:
    base_path = Path("models")
    
    with open(base_path / "LogReg.pkl", "rb") as f:
        model = pickle.load(f)
    
    with open(base_path / "column_transformer.pkl", "rb") as f:
        column_transformer = pickle.load(f)
    
    with open(base_path / "label_encoders.pkl", "rb") as f:
        label_encoders = pickle.load(f)
    
    with open(base_path / "y_encoder.pkl", "rb") as f:
        y_encoder = pickle.load(f)
        
except Exception as e:
    print(f"Error loading models: {str(e)}")
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

@app.post("/predict")
async def predict(data: PredictionInput):
    try:
        # Create feature array in correct order
        features = [
            data.N,
            data.P,
            data.K,
            data.Temperature,
            data.Humidity,
            data.pH,
            data.Rainfall,
            data.State,
            data.Area
        ]
        
        # Transform features
        X_transformed = column_transformer.transform([features])
        
        # Make prediction
        prediction_encoded = model.predict(X_transformed)[0]
        prediction = y_encoder.inverse_transform([prediction_encoded])[0]
        
        return {"prediction": prediction}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 