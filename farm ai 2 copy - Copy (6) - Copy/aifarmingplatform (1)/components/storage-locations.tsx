"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

type StorageLocation = {
  id: number
  name: string
  location: string
  state: string
  capacity: string
  price: number
  unit: string
  contact: string
}

const storageLocations: StorageLocation[] = [
  {
    id: 1,
    name: "AgriStorage Solutions",
    location: "Indore",
    state: "Madhya Pradesh",
    capacity: "5000 MT",
    price: 150,
    unit: "MT/month",
    contact: "+91 9876543210",
  },
  {
    id: 2,
    name: "GrainBank Warehouses",
    location: "Karnal",
    state: "Haryana",
    capacity: "3000 MT",
    price: 180,
    unit: "MT/month",
    contact: "+91 9988776655",
  },
  {
    id: 3,
    name: "FarmSafe Storage",
    location: "Rajkot",
    state: "Gujarat",
    capacity: "4000 MT",
    price: 160,
    unit: "MT/month",
    contact: "+91 8899001122",
  },
  {
    id: 4,
    name: "CropSecure Facilities",
    location: "Ujjain",
    state: "Madhya Pradesh",
    capacity: "6000 MT",
    price: 140,
    unit: "MT/month",
    contact: "+91 7766554433",
  },
  {
    id: 5,
    name: "HarvestHoldings",
    location: "Davangere",
    state: "Karnataka",
    capacity: "2500 MT",
    price: 200,
    unit: "MT/month",
    contact: "+91 6677889900",
  },
]

export default function StorageLocations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")

  const filteredLocations = storageLocations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesState = selectedState === "all" || location.state === selectedState

    return matchesSearch && matchesState
  })

  const uniqueStates = Array.from(new Set(storageLocations.map((location) => location.state)))

  return (
    <div className="space-y-6">
      <Card className="bg-white border-green-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by facility name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div>
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
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-50 text-green-800">
                  <th className="border border-green-100 px-4 py-2 text-left">Facility Name</th>
                  <th className="border border-green-100 px-4 py-2 text-left">Location</th>
                  <th className="border border-green-100 px-4 py-2 text-left">State</th>
                  <th className="border border-green-100 px-4 py-2 text-right">Capacity</th>
                  <th className="border border-green-100 px-4 py-2 text-right">Price (₹)</th>
                  <th className="border border-green-100 px-4 py-2 text-left">Contact</th>
                </tr>
              </thead>
              <tbody>
                {filteredLocations.map((location) => (
                  <tr key={location.id} className="hover:bg-green-50">
                    <td className="border border-green-100 px-4 py-2">{location.name}</td>
                    <td className="border border-green-100 px-4 py-2">{location.location}</td>
                    <td className="border border-green-100 px-4 py-2">{location.state}</td>
                    <td className="border border-green-100 px-4 py-2 text-right">{location.capacity}</td>
                    <td className="border border-green-100 px-4 py-2 text-right">
                      {location.price} / {location.unit}
                    </td>
                    <td className="border border-green-100 px-4 py-2">{location.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

