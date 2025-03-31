import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    State: '',  // Changed to match model's expected input
    N: '',      // Nitrogen
    P: '',      // Phosphorus
    K: '',      // Potassium
    pH: '',     // pH level
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Gujarat', 'Jammu and Kashmir', 
    'Karnataka', 'Maharashtra', 'Punjab', 'Rajasthan', 
    'Uttar Pradesh', 'West Bengal'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      // Adding default values for other required parameters
      const payload = {
        ...formData,
        Temperature: 25.1,
        Humidity: 80.2,
        Rainfall: 200.5,
        Area: 1.0
      };

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
        toast.success('Prediction generated successfully!');
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Crop Recommendation</h2>
          <p className="mt-2 text-sm text-gray-600">Enter soil parameters to get crop suggestions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={formData.State}
              onChange={(e) => setFormData({...formData, State: e.target.value})}
            >
              <option value="">Select State</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nitrogen (N)</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={formData.N}
              onChange={(e) => setFormData({...formData, N: parseFloat(e.target.value)})}
              placeholder="Enter nitrogen content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phosphorus (P)</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={formData.P}
              onChange={(e) => setFormData({...formData, P: parseFloat(e.target.value)})}
              placeholder="Enter phosphorus content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Potassium (K)</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={formData.K}
              onChange={(e) => setFormData({...formData, K: parseFloat(e.target.value)})}
              placeholder="Enter potassium content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">pH Level</label>
            <input
              type="number"
              required
              min="0"
              max="14"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={formData.pH}
              onChange={(e) => setFormData({...formData, pH: parseFloat(e.target.value)})}
              placeholder="Enter pH level (0-14)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
          >
            {loading ? 'Analyzing...' : 'Get Recommendation'}
          </button>
        </form>

        {prediction && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-medium text-green-900">Recommended Crop</h3>
            <div className="mt-2 text-2xl font-bold text-green-700">{prediction}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation; 