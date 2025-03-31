"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/contexts/translation-context"
import { Search, Cloud, Droplets, Wind, Thermometer, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeatherData {
  temperature: number
  minTemp: number
  humidity: number
  windSpeed: number
  description: string
  pressure: number
  feelsLike: number
  cloudiness: number
}

interface ForecastDay {
  date: string
  dayName: string
  temp: number
  minTemp: number
  humidity: number
  windSpeed: number
  condition: string
}

export default function WeatherWidget() {
  const { t } = useTranslation()
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getLocationSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          query
        )}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      const data = await response.json()
      setSuggestions(data)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions([])
    }
  }

  const fetchWeatherAndForecast = async (lat: number, lon: number) => {
    setIsLoading(true)
    setError(null)
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      )
      const weatherData = await weatherResponse.json()

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      )
      const forecastData = await forecastResponse.json()

      if (weatherData.cod === "404" || forecastData.cod === "404") {
        setError("Location not found")
        return
      }

      // Process current weather
      setWeather({
        temperature: Math.round(weatherData.main.temp),
        minTemp: Math.round(weatherData.main.temp_min),
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        description: weatherData.weather[0].description,
        pressure: weatherData.main.pressure,
        feelsLike: Math.round(weatherData.main.feels_like),
        cloudiness: weatherData.clouds.all
      })

      // Process forecast data
      const processedForecast = forecastData.list
        .filter((item: any, index: number) => index % 8 === 0) // Get one reading per day
        .slice(0, 5) // Get 5 days
        .map((item: any) => {
          const date = new Date(item.dt * 1000)
          return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
            temp: Math.round(item.main.temp),
            minTemp: Math.round(item.main.temp_min),
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            condition: item.weather[0].main
          }
        })

      setForecast(processedForecast)
    } catch (error) {
      console.error("Error fetching weather:", error)
      setError("Failed to fetch weather data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (location) {
        getLocationSuggestions(location)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [location])

  const handleLocationSelect = (suggestion: any) => {
    setLocation(`${suggestion.name}, ${suggestion.state || ""}, ${suggestion.country}`.replace(/^,\s*|,\s*$/g, ''))
    setSuggestions([])
    fetchWeatherAndForecast(suggestion.lat, suggestion.lon)
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear sky':
      case 'clear':
        return <div className="w-8 h-8 bg-amber-400 rounded-full" />
      case 'clouds':
      case 'overcast clouds':
        return <Cloud className="w-8 h-8 text-gray-400" />
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-500 to-cyan-400">
      <CardHeader className="text-white pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span className="text-xl font-semibold">{location || "New Delhi, IN"}</span>
          </div>
          <Button variant="ghost" className="text-white hover:text-blue-100">
            Change Location
          </Button>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
        </div>
      </CardHeader>

      {suggestions.length > 0 && (
        <div className="mx-6 mb-4 bg-white rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
              onClick={() => handleLocationSelect(suggestion)}
            >
              {`${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ""}, ${suggestion.country}`}
            </button>
          ))}
        </div>
      )}

      <CardContent>
        {weather && (
          <div className="text-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {getWeatherIcon(weather.description)}
                <div>
                  <div className="text-5xl font-bold">{weather.temperature}°C</div>
                  <div className="text-lg capitalize">{weather.description}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <Droplets className="h-4 w-4" />
                  Humidity
                </div>
                <div className="text-2xl font-bold">{weather.humidity}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <Wind className="h-4 w-4" />
                  Wind Speed
                </div>
                <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <Thermometer className="h-4 w-4" />
                  Feels Like
                </div>
                <div className="text-2xl font-bold">{weather.feelsLike}°C</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">10-Day Forecast</h3>
              <div className="grid grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm mb-1">{day.dayName}</div>
                    <div className="mb-1">{getWeatherIcon(day.condition)}</div>
                    <div className="text-lg font-bold">{day.temp}°C</div>
                    <div className="text-sm text-white/70">{day.minTemp}°C</div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>{day.humidity}%</span>
                      <span>{day.windSpeed}km/h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  AI Prediction: High temperatures expected to continue. Ensure crops are well-irrigated.
                </p>
                <Button variant="ghost" className="text-white text-sm hover:text-blue-100">
                  View Detailed Forecast
                </Button>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center text-white py-8">
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="text-center text-red-200 bg-red-500/20 rounded-lg p-4">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

