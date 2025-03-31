import sys
import json
import pickle
import numpy as np
from pathlib import Path

def load_models():
    try:
        base_path = Path(__file__).parent.parent / 'models'
        
        with open(base_path / 'LogReg.pkl', 'rb') as f:
            model = pickle.load(f)
        
        with open(base_path / 'column_transformer.pkl', 'rb') as f:
            column_transformer = pickle.load(f)
        
        with open(base_path / 'label_encoders.pkl', 'rb') as f:
            label_encoders = pickle.load(f)
        
        with open(base_path / 'y_encoder.pkl', 'rb') as f:
            y_encoder = pickle.load(f)
            
        return model, column_transformer, label_encoders, y_encoder
    except Exception as e:
        raise Exception(f"Error loading models: {str(e)}")

def predict(data):
    try:
        model, column_transformer, label_encoders, y_encoder = load_models()
        
        # Create features array
        features = [
            float(data['N']),
            float(data['P']),
            float(data['K']),
            float(data['Temperature']),
            float(data['Humidity']),
            float(data['pH']),
            float(data['Rainfall']),
            str(data['State']),
            float(data['Area'])
        ]
        
        # Transform features
        X_transformed = column_transformer.transform([features])
        
        # Make prediction
        prediction = model.predict(X_transformed)[0]
        
        # Decode prediction
        crop = y_encoder.inverse_transform([prediction])[0]
        
        return {"prediction": crop}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    result = predict(data)
    
    with open(output_file, 'w') as f:
        json.dump(result, f) 