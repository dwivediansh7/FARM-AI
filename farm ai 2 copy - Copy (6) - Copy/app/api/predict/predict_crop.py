import sys
import json
import pickle
import os
import traceback
import numpy as np
from pathlib import Path

def predict_crop():
    try:
        # Get input data from command line argument
        input_data = json.loads(sys.argv[1])
        
        # Setup logging
        log_file = os.path.join(os.path.dirname(__file__), 'prediction_log.txt')
        with open(log_file, 'a') as f:
            f.write(f"Input received: {json.dumps(input_data)}\n")
        
        # Get the path to the models directory
        models_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'models')
        
        # Load all required models with explicit error handling
        try:
            with open(os.path.join(models_dir, 'LogReg.pkl'), 'rb') as f:
                model = pickle.load(f)
            with open(log_file, 'a') as f:
                f.write("Loaded LogReg.pkl successfully\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error loading LogReg.pkl: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to load model: {str(e)}")
        
        try:
            with open(os.path.join(models_dir, 'column_transformer.pkl'), 'rb') as f:
                column_transformer = pickle.load(f)
            with open(log_file, 'a') as f:
                f.write("Loaded column_transformer.pkl successfully\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error loading column_transformer.pkl: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to load column transformer: {str(e)}")
        
        try:
            with open(os.path.join(models_dir, 'label_encoders.pkl'), 'rb') as f:
                label_encoders = pickle.load(f)
            with open(log_file, 'a') as f:
                f.write("Loaded label_encoders.pkl successfully\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error loading label_encoders.pkl: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to load label encoders: {str(e)}")
        
        try:
            with open(os.path.join(models_dir, 'y_encoder.pkl'), 'rb') as f:
                y_encoder = pickle.load(f)
            with open(log_file, 'a') as f:
                f.write("Loaded y_encoder.pkl successfully\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error loading y_encoder.pkl: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to load output encoder: {str(e)}")
        
        # Create features array with proper validation
        try:
            features = [
                float(input_data.get('N', 0)),
                float(input_data.get('P', 0)),
                float(input_data.get('K', 0)),
                float(input_data.get('Temperature', 25)),
                float(input_data.get('Humidity', 80)),
                float(input_data.get('pH', 6.5)),
                float(input_data.get('Rainfall', 200)),
                str(input_data.get('State', 'Punjab')),
                float(input_data.get('Area', 1.0))
            ]
            with open(log_file, 'a') as f:
                f.write(f"Features created: {features}\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error creating features: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to process input values: {str(e)}")
        
        # Apply label encoding to categorical features (State)
        try:
            if 'State' in label_encoders:
                state_idx = 7  # Index of State in features
                state_value = features[state_idx]
                if state_value in label_encoders['State'].classes_:
                    features[state_idx] = label_encoders['State'].transform([state_value])[0]
                else:
                    # If state not found in encoder, use a default value
                    features[state_idx] = 0
                    with open(log_file, 'a') as f:
                        f.write(f"Warning: State '{state_value}' not found in encoder, using default value\n")
            with open(log_file, 'a') as f:
                f.write(f"Features after encoding: {features}\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error in label encoding: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to encode categorical features: {str(e)}")
        
        # Transform features
        try:
            X_transformed = column_transformer.transform([features])
            with open(log_file, 'a') as f:
                f.write(f"Features transformed successfully\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error transforming features: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to transform features: {str(e)}")
        
        # Make prediction
        try:
            prediction = model.predict(X_transformed)[0]
            with open(log_file, 'a') as f:
                f.write(f"Prediction made: {prediction}\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error making prediction: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to make prediction: {str(e)}")
        
        # Decode prediction
        try:
            crop = y_encoder.inverse_transform([prediction])[0]
            with open(log_file, 'a') as f:
                f.write(f"Decoded prediction: {crop}\n")
        except Exception as e:
            with open(log_file, 'a') as f:
                f.write(f"Error decoding prediction: {str(e)}\n{traceback.format_exc()}\n")
            raise Exception(f"Failed to decode prediction: {str(e)}")
        
        # Return result
        result = {"prediction": crop}
        with open(log_file, 'a') as f:
            f.write(f"Returning result: {json.dumps(result)}\n\n")
        print(json.dumps(result))
        
    except Exception as e:
        error_message = str(e)
        error_result = {"error": error_message}
        log_file = os.path.join(os.path.dirname(__file__), 'prediction_log.txt')
        with open(log_file, 'a') as f:
            f.write(f"Error in prediction: {error_message}\n{traceback.format_exc()}\n\n")
        print(json.dumps(error_result))

if __name__ == "__main__":
    predict_crop() 