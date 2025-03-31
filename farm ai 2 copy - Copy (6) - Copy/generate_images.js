const fs = require('fs');
const path = require('path');

// Create the directory if it doesn't exist
const dir = path.join('public', 'images', 'farming');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Function to create a simple SVG placeholder
function createPlaceholderSVG(width, height, text, bgColor) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;
}

// Create placeholder images
const images = [
  { name: 'smart-farming.jpg', width: 1200, height: 800, text: 'Smart Farming', color: '#4CAF50' },
  { name: 'drone-mapping.jpg', width: 1200, height: 800, text: 'Drone Mapping', color: '#2196F3' },
  { name: 'soil-analysis.jpg', width: 800, height: 600, text: 'Soil Analysis', color: '#795548' },
  { name: 'crop-health.jpg', width: 800, height: 600, text: 'Crop Health', color: '#8BC34A' },
  { name: 'water-management.jpg', width: 800, height: 600, text: 'Water Management', color: '#03A9F4' }
];

images.forEach(img => {
  const svg = createPlaceholderSVG(img.width, img.height, img.text, img.color);
  fs.writeFileSync(path.join(dir, img.name.replace('.jpg', '.svg')), svg);
  console.log(`Created ${img.name.replace('.jpg', '.svg')}`);
}); 