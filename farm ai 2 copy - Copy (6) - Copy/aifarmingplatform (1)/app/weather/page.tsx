import { ArrowLeft, Cloud, CloudRain, Droplets, Wind, Thermometer } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherWidget from "@/components/weather-widget"
import WeatherForecast from "@/components/weather-forecast"
import WeatherAlerts from "@/components/weather-alerts"
import LocationSearch from "@/components/location-search"

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Weather & Climate Insights</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get accurate forecasts, seasonal predictions, and timely alerts to plan your farming activities and
              protect your crops from adverse weather conditions.
            </p>
          </div>

          {/* Add the LocationSearch component here */}
          <div className="mb-8">
            <Card className="bg-white border-green-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-green-800 mb-4">Search Location</h2>
                <p className="text-gray-600 mb-4">Enter a city or location to get weather information for your area.</p>
                <LocationSearch
                  onLocationSelect={(lat, lon, name) => {
                    // This will be handled client-side, not during server rendering
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-amber-700 text-lg">Temperature</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28°C</div>
                <p className="text-gray-600 text-sm">Feels like 30°C</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-blue-700 text-lg">Humidity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">65%</div>
                <p className="text-gray-600 text-sm">Moderate</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-blue-700 text-lg">Rainfall</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0 mm</div>
                <p className="text-gray-600 text-sm">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-cyan-500" />
                  <CardTitle className="text-cyan-700 text-lg">Wind</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8 km/h</div>
                <p className="text-gray-600 text-sm">NE Direction</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-green-800 mb-4">Current Weather</h2>
            <WeatherWidget />
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-green-800 mb-4">10-Day Forecast</h2>
            <WeatherForecast />
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-green-800 mb-4">Weather Alerts & Advisories</h2>
            <WeatherAlerts />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">Seasonal Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-green-700 mb-2">Monsoon Outlook (June-September)</h3>
                    <p className="text-gray-600 mb-2">
                      The monsoon is expected to be normal to slightly above normal this year, with well-distributed
                      rainfall across most agricultural regions.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Rainfall Prediction:</span>
                      <span className="text-blue-600 font-medium">102% of Long Period Average</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-green-700 mb-2">Temperature Trend</h3>
                    <p className="text-gray-600 mb-2">
                      Temperatures are expected to remain slightly above normal for the next three months, with
                      occasional heat waves in May and early June.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-green-700 mb-2">AI-Based Recommendation</h3>
                    <p className="text-gray-600">
                      Consider planting heat-resistant varieties for summer crops. Prepare water conservation measures
                      for the pre-monsoon period. Monsoon sowing can proceed as per normal schedule.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">Climate-Smart Farming Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Droplets className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Water Management</h3>
                      <p className="text-gray-600 text-sm">
                        Install rainwater harvesting systems before monsoon. Consider drip irrigation for efficient
                        water use during dry spells.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Thermometer className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Heat Protection</h3>
                      <p className="text-gray-600 text-sm">
                        Use shade nets for sensitive crops during peak summer. Apply mulching to reduce soil temperature
                        and conserve moisture.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                      <Wind className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Wind Protection</h3>
                      <p className="text-gray-600 text-sm">
                        Establish windbreaks around orchards and vulnerable crops. Secure structures and covers before
                        forecasted storms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Cloud className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Crop Planning</h3>
                      <p className="text-gray-600 text-sm">
                        Diversify crops to reduce climate risk. Consider short-duration varieties that can be harvested
                        before extreme weather periods.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 bg-white rounded-lg p-6 border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-6">Weather Data Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-700">Basic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">Free</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>5-Day Forecast</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Daily Weather Updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Basic Weather Alerts</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                    Current Plan
                  </button>
                </CardContent>
              </Card>

              <Card className="border-green-100 relative">
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
                <CardHeader>
                  <CardTitle className="text-green-700">Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">
                    ₹499<span className="text-sm font-normal">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>15-Day Forecast</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Hourly Weather Updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Advanced Weather Alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Seasonal Predictions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Crop-Specific Recommendations</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded">
                    Upgrade Now
                  </button>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-700">Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">
                    ₹1,999<span className="text-sm font-normal">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>30-Day Forecast</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Real-time Weather Monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Custom Weather Stations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Climate Change Impact Analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>AI-Powered Farming Recommendations</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                    Contact Sales
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

