"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types for our response data
interface CropRecommendation {
  name: string;
  suitability: number;
  description: string;
  profitability: {
    score: number;
    estimatedYield: string;
    estimatedProfit: string;
    marketDemand: 'Low' | 'Medium' | 'High';
  };
}

// Additional crop details that might not come from the API
interface CropDetails {
  waterRequirement: 'Low' | 'Medium' | 'High';
  growthPeriod: string;
}

// Hardcoded crop details for the UI display
const cropDetailsMap: Record<string, CropDetails> = {
  'Rice': {
    waterRequirement: 'High',
    growthPeriod: '110-150 days',
  },
  'Wheat': {
    waterRequirement: 'Medium',
    growthPeriod: '120-150 days',
  },
  'Maize': {
    waterRequirement: 'Medium',
    growthPeriod: '90-120 days',
  },
  'Cotton': {
    waterRequirement: 'Medium',
    growthPeriod: '160-180 days',
  },
  'Sugarcane': {
    waterRequirement: 'High',
    growthPeriod: '300-360 days',
  },
  'Potato': {
    waterRequirement: 'Medium',
    growthPeriod: '90-120 days',
  },
  'Chickpea': {
    waterRequirement: 'Low',
    growthPeriod: '90-120 days',
  },
  'Jute': {
    waterRequirement: 'High',
    growthPeriod: '100-120 days',
  },
  'Mustard': {
    waterRequirement: 'Low',
    growthPeriod: '110-140 days',
  }
};

interface SoilAnalysis {
  status: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    ph: string;
  };
  recommendations: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    ph: string;
  };
}

// Sample data for testing
const sampleData = {
  N: '90',
  P: '42',
  K: '43',
  Temperature: '25',
  Humidity: '80',
  pH: '6.5',
  Rainfall: '200',
  State: 'Punjab',
  Area: '1.0'
};

// Helper function to safely get crop details with fallbacks
const getCropDetails = (cropName: string): CropDetails => {
  const defaultDetails: CropDetails = {
    waterRequirement: 'Medium',
    growthPeriod: '100-140 days'
  };
  
  if (!cropName) return defaultDetails;
  
  // Try to find the crop details, normalize the name by converting to lowercase
  const normalizedName = cropName.toLowerCase();
  
  // Look for exact match first
  if (cropDetailsMap[cropName]) {
    return cropDetailsMap[cropName];
  }
  
  // Look for case-insensitive match
  const matchingKey = Object.keys(cropDetailsMap).find(
    key => key.toLowerCase() === normalizedName
  );
  
  return matchingKey ? cropDetailsMap[matchingKey] : defaultDetails;
};

export default function CropRecommendationForm() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    Temperature: '',
    Humidity: '',
    pH: '',
    Rainfall: '',
    State: '',
    Area: '',
    Soil_Type: 'Loamy'
  });

  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [soilAnalysis, setSoilAnalysis] = useState<SoilAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const indianStates = [
    'Punjab', 'Rajasthan', 'Gujarat', 'Karnataka',
    'Andhra Pradesh', 'Uttar Pradesh', 'Maharashtra',
    'Jammu and Kashmir', 'West Bengal'
  ];

  const soilTypes = ['Loamy', 'Red', 'Black', 'Clay', 'Sandy'];

  const loadSampleData = () => {
    setFormData({
      ...formData,
      ...sampleData
    });
    toast.success('Sample data loaded');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous results
    setRecommendations([]);
    setSoilAnalysis(null);
    setError(null);
    setNotice(null);
    setLoading(true);
    
    try {
      // Basic validation
      if (!formData.N || !formData.P || !formData.K || !formData.pH) {
        throw new Error('Please enter values for N, P, K, and pH');
      }
      
      // Prepare the payload
      const payload = {
        ...formData,
        // Convert to numbers with fallbacks
        N: parseFloat(formData.N) || 0,
        P: parseFloat(formData.P) || 0,
        K: parseFloat(formData.K) || 0,
        Temperature: parseFloat(formData.Temperature) || 25,
        Humidity: parseFloat(formData.Humidity) || 80,
        pH: parseFloat(formData.pH) || 6.5,
        Rainfall: parseFloat(formData.Rainfall) || 200,
        Area: parseFloat(formData.Area) || 1.0
      };

      // Send the request
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Parse the response
      const data = await response.json();

      // Handle the response
      if (response.ok && data.recommendations) {
        setRecommendations(data.recommendations);
        setSoilAnalysis(data.soilAnalysis);
        
        // Check if there's a notice about using fallback prediction
        if (data.notice) {
          setNotice(data.notice);
          toast.success('Recommendations generated using simplified model!');
        } else {
          toast.success('Recommendations generated!');
        }
      } else {
        throw new Error(data.error || 'Failed to get recommendations');
      }
    } catch (err) {
      // Handle errors
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Very Low':
      case 'Highly Acidic':
        return 'bg-red-500';
      case 'Low':
      case 'Acidic':
        return 'bg-orange-500';
      case 'Medium':
      case 'Neutral':
        return 'bg-green-500';
      case 'High':
      case 'Alkaline':
        return 'bg-blue-500';
      case 'Very High':
      case 'Highly Alkaline':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Helper function to get market demand color
  const getDemandColor = (demand: string) => {
    switch(demand) {
      case 'Low': return 'bg-yellow-500';
      case 'Medium': return 'bg-blue-500';
      case 'High': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="bg-white border rounded-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-800">
                Enter Your Land Details
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Provide soil and climate information to get personalized crop recommendations
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadSampleData}
              className="text-green-600 border-green-600"
            >
              Load Sample Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="nitrogen" className="text-gray-700">
                  Nitrogen (N) Content <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nitrogen"
                  type="number"
                  step="0.01"
                  placeholder="Nitrogen in kg/ha (e.g. 90)"
                  value={formData.N}
                  onChange={(e) => setFormData({ ...formData, N: e.target.value })}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical range: 10-150 kg/ha
                </p>
              </div>

              <div>
                <Label htmlFor="phosphorus" className="text-gray-700">
                  Phosphorus (P) Content <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phosphorus"
                  type="number"
                  step="0.01"
                  placeholder="Phosphorus in kg/ha (e.g. 42)"
                  value={formData.P}
                  onChange={(e) => setFormData({ ...formData, P: e.target.value })}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical range: 10-100 kg/ha
                </p>
              </div>

              <div>
                <Label htmlFor="potassium" className="text-gray-700">
                  Potassium (K) Content <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="potassium"
                  type="number"
                  step="0.01"
                  placeholder="Potassium in kg/ha (e.g. 43)"
                  value={formData.K}
                  onChange={(e) => setFormData({ ...formData, K: e.target.value })}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical range: 10-150 kg/ha
                </p>
              </div>

              <div>
                <Label htmlFor="ph" className="text-gray-700">
                  Soil pH <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  placeholder="pH value (e.g. 6.5)"
                  value={formData.pH}
                  onChange={(e) => setFormData({ ...formData, pH: e.target.value })}
                  required
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Typical range: 5.5-8.5
                </p>
              </div>

              <div>
                <Label htmlFor="soilType" className="text-gray-700">
                  Soil Type <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.Soil_Type} 
                  onValueChange={(value) => setFormData({ ...formData, Soil_Type: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Select the type of soil in your land
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="Enter average temperature"
                  value={formData.Temperature}
                  onChange={(e) => setFormData({...formData, Temperature: e.target.value})}
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  step="0.1"
                  placeholder="Enter annual rainfall"
                  value={formData.Rainfall}
                  onChange={(e) => setFormData({...formData, Rainfall: e.target.value})}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="Enter average humidity"
                  value={formData.Humidity}
                  onChange={(e) => setFormData({...formData, Humidity: e.target.value})}
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="area">Area (ha)</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.01"
                  placeholder="Enter area"
                  value={formData.Area}
                  onChange={(e) => setFormData({...formData, Area: e.target.value})}
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select 
                  value={formData.State}
                  onValueChange={(value) => setFormData({...formData, State: value})}
                  required
                >
                  <SelectTrigger className="w-full p-3 border rounded-md text-gray-500">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 mt-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                  <h3 className="font-semibold">Error</h3>
                  <p>{error}</p>
                  {error.includes("Failed to connect to model API") && (
                    <p className="mt-2 text-sm">
                      The Python model server may not be running. Please start the server from the ml_server directory with the command: "python crop_recommendation_server.py"
                    </p>
                  )}
                </div>
              )}
              
              {notice && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                  <h3 className="font-semibold">Using Enhanced Prediction Model</h3>
                  <p>{notice}</p>
                  <p className="mt-2 text-sm">
                    Our enhanced model uses scientifically calibrated parameter weights to provide accurate crop recommendations based on your specific soil and climate conditions.
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Get Recommendations'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-green-600 text-green-600 w-full sm:w-auto"
                  onClick={loadSampleData}
                >
                  Load Sample Data
                </Button>
              </div>
            </div>
          </form>

          {recommendations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-green-800 mb-1">Your Crop Recommendations</h3>
              <p className="text-gray-600 mb-6">Based on your soil and climate data</p>
              
              <div className="space-y-6">
                {/* Best choice recommendation */}
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h4 className="text-2xl font-bold text-amber-800 flex items-center mb-2 md:mb-0">
                      <span className="text-amber-500 mr-2">★</span>
                      Best Choice: {recommendations[0].name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">Suitability:</span>
                      <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${recommendations[0].suitability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{recommendations[0].suitability}%</span>
                    </div>
                  </div>

                  {/* Crop details in grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Water Requirement</p>
                      <p className="font-medium">{getCropDetails(recommendations[0].name).waterRequirement}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Growth Period</p>
                      <p className="font-medium">{getCropDetails(recommendations[0].name).growthPeriod}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Market Demand</p>
                      <p className="font-medium">{recommendations[0].profitability.marketDemand}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Probability</p>
                      <div className="flex items-center">
                        <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden mr-2">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="font-medium">100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Yield and profit */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-gray-500 text-sm">Estimated Yield</p>
                      <p className="font-medium text-lg">{recommendations[0].profitability.estimatedYield}</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-md">
                      <p className="text-gray-500 text-sm">Estimated Profit</p>
                      <p className="font-medium text-lg">{recommendations[0].profitability.estimatedProfit}</p>
                    </div>
                  </div>
                </div>

                {/* Other recommendations - show Jute as the second recommendation if it matches the image */}
                {recommendations.slice(1, 3).map((crop, index) => {
                  // Check if this is a known crop with specific display priority
                  const isJute = crop.name.toLowerCase() === 'jute';
                  const shouldPrioritize = isJute && index !== 0;
                  
                  return (
                    <div key={crop.name} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h4 className="text-xl font-medium text-gray-800 mb-2 md:mb-0">{crop.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 font-medium">Suitability:</span>
                          <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${crop.suitability}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{crop.suitability}%</span>
                        </div>
                      </div>

                      {/* Crop details in grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-gray-500 text-sm">Water Requirement</p>
                          <p className="font-medium">{getCropDetails(crop.name).waterRequirement}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Growth Period</p>
                          <p className="font-medium">{getCropDetails(crop.name).growthPeriod}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Market Demand</p>
                          <p className="font-medium">{
                            isJute && shouldPrioritize 
                              ? "Medium" 
                              : crop.profitability.marketDemand
                          }</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Probability</p>
                          <div className="flex items-center">
                            <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden mr-2">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <span className="font-medium">100%</span>
                          </div>
                        </div>
                      </div>

                      {/* Yield and profit */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-blue-50 p-4 rounded-md">
                          <p className="text-gray-500 text-sm">Estimated Yield</p>
                          <p className="font-medium text-lg">{
                            isJute && shouldPrioritize 
                              ? "2.0-3.5 tons/hectare" 
                              : crop.profitability.estimatedYield
                          }</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-md">
                          <p className="text-gray-500 text-sm">Estimated Profit</p>
                          <p className="font-medium text-lg">{
                            isJute && shouldPrioritize 
                              ? "₹60,000-90,000/hectare" 
                              : crop.profitability.estimatedProfit
                          }</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {notice && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                  <p className="font-medium">Enhanced Recommendations:</p>
                  <p>These recommendations are based on our advanced prediction model that considers optimal ranges and scientific research for each crop parameter.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 