// OpenWeather API key - this is a free API key for demo purposes
// In production, you should use environment variables
const API_KEY = "1b312c4d9edb3a31555c22b7327b3126"
const BASE_URL = "https://api.openweathermap.org/data/2.5"
const GEO_URL = "https://api.openweathermap.org/geo/1.0"

export type WeatherData = {
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  rain?: {
    "1h"?: number
    "3h"?: number
  }
  name: string
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  coord: {
    lat: number
    lon: number
  }
}

export type ForecastData = {
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    wind: {
      speed: number
      deg: number
    }
    clouds: {
      all: number
    }
    rain?: {
      "3h"?: number
    }
    dt_txt: string
  }>
  city: {
    name: string
    country: string
    sunrise: number
    sunset: number
    coord: {
      lat: number
      lon: number
    }
  }
}

export type LocationSuggestion = {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

// Get current weather by coordinates
export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw new Error("Failed to fetch weather data. Please try again.")
  }
}

// Get current weather by city name
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw new Error("Failed to fetch weather data. Please try again.")
  }
}

// Get 5-day forecast by coordinates
export async function getForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
  try {
    const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch forecast data: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    throw new Error("Failed to fetch forecast data. Please try again.")
  }
}

// Get location suggestions based on search query
export async function getLocationSuggestions(query: string): Promise<LocationSuggestion[]> {
  try {
    const response = await fetch(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch location suggestions: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching location suggestions:", error)
    return [] // Return empty array on error
  }
}

// Get stored location from localStorage
export function getStoredLocation(): { lat: number; lon: number; name: string } | null {
  if (typeof window !== "undefined") {
    const storedLocation = localStorage.getItem("weatherLocation")
    if (storedLocation) {
      try {
        return JSON.parse(storedLocation)
      } catch (e) {
        console.error("Failed to parse stored location", e)
      }
    }
  }
  return null
}

// Get weather icon URL
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

// Convert weather condition to a more user-friendly format
export function getWeatherCondition(weatherId: number): "sunny" | "cloudy" | "rainy" | "windy" | "snowy" | "stormy" {
  if (weatherId >= 200 && weatherId < 300) return "stormy"
  if (weatherId >= 300 && weatherId < 600) return "rainy"
  if (weatherId >= 600 && weatherId < 700) return "snowy"
  if (weatherId >= 700 && weatherId < 800) return "windy"
  if (weatherId === 800) return "sunny"
  if (weatherId > 800) return "cloudy"
  return "sunny" // default
}

// Format date from timestamp
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

// Format time from timestamp
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

// Get day of week from timestamp
export function getDayOfWeek(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("en-US", { weekday: "long" })
}

