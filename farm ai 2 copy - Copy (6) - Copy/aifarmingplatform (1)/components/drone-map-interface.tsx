"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DroneMapInterface() {
  const [mapType, setMapType] = useState("rgb")
  const [zoomLevel, setZoomLevel] = useState([50])
  const [date, setDate] = useState("latest")

  return (
    <Card className="border-green-100">
      <CardContent className="p-0">
        <Tabs defaultValue="map" className="w-full">
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center p-4">
              <TabsList>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="history">Historical Data</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Select value={date} onValueChange={setDate}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest (May 15, 2023)</SelectItem>
                    <SelectItem value="apr2023">April 10, 2023</SelectItem>
                    <SelectItem value="mar2023">March 5, 2023</SelectItem>
                    <SelectItem value="feb2023">February 20, 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <TabsContent value="map" className="m-0">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-2">
              <Button
                variant={mapType === "rgb" ? "default" : "outline"}
                size="sm"
                onClick={() => setMapType("rgb")}
                className={mapType === "rgb" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                RGB
              </Button>
              <Button
                variant={mapType === "ndvi" ? "default" : "outline"}
                size="sm"
                onClick={() => setMapType("ndvi")}
                className={mapType === "ndvi" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                NDVI
              </Button>
              <Button
                variant={mapType === "thermal" ? "default" : "outline"}
                size="sm"
                onClick={() => setMapType("thermal")}
                className={mapType === "thermal" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Thermal
              </Button>
              <Button
                variant={mapType === "elevation" ? "default" : "outline"}
                size="sm"
                onClick={() => setMapType("elevation")}
                className={mapType === "elevation" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Elevation
              </Button>
              <Button
                variant={mapType === "moisture" ? "default" : "outline"}
                size="sm"
                onClick={() => setMapType("moisture")}
                className={mapType === "moisture" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Moisture
              </Button>
              <div className="ml-auto flex items-center gap-2">
                <Label htmlFor="zoom" className="text-sm">
                  Zoom:
                </Label>
                <Slider id="zoom" className="w-32" value={zoomLevel} onValueChange={setZoomLevel} max={100} step={1} />
              </div>
            </div>

            <div className="relative h-[500px] bg-gray-100 flex items-center justify-center">
              {mapType === "rgb" && (
                <img
                  src="/placeholder.svg?height=500&width=800"
                  alt="RGB Drone Map"
                  className="w-full h-full object-cover"
                />
              )}
              {mapType === "ndvi" && (
                <div className="w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-70 flex items-center justify-center">
                  <span className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded">
                    NDVI Vegetation Health Map
                  </span>
                </div>
              )}
              {mapType === "thermal" && (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 opacity-70 flex items-center justify-center">
                  <span className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded">Thermal Heat Map</span>
                </div>
              )}
              {mapType === "elevation" && (
                <div className="w-full h-full bg-gradient-to-r from-green-900 via-green-500 to-yellow-500 opacity-70 flex items-center justify-center">
                  <span className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded">
                    Elevation Contour Map
                  </span>
                </div>
              )}
              {mapType === "moisture" && (
                <div className="w-full h-full bg-gradient-to-r from-yellow-500 via-blue-300 to-blue-600 opacity-70 flex items-center justify-center">
                  <span className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded">Soil Moisture Map</span>
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
                <div className="text-xs font-medium mb-1">Legend:</div>
                {mapType === "ndvi" && (
                  <div className="flex items-center gap-1">
                    <div className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                    <div className="flex justify-between w-full text-xs">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                )}
                {mapType === "thermal" && (
                  <div className="flex items-center gap-1">
                    <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
                    <div className="flex justify-between w-full text-xs">
                      <span>Cold</span>
                      <span>Hot</span>
                    </div>
                  </div>
                )}
                {mapType === "elevation" && (
                  <div className="flex items-center gap-1">
                    <div className="w-full h-2 bg-gradient-to-r from-green-900 via-green-500 to-yellow-500"></div>
                    <div className="flex justify-between w-full text-xs">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                )}
                {mapType === "moisture" && (
                  <div className="flex items-center gap-1">
                    <div className="w-full h-2 bg-gradient-to-r from-yellow-500 via-blue-300 to-blue-600"></div>
                    <div className="flex justify-between w-full text-xs">
                      <span>Dry</span>
                      <span>Wet</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-green-800">Farm: Greenfield Estate</h3>
                  <p className="text-sm text-gray-500">Last updated: May 15, 2023</p>
                </div>
                <div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Download Map
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="m-0">
            <div className="p-6">
              <h3 className="text-lg font-medium text-green-800 mb-4">Crop Health Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700 mb-2">Vegetation Health</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Health</span>
                        <span className="text-sm font-medium text-green-600">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">North Section</span>
                        <span className="text-sm font-medium text-green-600">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">South Section</span>
                        <span className="text-sm font-medium text-amber-600">62%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>AI Analysis:</strong> The south section shows signs of stress. Consider increasing
                      irrigation in this area.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700 mb-2">Pest & Disease Detection</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pest Risk</span>
                      <span className="text-sm font-medium text-amber-600">Medium</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Disease Risk</span>
                      <span className="text-sm font-medium text-green-600">Low</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weed Presence</span>
                      <span className="text-sm font-medium text-red-600">High (NE Corner)</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>AI Recommendation:</strong> Apply targeted weed control in the northeast corner of the
                      field. Monitor for aphids in the central region.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-green-800 mt-8 mb-4">Soil Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700 mb-2">Moisture Levels</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">68%</div>
                  <div className="text-sm text-gray-600">
                    <p>Optimal range: 60-75%</p>
                    <p className="mt-2">
                      <strong>Status:</strong> <span className="text-green-600">Good</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700 mb-2">Nitrogen Content</h4>
                  <div className="text-3xl font-bold text-amber-600 mb-2">Low</div>
                  <div className="text-sm text-gray-600">
                    <p>Detected deficiency in western section</p>
                    <p className="mt-2">
                      <strong>Recommendation:</strong> Apply nitrogen fertilizer
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700 mb-2">Soil pH</h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">6.8</div>
                  <div className="text-sm text-gray-600">
                    <p>Optimal range: 6.5-7.2</p>
                    <p className="mt-2">
                      <strong>Status:</strong> <span className="text-green-600">Optimal</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="m-0">
            <div className="p-6">
              <h3 className="text-lg font-medium text-green-800 mb-4">Historical Data Comparison</h3>

              <div className="mb-6">
                <Label className="mb-2 block">Select comparison dates:</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="may2023" className="mr-2" checked />
                    <label htmlFor="may2023">May 2023</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="apr2023" className="mr-2" checked />
                    <label htmlFor="apr2023">April 2023</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mar2023" className="mr-2" />
                    <label htmlFor="mar2023">March 2023</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="feb2023" className="mr-2" />
                    <label htmlFor="feb2023">February 2023</label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-medium text-green-700 mb-4">Crop Growth Progress</h4>
                <div className="h-64 bg-white rounded border border-gray-200 p-4 flex items-center justify-center">
                  <p className="text-gray-500">Growth comparison chart would appear here</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700 mb-2">Vegetation Health Trend</h4>
                  <div className="h-48 bg-white rounded border border-gray-200 p-4 flex items-center justify-center">
                    <p className="text-gray-500">Health trend chart would appear here</p>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>Analysis:</strong> Overall vegetation health has improved by 12% since April, indicating
                      effective management practices.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-green-700 mb-2">Moisture Level Trend</h4>
                  <div className="h-48 bg-white rounded border border-gray-200 p-4 flex items-center justify-center">
                    <p className="text-gray-500">Moisture trend chart would appear here</p>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>Analysis:</strong> Soil moisture has remained consistent despite lower rainfall,
                      suggesting effective irrigation management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

