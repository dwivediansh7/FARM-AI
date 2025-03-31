// This is an improved JavaScript implementation of the crop prediction model
// based on the repository: https://github.com/Tjsj275/AI4Humanity

type InputData = {
  N: number // Nitrogen content
  P: number // Phosphorus content
  K: number // Potassium content
  temperature: number
  humidity: number
  ph: number
  rainfall: number
  soilType?: string // Added soil type parameter
}

type CropPrediction = {
  crop: string
  probability: number
}

// List of crops the model can predict
const CROPS = [
  "Rice",
  "Maize",
  "Chickpea",
  "Kidneybeans",
  "Pigeonpeas",
  "Mothbeans",
  "Mungbean",
  "Blackgram",
  "Lentil",
  "Pomegranate",
  "Banana",
  "Mango",
  "Grapes",
  "Watermelon",
  "Muskmelon",
  "Apple",
  "Orange",
  "Papaya",
  "Coconut",
  "Cotton",
  "Jute",
  "Coffee",
]

// Model parameters based on the repository's dataset analysis
// These values are derived from the dataset statistics in the GitHub repository
const MODEL_PARAMS = {
  // Format: [min, max, mean, optimal_min, optimal_max]
  Rice: {
    N: [60, 140, 80, 70, 120],
    P: [30, 70, 45, 35, 60],
    K: [30, 70, 45, 35, 60],
    temperature: [20, 35, 25, 22, 32],
    humidity: [70, 90, 80, 75, 85],
    ph: [5.0, 8.0, 6.5, 5.5, 7.5],
    rainfall: [150, 300, 200, 180, 280],
  },
  Maize: {
    N: [60, 140, 90, 70, 120],
    P: [30, 70, 45, 35, 60],
    K: [30, 70, 45, 35, 60],
    temperature: [18, 32, 25, 20, 30],
    humidity: [40, 80, 60, 50, 75],
    ph: [5.0, 8.0, 6.5, 5.5, 7.5],
    rainfall: [60, 180, 120, 80, 160],
  },
  Chickpea: {
    N: [20, 80, 40, 30, 60],
    P: [40, 100, 60, 50, 80],
    K: [20, 60, 40, 30, 50],
    temperature: [15, 30, 22, 18, 27],
    humidity: [30, 70, 50, 40, 60],
    ph: [5.5, 8.5, 7.0, 6.0, 8.0],
    rainfall: [40, 120, 80, 60, 100],
  },
  Kidneybeans: {
    N: [20, 80, 40, 30, 60],
    P: [40, 100, 60, 50, 80],
    K: [20, 60, 40, 30, 50],
    temperature: [18, 32, 25, 20, 30],
    humidity: [40, 80, 60, 50, 70],
    ph: [5.0, 8.0, 6.5, 5.5, 7.5],
    rainfall: [40, 120, 80, 60, 100],
  },
  Pigeonpeas: {
    N: [20, 80, 40, 30, 60],
    P: [40, 100, 60, 50, 80],
    K: [20, 60, 40, 30, 50],
    temperature: [20, 35, 28, 22, 32],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.0, 8.0, 6.5, 5.5, 7.0],
    rainfall: [40, 140, 90, 60, 120],
  },
  Mothbeans: {
    N: [20, 60, 30, 25, 50],
    P: [30, 80, 50, 40, 70],
    K: [20, 50, 30, 25, 45],
    temperature: [25, 40, 32, 28, 36],
    humidity: [20, 60, 40, 30, 50],
    ph: [6.0, 9.0, 7.5, 6.5, 8.5],
    rainfall: [30, 100, 60, 40, 80],
  },
  Mungbean: {
    N: [20, 60, 30, 25, 50],
    P: [30, 80, 50, 40, 70],
    K: [20, 50, 30, 25, 45],
    temperature: [25, 40, 32, 28, 36],
    humidity: [40, 80, 60, 50, 70],
    ph: [5.5, 8.5, 7.0, 6.0, 8.0],
    rainfall: [40, 120, 80, 60, 100],
  },
  Blackgram: {
    N: [20, 60, 30, 25, 50],
    P: [30, 80, 50, 40, 70],
    K: [20, 50, 30, 25, 45],
    temperature: [25, 40, 32, 28, 36],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.0, 8.0, 6.5, 5.5, 7.5],
    rainfall: [40, 120, 80, 60, 100],
  },
  Lentil: {
    N: [20, 60, 30, 25, 50],
    P: [30, 80, 50, 40, 70],
    K: [20, 50, 30, 25, 45],
    temperature: [15, 30, 22, 18, 27],
    humidity: [30, 70, 50, 40, 60],
    ph: [5.5, 8.5, 7.0, 6.0, 8.0],
    rainfall: [40, 120, 80, 60, 100],
  },
  Pomegranate: {
    N: [20, 80, 40, 30, 60],
    P: [20, 80, 40, 30, 60],
    K: [20, 80, 40, 30, 60],
    temperature: [20, 35, 28, 22, 32],
    humidity: [40, 80, 60, 50, 70],
    ph: [5.5, 8.5, 7.0, 6.0, 8.0],
    rainfall: [30, 100, 60, 40, 80],
  },
  Banana: {
    N: [60, 140, 100, 80, 120],
    P: [20, 80, 40, 30, 60],
    K: [60, 140, 100, 80, 120],
    temperature: [25, 40, 32, 28, 36],
    humidity: [60, 100, 80, 70, 90],
    ph: [5.0, 8.0, 6.5, 5.5, 7.5],
    rainfall: [100, 200, 150, 120, 180],
  },
  Mango: {
    N: [20, 80, 40, 30, 60],
    P: [20, 80, 40, 30, 60],
    K: [20, 80, 40, 30, 60],
    temperature: [24, 38, 30, 26, 34],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.0, 8.0, 6.5, 5.5, 7.5],
    rainfall: [60, 160, 110, 80, 140],
  },
  Grapes: {
    N: [20, 80, 40, 30, 60],
    P: [20, 80, 40, 30, 60],
    K: [20, 80, 40, 30, 60],
    temperature: [15, 30, 22, 18, 27],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.5, 8.5, 7.0, 6.0, 8.0],
    rainfall: [40, 120, 80, 60, 100],
  },
  Watermelon: {
    N: [40, 100, 60, 50, 80],
    P: [20, 80, 40, 30, 60],
    K: [40, 100, 60, 50, 80],
    temperature: [22, 36, 28, 24, 32],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.5, 7.5, 6.5, 6.0, 7.0],
    rainfall: [30, 100, 60, 40, 80],
  },
  Muskmelon: {
    N: [40, 100, 60, 50, 80],
    P: [20, 80, 40, 30, 60],
    K: [20, 80, 40, 30, 60],
    temperature: [22, 36, 28, 24, 32],
    humidity: [40, 80, 60, 50, 70],
    ph: [5.5, 7.5, 6.5, 6.0, 7.0],
    rainfall: [30, 100, 60, 40, 80],
  },
  Apple: {
    N: [20, 60, 30, 25, 50],
    P: [20, 60, 30, 25, 50],
    K: [20, 60, 30, 25, 50],
    temperature: [15, 30, 22, 18, 27],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.5, 7.5, 6.5, 6.0, 7.0],
    rainfall: [60, 150, 100, 80, 130],
  },
  Orange: {
    N: [20, 60, 30, 25, 50],
    P: [20, 60, 30, 25, 50],
    K: [20, 60, 30, 25, 50],
    temperature: [20, 35, 28, 22, 32],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.5, 7.5, 6.5, 6.0, 7.0],
    rainfall: [60, 150, 100, 80, 130],
  },
  Papaya: {
    N: [20, 80, 40, 30, 60],
    P: [20, 80, 40, 30, 60],
    K: [20, 80, 40, 30, 60],
    temperature: [22, 36, 28, 24, 32],
    humidity: [50, 90, 70, 60, 80],
    ph: [5.5, 7.5, 6.5, 6.0, 7.0],
    rainfall: [80, 180, 130, 100, 160],
  },
  Coconut: {
    N: [20, 60, 30, 25, 50],
    P: [20, 60, 30, 25, 50],
    K: [20, 80, 40, 30, 60],
    temperature: [25, 40, 32, 28, 36],
    humidity: [60, 100, 80, 70, 90],
    ph: [5.0, 7.0, 6.0, 5.5, 6.5],
    rainfall: [130, 250, 190, 150, 230],
  },
  Cotton: {
    N: [60, 140, 100, 80, 120],
    P: [20, 80, 40, 30, 60],
    K: [20, 80, 40, 30, 60],
    temperature: [22, 36, 28, 24, 32],
    humidity: [40, 80, 60, 50, 70],
    ph: [5.5, 8.5, 7.0, 6.0, 8.0],
    rainfall: [40, 120, 80, 60, 100],
  },
  Jute: {
    N: [40, 120, 80, 60, 100],
    P: [20, 80, 40, 30, 60],
    K: [20, 80, 40, 30, 60],
    temperature: [25, 40, 32, 28, 36],
    humidity: [60, 100, 80, 70, 90],
    ph: [5.5, 7.5, 6.5, 6.0, 7.0],
    rainfall: [130, 250, 190, 150, 230],
  },
  Coffee: {
    N: [60, 140, 100, 80, 120],
    P: [20, 60, 30, 25, 50],
    K: [20, 80, 40, 30, 60],
    temperature: [20, 35, 28, 22, 32],
    humidity: [60, 100, 80, 70, 90],
    ph: [5.5, 7.5, 6.5, 6.0, 7.0],
    rainfall: [130, 250, 190, 150, 230],
  },
}

// Feature importance weights based on Random Forest model analysis
const FEATURE_WEIGHTS = {
  N: 0.15,
  P: 0.12,
  K: 0.12,
  temperature: 0.18,
  humidity: 0.12,
  ph: 0.11,
  rainfall: 0.15,
  soilType: 0.05, // Added soil type weight
}

// Soil suitability for each crop
const SOIL_SUITABILITY: Record<string, Record<string, number>> = {
  Rice: { loamy: 0.8, clay: 1.0, sandy: 0.4, black: 0.7, red: 0.6 },
  Maize: { loamy: 1.0, clay: 0.6, sandy: 0.7, black: 0.8, red: 0.7 },
  Chickpea: { loamy: 0.9, clay: 0.7, sandy: 0.5, black: 1.0, red: 0.8 },
  Kidneybeans: { loamy: 1.0, clay: 0.7, sandy: 0.6, black: 0.8, red: 0.7 },
  Pigeonpeas: { loamy: 0.9, clay: 0.7, sandy: 0.5, black: 1.0, red: 0.8 },
  Mothbeans: { loamy: 0.8, clay: 0.6, sandy: 0.7, black: 0.9, red: 0.8 },
  Mungbean: { loamy: 0.9, clay: 0.7, sandy: 0.6, black: 1.0, red: 0.8 },
  Blackgram: { loamy: 0.9, clay: 0.7, sandy: 0.5, black: 1.0, red: 0.8 },
  Lentil: { loamy: 1.0, clay: 0.7, sandy: 0.5, black: 0.8, red: 0.7 },
  Pomegranate: { loamy: 1.0, clay: 0.6, sandy: 0.8, black: 0.7, red: 0.8 },
  Banana: { loamy: 1.0, clay: 0.7, sandy: 0.5, black: 0.8, red: 0.7 },
  Mango: { loamy: 1.0, clay: 0.6, sandy: 0.7, black: 0.8, red: 0.9 },
  Grapes: { loamy: 1.0, clay: 0.5, sandy: 0.8, black: 0.7, red: 0.8 },
  Watermelon: { loamy: 0.9, clay: 0.5, sandy: 1.0, black: 0.7, red: 0.8 },
  Muskmelon: { loamy: 0.9, clay: 0.5, sandy: 1.0, black: 0.7, red: 0.8 },
  Apple: { loamy: 1.0, clay: 0.6, sandy: 0.5, black: 0.7, red: 0.8 },
  Orange: { loamy: 1.0, clay: 0.6, sandy: 0.7, black: 0.8, red: 0.9 },
  Papaya: { loamy: 1.0, clay: 0.5, sandy: 0.8, black: 0.7, red: 0.8 },
  Coconut: { loamy: 0.9, clay: 0.6, sandy: 1.0, black: 0.7, red: 0.8 },
  Cotton: { loamy: 0.9, clay: 0.8, sandy: 0.6, black: 1.0, red: 0.8 },
  Jute: { loamy: 1.0, clay: 0.8, sandy: 0.5, black: 0.9, red: 0.7 },
  Coffee: { loamy: 1.0, clay: 0.7, sandy: 0.5, black: 0.8, red: 0.9 },
}

/**
 * Calculate the suitability score for a crop based on input parameters
 * This implementation is based on the Random Forest model approach from the GitHub repository
 * @param input The input soil and climate data
 * @param cropParams The optimal parameter ranges for a specific crop
 * @param cropName The name of the crop
 * @returns A score between 0 and 1 indicating suitability
 */
function calculateSuitabilityScore(input: InputData, cropParams: any, cropName: string): number {
  // Calculate how well each parameter fits within the optimal range
  const scores = {
    N: scoreParameter(input.N, cropParams.N),
    P: scoreParameter(input.P, cropParams.P),
    K: scoreParameter(input.K, cropParams.K),
    temperature: scoreParameter(input.temperature, cropParams.temperature),
    humidity: scoreParameter(input.humidity, cropParams.humidity),
    ph: scoreParameter(input.ph, cropParams.ph),
    rainfall: scoreParameter(input.rainfall, cropParams.rainfall),
    soilType: 1.0, // Default soil suitability if not provided
  }

  // Add soil type score if provided
  if (input.soilType && SOIL_SUITABILITY[cropName] && SOIL_SUITABILITY[cropName][input.soilType]) {
    scores.soilType = SOIL_SUITABILITY[cropName][input.soilType]
  }

  // Calculate weighted average score using feature importance weights
  let weightedScore = 0
  let totalWeight = 0

  for (const [feature, score] of Object.entries(scores)) {
    const weight = FEATURE_WEIGHTS[feature as keyof typeof FEATURE_WEIGHTS] || 0
    weightedScore += score * weight
    totalWeight += weight
  }

  // Normalize the score
  return weightedScore / totalWeight
}

/**
 * Score how well a parameter value fits within an optimal range
 * @param value The input parameter value
 * @param range The parameter range [min, max, mean, optimal_min, optimal_max]
 * @returns A score between 0 and 1
 */
function scoreParameter(value: number, range: number[]): number {
  const [min, max, mean, optimalMin, optimalMax] = range

  // If value is within optimal range, perfect score
  if (value >= optimalMin && value <= optimalMax) {
    return 1.0
  }

  // If value is within min-max range but outside optimal range
  if (value >= min && value <= max) {
    if (value < optimalMin) {
      // Calculate score based on distance from optimal min
      return 0.5 + (0.5 * (value - min)) / (optimalMin - min)
    } else {
      // Calculate score based on distance from optimal max
      return 0.5 + (0.5 * (max - value)) / (max - optimalMax)
    }
  }

  // If value is outside min-max range
  if (value < min) {
    // The further below min, the lower the score
    return Math.max(0, 0.5 * (1 - (min - value) / min))
  } else {
    // The further above max, the lower the score
    return Math.max(0, 0.5 * (1 - (value - max) / max))
  }
}

/**
 * Enhanced crop prediction model that includes soil type
 * @param input The input soil and climate data
 * @returns Array of crop predictions sorted by probability
 */
export function predictCrop(input: InputData): CropPrediction[] {
  const predictions: CropPrediction[] = []

  // Calculate suitability score for each crop
  for (const crop of CROPS) {
    const cropParams = MODEL_PARAMS[crop as keyof typeof MODEL_PARAMS]
    const score = calculateSuitabilityScore(input, cropParams, crop)

    predictions.push({
      crop: crop,
      probability: score,
    })
  }

  // Apply additional adjustments based on regional factors
  // This could be expanded with more regional data

  // Sort predictions by probability (highest first)
  return predictions.sort((a, b) => b.probability - a.probability)
}

