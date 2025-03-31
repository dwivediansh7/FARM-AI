@echo off
echo Setting up the Python environment for the crop recommendation model...

echo Installing required Python dependencies...
pip install -r requirements.txt

echo Setting up complete! You can now start the model server with:
echo cd ml_server
echo python crop_recommendation_server.py
echo.
echo or run ml_server\start_server.bat 