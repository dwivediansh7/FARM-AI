"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CropRecommendation = {
  name: string
  profitability: number
  suitability: number
  waterRequirement: "Low" | "Medium" | "High"
  growthPeriod: string
  marketDemand: "Low" | "Medium" | "High"
  estimatedYield: string
  estimatedProfit: string
}

export default function CropRecommendationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([
    {
      name: "Wheat",
      profitability: 85,
      suitability: 90,
      waterRequirement: "Medium",
      growthPeriod: "110-130 days",
      marketDemand: "High",
      estimatedYield: "4.5-5.5 tons/hectare",
      estimatedProfit: "₹65,000-80,000/hectare",
    },
    {
      name: "Chickpeas",
      profitability: 75,
      suitability: 85,
      waterRequirement: "Low",
      growthPeriod: "90-120 days",
      marketDemand: "Medium",
      estimatedYield: "1.8-2.2 tons/hectare",
      estimatedProfit: "₹55,000-70,000/hectare",
    },
    {
      name: "Mustard",
      profitability: 70,
      suitability: 80,
      waterRequirement: "Low",
      growthPeriod: "110-140 days",
      marketDemand: "Medium",
      estimatedYield: "1.2-1.5 tons/hectare",
      estimatedProfit: "₹45,000-60,000/hectare",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div>
      {!showResults ? (
        <Card className="bg-white border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Enter Your Land Details</CardTitle>
            <CardDescription>
              Provide information about your land to get personalized crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter your village/city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" placeholder="Enter your district" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue="punjab">
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                      <SelectItem value="mp">Madhya Pradesh</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="ap">Andhra Pradesh</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="land-size">Land Size (in acres)</Label>
                  <Input id="land-size" type="number" min="0.1" step="0.1" placeholder="Enter land size" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select defaultValue="loamy">
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="clayey">Clayey</SelectItem>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="silty">Silty</SelectItem>
                      <SelectItem value="peaty">Peaty</SelectItem>
                      <SelectItem value="chalky">Chalky</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigation">Irrigation Facility</Label>
                  <Select defaultValue="partial">
                    <SelectTrigger id="irrigation">
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full irrigation</SelectItem>
                      <SelectItem value="partial">Partial irrigation</SelectItem>
                      <SelectItem value="rainfed">Rainfed only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Water Availability</Label>
                <div className="pt-2">
                  <Slider defaultValue={[60]} max={100} step={1} />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previous-crop">Previous Crop (if any)</Label>
                <Input id="previous-crop" placeholder="What crop did you grow last season?" />
              </div>

              <div className="space-y-2">
                <Label>Investment Capacity</Label>
                <div className="pt-2">
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Get Recommendations"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="bg-white border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Your Crop Recommendations</CardTitle>
              <CardDescription>Based on your land details, climate data, and market trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommendations">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>
                <TabsContent value="recommendations" className="pt-6">
                  <div className="space-y-6">
                    {recommendations.map((crop, index) => (
                      <Card key={index} className={index === 0 ? "border-amber-200 bg-amber-50" : ""}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className={index === 0 ? "text-amber-700" : "text-green-700"}>
                              {index === 0 && "★ Best Choice: "}
                              {crop.name}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-gray-500">Suitability:</div>
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${crop.suitability}%` }}
                                ></div>
                              </div>
                              <div className="text-sm font-medium">{crop.suitability}%</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Water Requirement</div>
                              <div className="font-medium">{crop.waterRequirement}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Growth Period</div>
                              <div className="font-medium">{crop.growthPeriod}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Market Demand</div>
                              <div className="font-medium">{crop.marketDemand}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Profitability</div>
                              <div className="font-medium">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-amber-500 rounded-full"
                                      style={{ width: `${crop.profitability}%` }}
                                    ></div>
                                  </div>
                                  <span>{crop.profitability}%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-500">Estimated Yield</div>
                              <div className="font-medium text-green-700">{crop.estimatedYield}</div>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-500">Estimated Profit</div>
                              <div className="font-medium text-amber-700">{crop.estimatedProfit}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="comparison" className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-green-50 text-green-800">
                          <th className="border border-green-100 px-4 py-2 text-left">Crop</th>
                          <th className="border border-green-100 px-4 py-2 text-left">Suitability</th>
                          <th className="border border-green-100 px-4 py-2 text-left">Water Req.</th>
                          <th className="border border-green-100 px-4 py-2 text-left">Growth Period</th>
                          <th className="border border-green-100 px-4 py-2 text-left">Market Demand</th>
                          <th className="border border-green-100 px-4 py-2 text-left">Est. Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recommendations.map((crop, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-green-50"}>
                            <td className="border border-green-100 px-4 py-2 font-medium">
                              {index === 0 ? `★ ${crop.name}` : crop.name}
                            </td>
                            <td className="border border-green-100 px-4 py-2">{crop.suitability}%</td>
                            <td className="border border-green-100 px-4 py-2">{crop.waterRequirement}</td>
                            <td className="border border-green-100 px-4 py-2">{crop.growthPeriod}</td>
                            <td className="border border-green-100 px-4 py-2">{crop.marketDemand}</td>
                            <td className="border border-green-100 px-4 py-2">{crop.estimatedProfit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 w-full sm:w-auto"
                onClick={() => setShowResults(false)}
              >
                Modify Land Details
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">Download Detailed Report</Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Planting Calendar</CardTitle>
              <CardDescription>Optimal planting and harvesting times for recommended crops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                      (month, i) => (
                        <div key={i} className="flex-1 text-center text-sm font-medium">
                          {month}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-2 space-y-6">
                    <div>
                      <div className="text-sm font-medium mb-1">Wheat</div>
                      <div className="h-6 relative">
                        <div className="absolute left-0 right-0 h-full bg-gray-100 rounded-full"></div>
                        <div
                          className="absolute h-full bg-green-200 rounded-l-full"
                          style={{ left: "83.33%", right: "50%" }}
                        ></div>
                        <div
                          className="absolute h-full bg-amber-200 rounded-r-full"
                          style={{ left: "25%", right: "16.67%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Chickpeas</div>
                      <div className="h-6 relative">
                        <div className="absolute left-0 right-0 h-full bg-gray-100 rounded-full"></div>
                        <div
                          className="absolute h-full bg-green-200 rounded-l-full"
                          style={{ left: "83.33%", right: "58.33%" }}
                        ></div>
                        <div
                          className="absolute h-full bg-amber-200 rounded-r-full"
                          style={{ left: "16.67%", right: "16.67%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Mustard</div>
                      <div className="h-6 relative">
                        <div className="absolute left-0 right-0 h-full bg-gray-100 rounded-full"></div>
                        <div
                          className="absolute h-full bg-green-200 rounded-l-full"
                          style={{ left: "75%", right: "50%" }}
                        ></div>
                        <div
                          className="absolute h-full bg-amber-200 rounded-r-full"
                          style={{ left: "16.67%", right: "25%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                      <span>Planting Season</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-200 rounded-full"></div>
                      <span>Harvesting Season</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

