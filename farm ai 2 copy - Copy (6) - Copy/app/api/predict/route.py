from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
import os
from pathlib import Path
from typing import Dict
import json
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models once when the server starts
try:
    base_path = Path(__file__).parent.parent.parent.parent / 'models'
    
    with open(base_path / 'LogReg.pkl', 'rb') as f:
        model = pickle.load(f)
    
    with open(base_path / 'column_transformer.pkl', 'rb') as f:
        column_transformer = pickle.load(f)
    
    with open(base_path / 'label_encoders.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
    
    with open(base_path / 'y_encoder.pkl', 'rb') as f:
        y_encoder = pickle.load(f)
except Exception as e:
    print(f"Error loading models: {e}")
    raise

def predict(data: Dict):
    try:
        # Create features array
        features = np.array([
            float(data['N']),
            float(data['P']),
            float(data['K']),
            float(data['Temperature']),
            float(data['Humidity']),
            float(data['pH']),
            float(data['Rainfall']),
            str(data['State']),
            float(data['Area'])
        ]).reshape(1, -1)

        # Transform features
        X_transformed = column_transformer.transform(features)
        
        # Make prediction
        prediction = model.predict(X_transformed)[0]
        
        # Decode prediction
        crop = y_encoder.inverse_transform([prediction])[0]
        
        return {"prediction": crop}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict")
async def get_prediction(request):
    try:
        # Parse the request body
        body = await request.json()
        result = predict(body)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        ) 