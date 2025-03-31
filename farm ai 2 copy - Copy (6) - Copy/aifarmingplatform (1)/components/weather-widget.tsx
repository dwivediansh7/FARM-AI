"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind, Loader2, MapPin, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  getWeatherByCoords,
  getWeatherByCity,
  getWeatherIconUrl,
  getWeatherCondition,
  getStoredLocation,
  type WeatherData,
  type LocationSuggestion,
  getLocationSuggestions,
} from "@/lib/weather-service"

type WeatherWidgetProps = {
  defaultLocation?: string
}

export default function WeatherWidget({ defaultLocation = "New Delhi, India" }: WeatherWidgetProps) {
  const [location, setLocation] = useState(defaultLocation)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Request user's location on component mount
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // First check if we have a stored location
        const storedLocation = getStoredLocation()
        if (storedLocation) {
          await fetchWeatherByCoords(storedLocation.lat, storedLocation.lon)
          return
        }

        // Try to get user's geolocation
        if (navigator.geolocation) {
          setLoading(true)
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              await fetchWeatherByCoords(latitude, longitude)
            },
            async (error) => {
              console.error("Geolocation error:", error)
              // Fallback to default location without showing an error
              await fetchWeatherByCity(defaultLocation.split(",")[0])
            },
            { timeout: 5000 }, // Add timeout to prevent long waiting
          )
        } else {
          // Fallback to default location without showing an error
          await fetchWeatherByCity(defaultLocation.split(",")[0])
        }
      } catch (err) {
        console.error("Geolocation access error:", err)
        // Fallback to default location without showing an error
        await fetchWeatherByCity(defaultLocation.split(",")[0])
      }
    }

    getUserLocation()
  }, [defaultLocation])

  // Fetch weather data by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getWeatherByCoords(lat, lon)
      setWeatherData(data)
      setLocation(`${data.name}, ${data.sys.country}`)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch weather data by city name
  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getWeatherByCity(city)
      setWeatherData(data)
      setLocation(`${data.name}, ${data.sys.country}`)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handle search input change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 2) {
      try {
        setIsSearching(true)
        const suggestions = await getLocationSuggestions(query)
        setSuggestions(suggestions)
        setShowSuggestions(true)
      } catch (err) {
        console.error("Failed to fetch suggestions:", err)
      } finally {
        setIsSearching(false)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    setSearchQuery("")
    setShowSuggestions(false)
    fetchWeatherByCoords(suggestion.lat, suggestion.lon)

    // Store the location in localStorage for future use
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "weatherLocation",
        JSON.stringify({
          lat: suggestion.lat,
          lon: suggestion.lon,
          name: `${suggestion.name}, ${suggestion.country}`,
        }),
      )
    }
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      fetchWeatherByCity(searchQuery)
      setSearchQuery("")
      setShowSuggestions(false)
    }
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
      case "stormy":
        return <CloudRain className="h-8 w-8 text-purple-500" />
      case "snowy":
        return <Cloud className="h-8 w-8 text-blue-200" />
      default:
        return <Sun className="h-8 w-8 text-amber-500" />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <h3 className="text-xl font-bold">{location}</h3>
          </div>
          <div>
            <Button
              onClick={() => setIsSearching(!isSearching)}
              size="sm"
              className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full"
            >
              Change Location
            </Button>
          </div>
        </div>

        {isSearching && (
          <form onSubmit={handleSearchSubmit} className="mb-4 relative">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-white/20 border-none text-white placeholder:text-white/70"
              />
              <Button type="submit" size="icon" className="bg-white/30 hover:bg-white/40">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      {suggestion.name}, {suggestion.state ? `${suggestion.state}, ` : ""}
                      {suggestion.country}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-white/80">{error}</p>
            <Button
              onClick={() => fetchWeatherByCity(defaultLocation.split(",")[0])}
              className="mt-2 bg-white/20 hover:bg-white/30"
            >
              Try Again
            </Button>
          </div>
        ) : (
          weatherData && (
            <div className="flex items-center gap-4">
              {weatherData.weather[0].icon ? (
                <img
                  src={getWeatherIconUrl(weatherData.weather[0].icon) || "/placeholder.svg"}
                  alt={weatherData.weather[0].description}
                  className="h-16 w-16"
                />
              ) : (
                getWeatherIcon(getWeatherCondition(weatherData.weather[0].id))
              )}
              <div>
                <div className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</div>
                <div className="capitalize">{weatherData.weather[0].description}</div>
              </div>
            </div>
          )
        )}
      </div>

      {!loading && !error && weatherData && (
        <Tabs defaultValue="forecast" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="forecast">Weather Details</TabsTrigger>
              <TabsTrigger value="details">Farming Advice</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="forecast" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Humidity</div>
                    <div className="text-lg font-bold">{weatherData.main.humidity}%</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Wind Speed</div>
                    <div className="text-lg font-bold">{weatherData.wind.speed} km/h</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Feels Like</div>
                    <div className="text-lg font-bold">{Math.round(weatherData.main.feels_like)}°C</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Pressure</div>
                      <div className="text-lg font-bold">{weatherData.main.pressure} hPa</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Cloudiness</div>
                      <div className="text-lg font-bold">{weatherData.clouds.all}%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="p-6">
            <div className="mt-2">
              <h4 className="font-medium mb-2">Farming Recommendations</h4>
              <p className="text-gray-600">
                {weatherData.weather[0].main === "Clear" &&
                  "Ideal conditions for harvesting. Consider irrigation in the evening."}
                {weatherData.weather[0].main === "Clouds" &&
                  "Good conditions for field work and planting. Monitor humidity levels."}
                {(weatherData.weather[0].main === "Rain" || weatherData.weather[0].main === "Drizzle") &&
                  "Postpone spraying and harvesting. Check drainage systems."}
                {weatherData.weather[0].main === "Thunderstorm" &&
                  "Secure equipment and livestock. Avoid outdoor work until the storm passes."}
                {weatherData.weather[0].main === "Snow" &&
                  "Protect sensitive crops from frost. Ensure livestock has adequate shelter."}
                {weatherData.wind.speed > 20 && "Avoid spraying pesticides. Secure any loose structures or coverings."}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Crop-Specific Advice</h4>
              <div className="space-y-2">
                {weatherData.main.temp > 30 && (
                  <p className="text-amber-600">
                    High temperature alert: Ensure adequate irrigation for heat-sensitive crops.
                  </p>
                )}
                {weatherData.main.humidity > 80 && (
                  <p className="text-blue-600">
                    High humidity alert: Monitor for fungal diseases in crops like tomatoes and grapes.
                  </p>
                )}
                {weatherData.main.humidity < 30 && (
                  <p className="text-amber-600">
                    Low humidity alert: Increase irrigation frequency for shallow-rooted crops.
                  </p>
                )}
                {weatherData.wind.speed > 15 && (
                  <p className="text-cyan-600">
                    Strong winds: Consider delaying fertilizer application and pesticide spraying.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      <div className="p-4 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-blue-700">
            <span className="font-medium">AI Prediction:</span>{" "}
            {weatherData
              ? weatherData.weather[0].main === "Rain"
                ? "Continued rainfall expected. Consider postponing outdoor activities."
                : weatherData.main.temp > 30
                  ? "High temperatures expected to continue. Ensure crops are well-irrigated."
                  : "Stable weather conditions expected for the next 24 hours."
              : "Loading weather prediction..."}
          </div>
          <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded">
            View Detailed Forecast
          </button>
        </div>
      </div>
    </div>
  )
}

