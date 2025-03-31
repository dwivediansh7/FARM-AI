#!/bin/bash

# Create the images directory if it doesn't exist
mkdir -p public/images/farming

# Download images using wget
echo "Downloading images..."

# Set user agent
USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

# Smart farming image - Farmer using tablet in field
wget --user-agent="$USER_AGENT" -O public/images/farming/smart-farming.jpg "https://raw.githubusercontent.com/example-farm-ai/images/main/smart-farming.jpg" || \
convert -size 1200x800 xc:lightgreen -pointsize 40 -gravity center -draw "text 0,0 'Smart Farming'" public/images/farming/smart-farming.jpg

# Drone mapping image - Aerial view of farmland
wget --user-agent="$USER_AGENT" -O public/images/farming/drone-mapping.jpg "https://raw.githubusercontent.com/example-farm-ai/images/main/drone-mapping.jpg" || \
convert -size 1200x800 xc:skyblue -pointsize 40 -gravity center -draw "text 0,0 'Drone Mapping'" public/images/farming/drone-mapping.jpg

# Soil analysis image - Soil health visualization
wget --user-agent="$USER_AGENT" -O public/images/farming/soil-analysis.jpg "https://raw.githubusercontent.com/example-farm-ai/images/main/soil-analysis.jpg" || \
convert -size 800x600 xc:brown -pointsize 40 -gravity center -draw "text 0,0 'Soil Analysis'" public/images/farming/soil-analysis.jpg

# Crop health image - NDVI visualization
wget --user-agent="$USER_AGENT" -O public/images/farming/crop-health.jpg "https://raw.githubusercontent.com/example-farm-ai/images/main/crop-health.jpg" || \
convert -size 800x600 xc:forestgreen -pointsize 40 -gravity center -draw "text 0,0 'Crop Health'" public/images/farming/crop-health.jpg

# Water management image - Irrigation visualization
wget --user-agent="$USER_AGENT" -O public/images/farming/water-management.jpg "https://raw.githubusercontent.com/example-farm-ai/images/main/water-management.jpg" || \
convert -size 800x600 xc:lightblue -pointsize 40 -gravity center -draw "text 0,0 'Water Management'" public/images/farming/water-management.jpg

echo "Images downloaded successfully!" 