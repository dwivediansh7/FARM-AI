# Crop Recommendation System

This application uses a machine learning model from the AI4Humanity project to recommend suitable crops based on soil and climate parameters.

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js and npm (for the web application)

### Initial Setup

1. Run the setup script to install Python dependencies:
   ```
   .\setup_model.bat
   ```

2. Start the Python model server:
   ```
   cd ml_server
   python crop_recommendation_server.py
   ```
   Or run the batch file:
   ```
   ml_server\start_server.bat
   ```

3. In a new terminal, start the web application:
   ```
   npm run dev
   ```

4. Navigate to http://localhost:3000/crop-recommendation in your browser

## Using the Crop Recommendation Tool

1. Enter soil information:
   - Nitrogen (N) content in kg/ha
   - Phosphorus (P) content in kg/ha
   - Potassium (K) content in kg/ha
   - pH value of the soil
   - Select soil type from the dropdown

2. Enter climate information:
   - Temperature in degrees Celsius
   - Humidity percentage
   - Rainfall in mm
   - State (for location-based recommendations)
   - Area size in hectares

3. Click "Get Recommendations" to receive personalized crop suggestions

## About the Model

The crop recommendation model uses a logistic regression algorithm trained on agricultural data. It considers:

- Soil nutrients (N, P, K)
- Soil pH and type
- Climate conditions (temperature, humidity, rainfall)
- Geographic location (state)

The model ranks crops based on their suitability for your specific conditions and provides additional information about:

- Soil analysis
- Recommended fertilizer applications
- Expected profitability
- Market demand

## Troubleshooting

- If you see "Failed to connect to model API", make sure the Python server is running
- For soil testing resources, contact your local agricultural extension
- Recommended ranges:
  - N: 10-150 kg/ha
  - P: 10-100 kg/ha
  - K: 10-150 kg/ha
  - pH: 5.5-8.5 