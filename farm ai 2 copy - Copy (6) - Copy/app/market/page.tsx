import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Market & Storage Insights</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access real-time crop pricing and find optimal storage facilities to maximize your profits and reduce
              post-harvest losses.
            </p>
          </div>

          <Tabs defaultValue="prices" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="prices">Crop Prices</TabsTrigger>
              <TabsTrigger value="storage">Storage Facilities</TabsTrigger>
            </TabsList>

            <TabsContent value="prices" className="pt-6">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 bg-amber-50 border-b border-amber-100 flex justify-between items-center">
                  <h2 className="font-bold text-amber-800">Current Market Prices</h2>
                  <div className="text-sm text-amber-700">Last updated: Today, 8:00 AM</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Crop</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Market</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Min Price (₹/Quintal)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Max Price (₹/Quintal)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">Wheat</td>
                        <td className="px-4 py-3 text-sm">Delhi</td>
                        <td className="px-4 py-3 text-sm">2,100</td>
                        <td className="px-4 py-3 text-sm">2,250</td>
                        <td className="px-4 py-3 text-sm text-green-600">↑ 2.5%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">Rice (Basmati)</td>
                        <td className="px-4 py-3 text-sm">Punjab</td>
                        <td className="px-4 py-3 text-sm">3,800</td>
                        <td className="px-4 py-3 text-sm">4,200</td>
                        <td className="px-4 py-3 text-sm text-green-600">↑ 1.8%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">Soybean</td>
                        <td className="px-4 py-3 text-sm">Madhya Pradesh</td>
                        <td className="px-4 py-3 text-sm">3,600</td>
                        <td className="px-4 py-3 text-sm">3,850</td>
                        <td className="px-4 py-3 text-sm text-red-600">↓ 1.2%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">Cotton</td>
                        <td className="px-4 py-3 text-sm">Gujarat</td>
                        <td className="px-4 py-3 text-sm">5,800</td>
                        <td className="px-4 py-3 text-sm">6,200</td>
                        <td className="px-4 py-3 text-sm text-green-600">↑ 3.5%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">Potato</td>
                        <td className="px-4 py-3 text-sm">Uttar Pradesh</td>
                        <td className="px-4 py-3 text-sm">1,200</td>
                        <td className="px-4 py-3 text-sm">1,450</td>
                        <td className="px-4 py-3 text-sm text-red-600">↓ 2.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                    View Price History
                  </Button>
                  <Button className="bg-amber-600 hover:bg-amber-700">Set Price Alerts</Button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-amber-100">
                  <CardHeader>
                    <CardTitle className="text-amber-700">Price Predictions</CardTitle>
                    <CardDescription>AI-powered price forecasts for the next 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Wheat</span>
                        <span className="text-green-600 font-medium">Expected to rise by 3-5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rice</span>
                        <span className="text-green-600 font-medium">Expected to rise by 1-2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Soybean</span>
                        <span className="text-amber-600 font-medium">Expected to remain stable</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cotton</span>
                        <span className="text-green-600 font-medium">Expected to rise by 4-6%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Potato</span>
                        <span className="text-red-600 font-medium">Expected to fall by 2-3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-100">
                  <CardHeader>
                    <CardTitle className="text-amber-700">Market Insights</CardTitle>
                    <CardDescription>Factors affecting current crop prices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Supply Chain Disruptions</h3>
                        <p className="text-sm text-gray-600">
                          Recent transportation strikes have affected supply in some regions, leading to price
                          increases.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Weather Conditions</h3>
                        <p className="text-sm text-gray-600">
                          Favorable rainfall in northern regions has improved crop yield expectations, stabilizing
                          prices.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Export Demand</h3>
                        <p className="text-sm text-gray-600">
                          Increased international demand for Indian wheat and rice is driving prices upward.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="storage" className="pt-6">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
                <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
                  <h2 className="font-bold text-green-800">Nearby Storage Facilities</h2>
                  <div className="text-sm text-green-700">
                    <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                      Filter Options
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-green-700 mb-2">Government Warehouse - Delhi</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Distance:</span>
                          <span>12 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Capacity:</span>
                          <span>5000 tons</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Available Space:</span>
                          <span className="text-green-600">1200 tons (24%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Cost:</span>
                          <span>₹2.5/kg/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Facilities:</span>
                          <span>Temperature control, Pest control</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Book Storage</Button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-green-700 mb-2">Private Cold Storage - Ghaziabad</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Distance:</span>
                          <span>18 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Capacity:</span>
                          <span>2000 tons</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Available Space:</span>
                          <span className="text-amber-600">400 tons (20%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Cost:</span>
                          <span>₹3.2/kg/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Facilities:</span>
                          <span>Cold storage, Humidity control</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Book Storage</Button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-green-700 mb-2">Farmer Cooperative Storage - Sonipat</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Distance:</span>
                          <span>25 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Capacity:</span>
                          <span>3000 tons</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Available Space:</span>
                          <span className="text-green-600">1800 tons (60%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Cost:</span>
                          <span>₹2.0/kg/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Facilities:</span>
                          <span>Basic storage, Security</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Book Storage</Button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-green-700 mb-2">Modern Warehouse - Faridabad</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Distance:</span>
                          <span>30 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Capacity:</span>
                          <span>8000 tons</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Available Space:</span>
                          <span className="text-red-600">200 tons (2.5%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Cost:</span>
                          <span>₹3.5/kg/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Facilities:</span>
                          <span>Climate control, 24/7 monitoring</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Join Waitlist</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="text-green-700">Storage Best Practices</CardTitle>
                    <CardDescription>Maximize shelf life and quality of your crops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 p-1 rounded-full text-green-700 mt-0.5">
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
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Ensure crops are properly dried before storage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 p-1 rounded-full text-green-700 mt-0.5">
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
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Monitor temperature and humidity regularly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 p-1 rounded-full text-green-700 mt-0.5">
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
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Implement proper pest control measures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 p-1 rounded-full text-green-700 mt-0.5">
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
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Use appropriate packaging materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-green-100 p-1 rounded-full text-green-700 mt-0.5">
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
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-600">Rotate stock using first-in, first-out principle</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      Download Storage Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="text-green-700">Transportation Services</CardTitle>
                    <CardDescription>Connect with reliable transport providers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <div>
                          <h3 className="font-medium">Local Transporters</h3>
                          <p className="text-sm text-gray-500">For distances up to 50 km</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          View Options
                        </Button>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <div>
                          <h3 className="font-medium">Regional Logistics</h3>
                          <p className="text-sm text-gray-500">For interstate transport</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          View Options
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Cold Chain Transport</h3>
                          <p className="text-sm text-gray-500">For perishable goods</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          View Options
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Request Transport Quote</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

