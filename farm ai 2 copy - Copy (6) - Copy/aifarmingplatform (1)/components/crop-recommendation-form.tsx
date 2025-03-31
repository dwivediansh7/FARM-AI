"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { predictCrop } from "@/lib/crop-prediction-model"

type CropRecommendation = {
  name: string
  probability: number
  suitability: number
  waterRequirement: "Low" | "Medium" | "High"
  growthPeriod: string
  marketDemand: "Low" | "Medium" | "High"
  estimatedYield: string
  estimatedProfit: string
  estimatedTotalProfit: string
  soilSuitability: string
}

// Additional crop information to display with predictions
const cropInfo: Record<
  string,
  Omit<CropRecommendation, "name" | "probability" | "suitability" | "estimatedTotalProfit" | "soilSuitability">
> = {
  rice: {
    waterRequirement: "High",
    growthPeriod: "110-150 days",
    marketDemand: "High",
    estimatedYield: "4.0-6.0 tons/hectare",
    estimatedProfit: "₹60,000-80,000/hectare",
  },
  maize: {
    waterRequirement: "Medium",
    growthPeriod: "90-120 days",
    marketDemand: "High",
    estimatedYield: "5.0-8.0 tons/hectare",
    estimatedProfit: "₹50,000-70,000/hectare",
  },
  chickpea: {
    waterRequirement: "Low",
    growthPeriod: "90-120 days",
    marketDemand: "Medium",
    estimatedYield: "1.5-2.5 tons/hectare",
    estimatedProfit: "₹45,000-65,000/hectare",
  },
  kidneybeans: {
    waterRequirement: "Medium",
    growthPeriod: "85-120 days",
    marketDemand: "Medium",
    estimatedYield: "1.2-2.0 tons/hectare",
    estimatedProfit: "₹40,000-60,000/hectare",
  },
  pigeonpeas: {
    waterRequirement: "Low",
    growthPeriod: "120-180 days",
    marketDemand: "Medium",
    estimatedYield: "1.0-1.8 tons/hectare",
    estimatedProfit: "₹35,000-55,000/hectare",
  },
  mothbeans: {
    waterRequirement: "Low",
    growthPeriod: "75-90 days",
    marketDemand: "Medium",
    estimatedYield: "0.8-1.2 tons/hectare",
    estimatedProfit: "₹30,000-45,000/hectare",
  },
  mungbean: {
    waterRequirement: "Low",
    growthPeriod: "60-90 days",
    marketDemand: "Medium",
    estimatedYield: "1.0-1.5 tons/hectare",
    estimatedProfit: "₹35,000-50,000/hectare",
  },
  blackgram: {
    waterRequirement: "Low",
    growthPeriod: "70-100 days",
    marketDemand: "Medium",
    estimatedYield: "0.8-1.4 tons/hectare",
    estimatedProfit: "₹32,000-48,000/hectare",
  },
  lentil: {
    waterRequirement: "Low",
    growthPeriod: "100-130 days",
    marketDemand: "Medium",
    estimatedYield: "1.0-1.8 tons/hectare",
    estimatedProfit: "₹40,000-60,000/hectare",
  },
  pomegranate: {
    waterRequirement: "Medium",
    growthPeriod: "5-7 months (fruiting)",
    marketDemand: "High",
    estimatedYield: "15-20 tons/hectare",
    estimatedProfit: "₹300,000-500,000/hectare",
  },
  banana: {
    waterRequirement: "High",
    growthPeriod: "9-12 months",
    marketDemand: "High",
    estimatedYield: "30-40 tons/hectare",
    estimatedProfit: "₹250,000-400,000/hectare",
  },
  mango: {
    waterRequirement: "Medium",
    growthPeriod: "4-5 months (fruiting)",
    marketDemand: "High",
    estimatedYield: "10-15 tons/hectare",
    estimatedProfit: "₹200,000-350,000/hectare",
  },
  grapes: {
    waterRequirement: "Medium",
    growthPeriod: "3-4 months (fruiting)",
    marketDemand: "High",
    estimatedYield: "15-25 tons/hectare",
    estimatedProfit: "₹300,000-500,000/hectare",
  },
  watermelon: {
    waterRequirement: "High",
    growthPeriod: "80-110 days",
    marketDemand: "High",
    estimatedYield: "25-35 tons/hectare",
    estimatedProfit: "₹150,000-250,000/hectare",
  },
  muskmelon: {
    waterRequirement: "Medium",
    growthPeriod: "80-120 days",
    marketDemand: "Medium",
    estimatedYield: "15-25 tons/hectare",
    estimatedProfit: "₹120,000-200,000/hectare",
  },
  apple: {
    waterRequirement: "Medium",
    growthPeriod: "5-6 months (fruiting)",
    marketDemand: "High",
    estimatedYield: "15-25 tons/hectare",
    estimatedProfit: "₹400,000-700,000/hectare",
  },
  orange: {
    waterRequirement: "Medium",
    growthPeriod: "7-8 months (fruiting)",
    marketDemand: "High",
    estimatedYield: "15-20 tons/hectare",
    estimatedProfit: "₹250,000-400,000/hectare",
  },
  papaya: {
    waterRequirement: "Medium",
    growthPeriod: "9-12 months",
    marketDemand: "Medium",
    estimatedYield: "40-60 tons/hectare",
    estimatedProfit: "₹200,000-350,000/hectare",
  },
  coconut: {
    waterRequirement: "High",
    growthPeriod: "12 months (fruiting)",
    marketDemand: "High",
    estimatedYield: "10,000-15,000 nuts/hectare",
    estimatedProfit: "₹150,000-250,000/hectare",
  },
  cotton: {
    waterRequirement: "Medium",
    growthPeriod: "150-180 days",
    marketDemand: "High",
    estimatedYield: "2.0-3.0 tons/hectare",
    estimatedProfit: "₹70,000-100,000/hectare",
  },
  jute: {
    waterRequirement: "High",
    growthPeriod: "100-120 days",
    marketDemand: "Medium",
    estimatedYield: "2.0-3.5 tons/hectare",
    estimatedProfit: "₹60,000-90,000/hectare",
  },
  coffee: {
    waterRequirement: "Medium",
    growthPeriod: "9-11 months (fruiting)",
    marketDemand: "High",
    estimatedYield: "1.5-2.5 tons/hectare",
    estimatedProfit: "₹200,000-350,000/hectare",
  },
}

// Soil suitability for each crop
const soilSuitability: Record<string, Record<string, number>> = {
  rice: { loamy: 0.8, clay: 1.0, sandy: 0.4, black: 0.7, red: 0.6 },
  maize: { loamy: 1.0, clay: 0.6, sandy: 0.7, black: 0.8, red: 0.7 },
  chickpea: { loamy: 0.9, clay: 0.7, sandy: 0.5, black: 1.0, red: 0.8 },
  kidneybeans: { loamy: 1.0, clay: 0.7, sandy: 0.6, black: 0.8, red: 0.7 },
  pigeonpeas: { loamy: 0.9, clay: 0.7, sandy: 0.5, black: 1.0, red: 0.8 },
  mothbeans: { loamy: 0.8, clay: 0.6, sandy: 0.7, black: 0.9, red: 0.8 },
  mungbean: { loamy: 0.9, clay: 0.7, sandy: 0.6, black: 1.0, red: 0.8 },
  blackgram: { loamy: 0.9, clay: 0.7, sandy: 0.5, black: 1.0, red: 0.8 },
  lentil: { loamy: 1.0, clay: 0.7, sandy: 0.5, black: 0.8, red: 0.7 },
  pomegranate: { loamy: 1.0, clay: 0.6, sandy: 0.8, black: 0.7, red: 0.8 },
  banana: { loamy: 1.0, clay: 0.7, sandy: 0.5, black: 0.8, red: 0.7 },
  mango: { loamy: 1.0, clay: 0.6, sandy: 0.7, black: 0.8, red: 0.9 },
  grapes: { loamy: 1.0, clay: 0.5, sandy: 0.8, black: 0.7, red: 0.8 },
  watermelon: { loamy: 0.9, clay: 0.5, sandy: 1.0, black: 0.7, red: 0.8 },
  muskmelon: { loamy: 0.9, clay: 0.5, sandy: 1.0, black: 0.7, red: 0.8 },
  apple: { loamy: 1.0, clay: 0.6, sandy: 0.5, black: 0.7, red: 0.8 },
  orange: { loamy: 1.0, clay: 0.6, sandy: 0.7, black: 0.8, red: 0.9 },
  papaya: { loamy: 1.0, clay: 0.5, sandy: 0.8, black: 0.7, red: 0.8 },
  coconut: { loamy: 0.9, clay: 0.6, sandy: 1.0, black: 0.7, red: 0.8 },
  cotton: { loamy: 0.9, clay: 0.8, sandy: 0.6, black: 1.0, red: 0.8 },
  jute: { loamy: 1.0, clay: 0.8, sandy: 0.5, black: 0.9, red: 0.7 },
  coffee: { loamy: 1.0, clay: 0.7, sandy: 0.5, black: 0.8, red: 0.9 },
}

// List of Indian states
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

// Soil types
const soilTypes = ["loamy", "sandy", "clay", "black", "red"]

export default function CropRecommendationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    temperature: "",
    rainfall: "",
    humidity: "",
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    landSize: "",
    soilType: "loamy",
    state: "Punjab",
  })
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Convert form data to numbers for prediction
    const inputData = {
      N: Number.parseFloat(formData.nitrogen),
      P: Number.parseFloat(formData.phosphorus),
      K: Number.parseFloat(formData.potassium),
      temperature: Number.parseFloat(formData.temperature),
      humidity: Number.parseFloat(formData.humidity),
      ph: Number.parseFloat(formData.ph),
      rainfall: Number.parseFloat(formData.rainfall),
      soilType: formData.soilType,
    }

    // Simulate API call and prediction
    setTimeout(() => {
      try {
        // Get prediction from our model
        const prediction = predictCrop(inputData)

        // Format the results with additional information
        const formattedResults = prediction.map((result) => {
          const cropName = result.crop.toLowerCase()
          const info = cropInfo[cropName] || {
            waterRequirement: "Medium",
            growthPeriod: "90-120 days",
            marketDemand: "Medium",
            estimatedYield: "Varies by region",
            estimatedProfit: "Varies by market conditions",
          }

          // Calculate estimated total profit based on land size
          const landSizeAcres = Number.parseFloat(formData.landSize) || 1
          const hectaresPerAcre = 0.404686 // 1 acre = 0.404686 hectares
          const landSizeHectares = landSizeAcres * hectaresPerAcre

          // Extract profit range from the string (e.g., "₹60,000-80,000/hectare")
          const profitMatch = info.estimatedProfit.match(/₹([\d,]+)-([\d,]+)/)
          let estimatedTotalProfit = "Varies based on conditions"

          if (profitMatch && profitMatch.length >= 3) {
            const minProfit = Number.parseInt(profitMatch[1].replace(/,/g, ""))
            const maxProfit = Number.parseInt(profitMatch[2].replace(/,/g, ""))
            const avgProfit = (minProfit + maxProfit) / 2
            const totalProfit = Math.round(avgProfit * landSizeHectares)
            estimatedTotalProfit = `₹${totalProfit.toLocaleString("en-IN")}`
          }

          // Get soil suitability rating
          const soilRating = soilSuitability[cropName]?.[formData.soilType] || 0.5
          const soilSuitabilityText = getSoilSuitabilityText(soilRating)

          return {
            name: result.crop,
            probability: result.probability,
            suitability: Math.round(result.probability * 100),
            ...info,
            estimatedTotalProfit,
            soilSuitability: soilSuitabilityText,
          }
        })

        setRecommendations(formattedResults)
        setShowResults(true)
      } catch (error) {
        console.error("Prediction error:", error)
        // Handle error case
      } finally {
        setIsLoading(false)
      }
    }, 2000)
  }

  // Helper function to convert soil suitability rating to text
  const getSoilSuitabilityText = (rating: number): string => {
    if (rating >= 0.9) return "Excellent"
    if (rating >= 0.7) return "Good"
    if (rating >= 0.5) return "Moderate"
    if (rating >= 0.3) return "Poor"
    return "Not Recommended"
  }

  return (
    <div>
      {!showResults ? (
        <Card className="bg-white border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Enter Your Land Details</CardTitle>
            <CardDescription>
              Provide soil and climate information to get personalized crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    name="temperature"
                    type="number"
                    step="0.01"
                    placeholder="Enter average temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rainfall">Rainfall (mm)</Label>
                  <Input
                    id="rainfall"
                    name="rainfall"
                    type="number"
                    step="0.01"
                    placeholder="Enter annual rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    name="humidity"
                    type="number"
                    step="0.01"
                    placeholder="Enter humidity percentage"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ph">Soil pH</Label>
                  <Input
                    id="ph"
                    name="ph"
                    type="number"
                    step="0.01"
                    min="0"
                    max="14"
                    placeholder="Enter soil pH (0-14)"
                    value={formData.ph}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen Content (kg/ha)</Label>
                  <Input
                    id="nitrogen"
                    name="nitrogen"
                    type="number"
                    step="0.01"
                    placeholder="Enter nitrogen content"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus Content (kg/ha)</Label>
                  <Input
                    id="phosphorus"
                    name="phosphorus"
                    type="number"
                    step="0.01"
                    placeholder="Enter phosphorus content"
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium Content (kg/ha)</Label>
                  <Input
                    id="potassium"
                    name="potassium"
                    type="number"
                    step="0.01"
                    placeholder="Enter potassium content"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landSize">Land Size (acres)</Label>
                  <Input
                    id="landSize"
                    name="landSize"
                    type="number"
                    step="0.01"
                    min="0.1"
                    placeholder="Enter land size in acres"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select
                    defaultValue={formData.soilType}
                    onValueChange={(value) => handleSelectChange("soilType", value)}
                  >
                    <SelectTrigger id="soilType">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Get Recommendations"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="bg-white border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Your Crop Recommendations</CardTitle>
              <CardDescription>
                Based on your {formData.soilType} soil and climate data for {formData.landSize} acres in{" "}
                {formData.state}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendations.slice(0, 3).map((crop, index) => (
                  <Card key={index} className={index === 0 ? "border-amber-200 bg-amber-50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className={index === 0 ? "text-amber-700" : "text-green-700"}>
                          {index === 0 && "★ Best Choice: "}
                          {crop.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-500">Suitability:</div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${crop.suitability}%` }}
                            ></div>
                          </div>
                          <div className="text-sm font-medium">{crop.suitability}%</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Water Requirement</div>
                          <div className="font-medium">{crop.waterRequirement}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Growth Period</div>
                          <div className="font-medium">{crop.growthPeriod}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Market Demand</div>
                          <div className="font-medium">{crop.marketDemand}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Soil Suitability</div>
                          <div className="font-medium">{crop.soilSuitability}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Probability</div>
                          <div className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{ width: `${crop.suitability}%` }}
                                ></div>
                              </div>
                              <span>{crop.suitability}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Estimated Yield</div>
                          <div className="font-medium text-green-700">{crop.estimatedYield}</div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Estimated Profit/Hectare</div>
                          <div className="font-medium text-amber-700">{crop.estimatedProfit}</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500">Estimated Total Profit</div>
                          <div className="font-medium text-blue-700">{crop.estimatedTotalProfit}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto"
                onClick={() => setShowResults(false)}
              >
                Modify Input Details
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">Download Detailed Report</Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Soil Health Analysis</CardTitle>
              <CardDescription>Based on your soil nutrient data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Nitrogen Level</Label>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        Number.parseFloat(formData.nitrogen) < 50
                          ? "bg-red-500"
                          : Number.parseFloat(formData.nitrogen) < 100
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(Number.parseFloat(formData.nitrogen) / 2, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {Number.parseFloat(formData.nitrogen) < 50
                      ? "Your soil is nitrogen deficient. Consider adding nitrogen-rich fertilizers."
                      : Number.parseFloat(formData.nitrogen) < 100
                        ? "Your soil has moderate nitrogen levels."
                        : "Your soil has good nitrogen levels."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Phosphorus Level</Label>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        Number.parseFloat(formData.phosphorus) < 30
                          ? "bg-red-500"
                          : Number.parseFloat(formData.phosphorus) < 60
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(Number.parseFloat(formData.phosphorus) / 1.5, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {Number.parseFloat(formData.phosphorus) < 30
                      ? "Your soil is phosphorus deficient. Consider adding phosphate fertilizers."
                      : Number.parseFloat(formData.phosphorus) < 60
                        ? "Your soil has moderate phosphorus levels."
                        : "Your soil has good phosphorus levels."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Potassium Level</Label>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        Number.parseFloat(formData.potassium) < 30
                          ? "bg-red-500"
                          : Number.parseFloat(formData.potassium) < 60
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(Number.parseFloat(formData.potassium) / 1.5, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {Number.parseFloat(formData.potassium) < 30
                      ? "Your soil is potassium deficient. Consider adding potash fertilizers."
                      : Number.parseFloat(formData.potassium) < 60
                        ? "Your soil has moderate potassium levels."
                        : "Your soil has good potassium levels."}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Soil Type Analysis</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-700 font-bold text-lg">
                      {formData.soilType.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {formData.soilType.charAt(0).toUpperCase() + formData.soilType.slice(1)} Soil
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formData.soilType === "loamy" &&
                        "Loamy soil is a mixture of sand, silt, and clay that is ideal for most crops due to good drainage and nutrient retention."}
                      {formData.soilType === "sandy" &&
                        "Sandy soil has large particles with good drainage but poor nutrient retention. Best for root vegetables and drought-resistant crops."}
                      {formData.soilType === "clay" &&
                        "Clay soil has small particles that retain water and nutrients well but can have poor drainage. Good for crops that need consistent moisture."}
                      {formData.soilType === "black" &&
                        "Black soil (also known as regur soil) is rich in calcium, potassium and magnesium carbonates. Excellent for cotton, wheat, and many cereals."}
                      {formData.soilType === "red" &&
                        "Red soil contains iron oxide and is typically found in warm, temperate, moist climates. Good for growing nuts, fruits, and root vegetables."}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Strengths</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {formData.soilType === "loamy" && (
                        <>
                          <li>Excellent water retention and drainage</li>
                          <li>Good nutrient retention</li>
                          <li>Easy to work with</li>
                          <li>Supports a wide variety of crops</li>
                        </>
                      )}
                      {formData.soilType === "sandy" && (
                        <>
                          <li>Excellent drainage</li>
                          <li>Warms up quickly in spring</li>
                          <li>Easy to work with</li>
                          <li>Good for root vegetables</li>
                        </>
                      )}
                      {formData.soilType === "clay" && (
                        <>
                          <li>Excellent nutrient retention</li>
                          <li>Holds water well</li>
                          <li>Good for summer crops</li>
                          <li>Stable and provides good support</li>
                        </>
                      )}
                      {formData.soilType === "black" && (
                        <>
                          <li>High water retention capacity</li>
                          <li>Rich in calcium, magnesium, potash</li>
                          <li>Self-ploughing nature</li>
                          <li>Good for cotton and cereals</li>
                        </>
                      )}
                      {formData.soilType === "red" && (
                        <>
                          <li>Good drainage properties</li>
                          <li>Rich in iron compounds</li>
                          <li>Responds well to fertilizers</li>
                          <li>Good for nuts and fruits</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Recommendations</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {formData.soilType === "loamy" && (
                        <>
                          <li>Maintain organic matter with compost</li>
                          <li>Suitable for most crops</li>
                          <li>Moderate watering schedule</li>
                        </>
                      )}
                      {formData.soilType === "sandy" && (
                        <>
                          <li>Add organic matter to improve water retention</li>
                          <li>Use mulch to prevent water evaporation</li>
                          <li>More frequent watering required</li>
                          <li>Consider drip irrigation</li>
                        </>
                      )}
                      {formData.soilType === "clay" && (
                        <>
                          <li>Add organic matter to improve drainage</li>
                          <li>Avoid overwatering</li>
                          <li>Avoid working when too wet or dry</li>
                          <li>Consider raised beds</li>
                        </>
                      )}
                      {formData.soilType === "black" && (
                        <>
                          <li>Ensure proper drainage during monsoon</li>
                          <li>Add organic matter for better structure</li>
                          <li>Ideal for cotton, wheat, sugarcane</li>
                          <li>Manage irrigation carefully</li>
                        </>
                      )}
                      {formData.soilType === "red" && (
                        <>
                          <li>Add organic matter to improve fertility</li>
                          <li>Use appropriate fertilizers</li>
                          <li>Implement water conservation techniques</li>
                          <li>Consider fruit trees and nuts</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Soil pH Analysis</h3>
                <div className="flex items-center gap-4">
                  <div className="w-full h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 to-blue-500 to-purple-500 rounded-full relative">
                    <div
                      className="absolute top-full left-0 h-3 w-0.5 bg-black"
                      style={{ left: `${(Number.parseFloat(formData.ph) / 14) * 100}%` }}
                    ></div>
                    <div
                      className="absolute top-full left-0 mt-1 text-xs font-medium"
                      style={{
                        left: `${(Number.parseFloat(formData.ph) / 14) * 100}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      pH {formData.ph}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-6">
                  <span>Acidic (0)</span>
                  <span>Neutral (7)</span>
                  <span>Alkaline (14)</span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  {Number.parseFloat(formData.ph) < 5.5
                    ? "Your soil is acidic. Consider adding lime to raise pH."
                    : Number.parseFloat(formData.ph) > 7.5
                      ? "Your soil is alkaline. Consider adding sulfur to lower pH."
                      : "Your soil pH is in the optimal range for most crops."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

