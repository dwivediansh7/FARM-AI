import sys
import json
import pickle
import os

# Get the absolute path of the models directory
models_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'models')

def predict():
    try:
        # Get input data from command line argument
        input_data = json.loads(sys.argv[1])
        
        # Load models
        with open(os.path.join(models_dir, 'LogReg.pkl'), 'rb') as f:
            model = pickle.load(f)
        
        with open(os.path.join(models_dir, 'column_transformer.pkl'), 'rb') as f:
            column_transformer = pickle.load(f)
        
        with open(os.path.join(models_dir, 'label_encoders.pkl'), 'rb') as f:
            label_encoders = pickle.load(f)
        
        with open(os.path.join(models_dir, 'y_encoder.pkl'), 'rb') as f:
            y_encoder = pickle.load(f)
        
        # Create features array
        features = [
            float(input_data['N']),
            float(input_data['P']),
            float(input_data['K']),
            float(input_data['Temperature']),
            float(input_data['Humidity']),
            float(input_data['pH']),
            float(input_data['Rainfall']),
            str(input_data['State']),
            float(input_data['Area'])
        ]
        
        # Apply label encoding to categorical features
        if 'State' in label_encoders:
            state_idx = 7  # Index of State in features
            state_encoder = label_encoders['State']
            features[state_idx] = state_encoder.transform([features[state_idx]])[0]
        
        # Transform features
        X_transformed = column_transformer.transform([features])
        
        # Make prediction
        prediction = model.predict(X_transformed)[0]
        
        # Decode prediction
        crop = y_encoder.inverse_transform([prediction])[0]
        
        # Return result
        result = {"prediction": crop}
        print(json.dumps(result))
    except Exception as e:
        error_result = {"error": str(e)}
        print(json.dumps(error_result))

if __name__ == "__main__":
    predict() 