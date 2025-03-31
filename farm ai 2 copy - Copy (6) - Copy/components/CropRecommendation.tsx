'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ErrorBoundary from './ErrorBoundary';

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
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700">Enter Your Land Details</h2>
          <p className="text-gray-600">Provide soil and climate information to get personalized crop recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form fields here - same as previous implementation */}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
          >
            {loading ? 'Processing...' : 'Get Recommendations'}
          </button>
        </form>

        {prediction && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-xl font-medium text-green-900">Recommended Crop</h3>
            <div className="mt-2 text-2xl font-bold text-green-700">{prediction}</div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default CropRecommendation; 