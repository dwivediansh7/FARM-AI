import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    Temperature: '',
    Rainfall: '',
    Humidity: '',
    pH: '',
    N: '',
    P: '',
    K: '',
    Area: '',
    State: '',
    Soil_Type: ''
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const indianStates = [
    'Punjab', 'Rajasthan', 'Gujarat', 'Karnataka',
    'Andhra Pradesh', 'Uttar Pradesh', 'Maharashtra',
    'Jammu and Kashmir', 'West Bengal'
  ];

  const soilTypes = ['Loamy', 'Red', 'Black', 'Clay', 'Sandy'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
        toast.success('Recommendation generated successfully!');
      } else {
        toast.error(data.detail || 'Prediction failed');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">
            Enter Your Land Details
          </CardTitle>
          <p className="text-gray-600">
            Provide soil and climate information to get personalized crop recommendations
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature and Rainfall */}
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="Enter average temperature"
                  value={formData.Temperature}
                  onChange={(e) => setFormData({...formData, Temperature: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="Enter annual rainfall"
                  value={formData.Rainfall}
                  onChange={(e) => setFormData({...formData, Rainfall: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>

              {/* Humidity and pH */}
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  placeholder="Enter humidity percentage"
                  value={formData.Humidity}
                  onChange={(e) => setFormData({...formData, Humidity: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ph">Soil pH</Label>
                <Input
                  id="ph"
                  type="number"
                  min="0"
                  max="14"
                  step="0.1"
                  placeholder="Enter soil pH (0-14)"
                  value={formData.pH}
                  onChange={(e) => setFormData({...formData, pH: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>

              {/* NPK Content */}
              <div className="space-y-2">
                <Label htmlFor="nitrogen">Nitrogen Content (kg/ha)</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  placeholder="Enter nitrogen content"
                  value={formData.N}
                  onChange={(e) => setFormData({...formData, N: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phosphorus">Phosphorus Content (kg/ha)</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  placeholder="Enter phosphorus content"
                  value={formData.P}
                  onChange={(e) => setFormData({...formData, P: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>

              {/* Potassium and Land Size */}
              <div className="space-y-2">
                <Label htmlFor="potassium">Potassium Content (kg/ha)</Label>
                <Input
                  id="potassium"
                  type="number"
                  placeholder="Enter potassium content"
                  value={formData.K}
                  onChange={(e) => setFormData({...formData, K: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Land Size (acres)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Enter land size in acres"
                  value={formData.Area}
                  onChange={(e) => setFormData({...formData, Area: e.target.value})}
                  required
                  className="w-full p-2 border rounded-md bg-white"
                />
              </div>

              {/* Soil Type and State */}
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select
                  value={formData.Soil_Type}
                  onValueChange={(value) => setFormData({...formData, Soil_Type: value})}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select Soil Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={formData.State}
                  onValueChange={(value) => setFormData({...formData, State: value})}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select State" />
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

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Get Recommendations'}
            </Button>
          </form>

          {prediction && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium text-green-900">Recommended Crop</h3>
              <p className="mt-2 text-2xl font-bold text-green-700">{prediction}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CropRecommendation; 