try:
    print("Checking required packages...")
    
    import fastapi
    print("✓ fastapi is installed")
    
    import uvicorn
    print("✓ uvicorn is installed")
    
    import pandas
    print("✓ pandas is installed")
    
    import numpy
    print("✓ numpy is installed")
    
    import joblib
    print("✓ joblib is installed")
    
    import sklearn
    print("✓ scikit-learn is installed")
    
    print("All required packages are installed.")
except ImportError as e:
    print(f"Error: {e}")
    print("Please install the missing package with: pip install [package_name]")
    print("Or install all requirements with: pip install -r requirements.txt") 