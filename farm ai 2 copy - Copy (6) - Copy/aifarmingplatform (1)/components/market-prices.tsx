"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

type CropPrice = {
  id: number
  crop: string
  variety: string
  market: string
  state: string
  price: number
  unit: string
  change: number
  lastUpdated: string
}

const cropPrices: CropPrice[] = [
  {
    id: 1,
    crop: "Wheat",
    variety: "Sharbati",
    market: "Indore Mandi",
    state: "Madhya Pradesh",
    price: 2250,
    unit: "quintal",
    change: 2.3,
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: 2,
    crop: "Rice",
    variety: "Basmati",
    market: "Karnal Mandi",
    state: "Haryana",
    price: 3800,
    unit: "quintal",
    change: 1.5,
    lastUpdated: "Today, 11:15 AM",
  },
  {
    id: 3,
    crop: "Cotton",
    variety: "Long Staple",
    market: "Rajkot Mandi",
    state: "Gujarat",
    price: 6200,
    unit: "quintal",
    change: -0.8,
    lastUpdated: "Today, 09:45 AM",
  },
  {
    id: 4,
    crop: "Soybean",
    variety: "Yellow",
    market: "Ujjain Mandi",
    state: "Madhya Pradesh",
    price: 4100,
    unit: "quintal",
    change: 3.2,
    lastUpdated: "Today, 10:00 AM",
  },
  {
    id: 5,
    crop: "Maize",
    variety: "Hybrid",
    market: "Davangere Mandi",
    state: "Karnataka",
    price: 1850,
    unit: "quintal",
    change: -1.2,
    lastUpdated: "Today, 09:30 AM",
  },
  {
    id: 6,
    crop: "Potato",
    variety: "Kufri Jyoti",
    market: "Agra Mandi",
    state: "Uttar Pradesh",
    price: 1200,
    unit: "quintal",
    change: 5.5,
    lastUpdated: "Today, 08:45 AM",
  },
  {
    id: 7,
    crop: "Onion",
    variety: "Red",
    market: "Lasalgaon Mandi",
    state: "Maharashtra",
    price: 1500,
    unit: "quintal",
    change: -2.5,
    lastUpdated: "Today, 09:15 AM",
  },
  {
    id: 8,
    crop: "Tomato",
    variety: "Hybrid",
    market: "Kolar Mandi",
    state: "Karnataka",
    price: 1800,
    unit: "quintal",
    change: 7.2,
    lastUpdated: "Today, 08:30 AM",
  },
]

export default function MarketPrices() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")

  const filteredPrices = cropPrices.filter((price) => {
    const matchesSearch =
      price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.variety.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesState = selectedState === "all" || price.state === selectedState
    const matchesCrop = selectedCrop === "all" || price.crop === selectedCrop

    return matchesSearch && matchesState && matchesCrop
  })

  const uniqueStates = Array.from(new Set(cropPrices.map((price) => price.state)))
  const uniqueCrops = Array.from(new Set(cropPrices.map((price) => price.crop)))

  return (
    <div className="space-y-6">
      <Card className="bg-white border-green-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by crop, market, or variety..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {uniqueStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  {uniqueCrops.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-50 text-green-800">
                  <th className="border border-green-100 px-4 py-2 text-left">Crop</th>
                  <th className="border border-green-100 px-4 py-2 text-left">Variety</th>
                  <th className="border border-green-100 px-4 py-2 text-left">Market</th>
                  <th className="border border-green-100 px-4 py-2 text-left">State</th>
                  <th className="border border-green-100 px-4 py-2 text-right">Price (₹)</th>
                  <th className="border border-green-100 px-4 py-2 text-center">Change</th>
                  <th className="border border-green-100 px-4 py-2 text-left">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((price) => (
                  <tr key={price.id} className="hover:bg-green-50">
                    <td className="border border-green-100 px-4 py-2 font-medium">{price.crop}</td>
                    <td className="border border-green-100 px-4 py-2">{price.variety}</td>
                    <td className="border border-green-100 px-4 py-2">{price.market}</td>
                    <td className="border border-green-100 px-4 py-2">{price.state}</td>
                    <td className="border border-green-100 px-4 py-2 text-right font-medium">
                      ₹{price.price}/{price.unit}
                    </td>
                    <td className="border border-green-100 px-4 py-2 text-center">
                      <span
                        className={`inline-flex items-center ${price.change >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {price.change >= 0 ? "↑" : "↓"} {Math.abs(price.change)}%
                      </span>
                    </td>
                    <td className="border border-green-100 px-4 py-2 text-sm text-gray-500">{price.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPrices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No matching crop prices found. Try adjusting your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

