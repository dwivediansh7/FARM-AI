#!/bin/bash

# Create the images directory if it doesn't exist
mkdir -p public/images/farming

echo "Downloading images from Unsplash..."

# Smart farming image - Farmer using tablet
curl -L -o public/images/farming/smart-farming.jpg "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&h=800&q=80"

# Drone mapping image - Aerial view
curl -L -o public/images/farming/drone-mapping.jpg "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=1200&h=800&q=80"

# Soil analysis image
curl -L -o public/images/farming/soil-analysis.jpg "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?auto=format&fit=crop&w=800&h=600&q=80"

# Crop health image
curl -L -o public/images/farming/crop-health.jpg "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&h=600&q=80"

# Water management image
curl -L -o public/images/farming/water-management.jpg "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&h=600&q=80"

echo "Images downloaded successfully!" 