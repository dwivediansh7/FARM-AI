"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { getLocationSuggestions, type LocationSuggestion } from "@/lib/weather-service"

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void
  className?: string
}

export default function LocationSearch({ onLocationSelect, className = "" }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const { translate } = useLanguage()

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

    // Store the location in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "weatherLocation",
        JSON.stringify({
          lat: suggestion.lat,
          lon: suggestion.lon,
          name: `${suggestion.name}, ${suggestion.country}`,
        }),
      )

      // Call the onLocationSelect prop if provided
      onLocationSelect(suggestion.lat, suggestion.lon, `${suggestion.name}, ${suggestion.country}`)

      // Refresh the page to update weather data
      window.location.reload()
    }
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && suggestions.length > 0) {
      const firstSuggestion = suggestions[0]
      handleSelectSuggestion(firstSuggestion)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
          <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
            Search
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
    </div>
  )
}

