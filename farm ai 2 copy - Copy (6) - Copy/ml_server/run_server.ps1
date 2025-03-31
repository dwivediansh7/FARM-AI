Write-Host "Setting up crop recommendation server..." -ForegroundColor Green

# Check and install required packages
$requiredPackages = @("fastapi", "uvicorn")

foreach ($package in $requiredPackages) {
    Write-Host "Checking for $package..." -ForegroundColor Yellow
    $installed = python -c "try: import $package; print('installed'); except ImportError: print('not installed')"
    
    if ($installed -eq "not installed") {
        Write-Host "$package not found, installing..." -ForegroundColor Yellow
        pip install $package
    } else {
        Write-Host "$package is already installed." -ForegroundColor Green
    }
}

# Remove uvicorn log file if it exists
if (Test-Path "./uvicorn.log") {
    Remove-Item "./uvicorn.log"
}

# Run the server
Write-Host "Starting crop recommendation server on http://localhost:8000..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow

# Use try-catch to handle errors
try {
    python direct_prediction.py
} catch {
    Write-Host "Error starting server: $_" -ForegroundColor Red
} 