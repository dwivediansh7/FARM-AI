"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind, Loader2, Snowflake, CloudLightning } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import {
  getForecastByCoords,
  getWeatherIconUrl,
  getWeatherCondition,
  formatDate,
  getDayOfWeek,
  getStoredLocation,
  type ForecastData,
} from "@/lib/weather-service"

export default function WeatherForecast() {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { translate } = useLanguage()

  // Get user's location and fetch forecast data
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true)
        setError(null)

        // Default coordinates for New Delhi
        let latitude = 28.6139
        let longitude = 77.209

        // First check if we have a stored location
        const storedLocation = getStoredLocation()
        if (storedLocation) {
          latitude = storedLocation.lat
          longitude = storedLocation.lon
        } else {
          // Try to get user's location
          try {
            if (navigator.geolocation) {
              const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                  resolve,
                  reject,
                  { timeout: 5000 }, // Add timeout to prevent long waiting
                )
              })

              latitude = position.coords.latitude
              longitude = position.coords.longitude
            }
          } catch (geoError) {
            console.error("Geolocation error:", geoError)
            // Continue with default coordinates
          }
        }

        // Fetch forecast data with either user location or default
        const data = await getForecastByCoords(latitude, longitude)
        setForecastData(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch forecast data. Please try again.")
        setLoading(false)
        console.error(err)
      }
    }

    fetchForecast()
  }, [])

  // Group forecast data by day
  const getDailyForecast = () => {
    if (!forecastData) return []

    const dailyData: Record<string, any> = {}

    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]

      if (!dailyData[date]) {
        dailyData[date] = {
          date: item.dt,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          weather: item.weather[0],
          wind: item.wind,
          humidity: item.main.humidity,
          rain: item.rain ? item.rain["3h"] : 0,
        }
      } else {
        // Update min/max temperatures
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min)
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max)

        // If it's noon data, use it for the day's weather representation
        const hour = Number.parseInt(item.dt_txt.split(" ")[1].split(":")[0])
        if (hour === 12 || hour === 13) {
          dailyData[date].weather = item.weather[0]
        }

        // Accumulate rain data
        if (item.rain && item.rain["3h"]) {
          dailyData[date].rain += item.rain["3h"]
        }
      }
    })

    return Object.values(dailyData).slice(0, 10) // Limit to 10 days
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-amber-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "windy":
        return <Wind className="h-8 w-8 text-cyan-500" />
      case "snowy":
        return <Snowflake className="h-8 w-8 text-blue-200" />
      case "stormy":
        return <CloudLightning className="h-8 w-8 text-purple-500" />
      default:
        return <Sun className="h-8 w-8 text-amber-500" />
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {translate("Try Again")}
          </button>
        </CardContent>
      </Card>
    )
  }

  const dailyForecast = getDailyForecast()

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-green-800">
          {forecastData
            ? `${translate("10-Day Forecast for")} ${forecastData.city.name}, ${forecastData.city.country}`
            : translate("10-Day Forecast")}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        {dailyForecast.map((day, index) => (
          <Card key={index} className={index === 0 ? "border-green-200 bg-green-50" : ""}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="font-medium text-gray-800">
                  {index === 0 ? translate("Today") : translate(getDayOfWeek(day.date))}
                </div>
                <div className="text-sm text-gray-500">{formatDate(day.date)}</div>

                <div className="my-3 flex justify-center">
                  {day.weather.icon ? (
                    <img
                      src={getWeatherIconUrl(day.weather.icon) || "/placeholder.svg"}
                      alt={day.weather.description}
                      className="h-12 w-12"
                    />
                  ) : (
                    getWeatherIcon(getWeatherCondition(day.weather.id))
                  )}
                </div>

                <div className="font-bold text-lg">{Math.round(day.temp_max)}°C</div>
                <div className="text-sm text-gray-500">{Math.round(day.temp_min)}°C</div>

                <div className="mt-2 text-sm capitalize">{translate(day.weather.description)}</div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-blue-50 p-1 rounded">
                    <span className="block text-blue-700">{translate("Humidity")}</span>
                    <span className="font-medium">{day.humidity}%</span>
                  </div>
                  <div className="bg-cyan-50 p-1 rounded">
                    <span className="block text-cyan-700">{translate("Wind")}</span>
                    <span className="font-medium">{Math.round(day.wind.speed)} km/h</span>
                  </div>
                </div>

                {day.rain > 0 && (
                  <div className="mt-2 text-xs text-blue-600">
                    <span className="font-medium">
                      {translate("Precipitation")}: {day.rain.toFixed(1)} mm
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-blue-50 border-t border-blue-100">
        <div className="text-sm text-blue-700">
          <span className="font-medium">{translate("Farming Tip:")}</span>{" "}
          {dailyForecast.some((day) => day.weather.main === "Rain")
            ? translate(
                "Rain expected in the coming days. Consider harvesting ripe crops and ensuring proper drainage.",
              )
            : dailyForecast.some((day) => day.temp_max > 30)
              ? translate(
                  "High temperatures expected. Ensure adequate irrigation and consider shade for sensitive crops.",
                )
              : translate("Favorable weather conditions expected. Ideal for regular farming activities.")}
        </div>
      </div>
    </div>
  )
}

