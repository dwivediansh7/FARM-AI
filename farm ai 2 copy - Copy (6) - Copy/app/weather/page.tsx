import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import WeatherWidget from "@/components/weather-widget"

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Weather & Climate Alerts</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay ahead with accurate weather forecasts and predictive insights to plan your farming activities
              effectively.
            </p>
          </div>

          <div className="mb-12">
            <WeatherWidget />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Weather-Based Farming Recommendations</h2>
              <p className="text-gray-600 mb-6">
                Our AI analyzes weather patterns to provide personalized recommendations for your farming activities.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-2">Planting Recommendations</h3>
                  <p className="text-gray-600">
                    Based on the current forecast, the next 3 days will be ideal for planting wheat and barley.
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-medium text-amber-700 mb-2">Harvesting Alert</h3>
                  <p className="text-gray-600">
                    Rain is expected in 5 days. Consider harvesting mature crops before then to avoid losses.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-2">Irrigation Planning</h3>
                  <p className="text-gray-600">
                    With high temperatures expected, increase irrigation for the next week to prevent crop stress.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Long-Term Climate Insights</h2>
              <p className="text-gray-600 mb-6">
                Plan your seasonal farming activities with our long-term climate predictions and historical analysis.
              </p>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium">Seasonal Outlook: Next 3 Months</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Temperature</span>
                      <span className="text-amber-600 font-medium">Above Average</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rainfall</span>
                      <span className="text-blue-600 font-medium">Average</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Humidity</span>
                      <span className="text-green-600 font-medium">Below Average</span>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-medium mb-2">Recommendation</h4>
                      <p className="text-gray-600 text-sm">
                        Consider drought-resistant crop varieties and implement water conservation measures for the
                        upcoming season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Weather Alerts & Notifications</h2>
            <p className="text-gray-600 text-center mb-8">
              Stay informed with timely alerts about extreme weather events that could affect your farm.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-blue-700 mb-2">SMS Alerts</h3>
                <p className="text-gray-600 mb-4">Receive immediate text messages for urgent weather warnings.</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Set Up SMS Alerts</button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-blue-700 mb-2">Email Reports</h3>
                <p className="text-gray-600 mb-4">Get detailed weekly weather forecasts delivered to your inbox.</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Subscribe to Reports</button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-blue-700 mb-2">Mobile App Notifications</h3>
                <p className="text-gray-600 mb-4">Enable push notifications on our mobile app for real-time updates.</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Download Our App</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

