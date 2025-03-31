import { ArrowLeft, TrendingUp, BarChart2, ShoppingCart, Truck } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarketPrices from "@/components/market-prices"
import StorageLocations from "@/components/storage-locations"

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Market & Storage Insights</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access real-time crop prices, market trends, and storage facility information to make informed decisions
              and maximize your profits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-700 text-lg">Market Trends</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Track price trends and market movements for informed selling decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-700 text-lg">Price Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Compare prices across different markets and historical data.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-700 text-lg">Buyer Connect</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Connect directly with buyers and negotiate better prices.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-700 text-lg">Storage Finder</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Find optimal storage facilities near your location.</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="prices" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="prices">Crop Prices</TabsTrigger>
              <TabsTrigger value="storage">Storage Facilities</TabsTrigger>
            </TabsList>

            <TabsContent value="prices">
              <MarketPrices />
            </TabsContent>

            <TabsContent value="storage">
              <StorageLocations />
            </TabsContent>
          </Tabs>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">Market Insights</CardTitle>
                <CardDescription>Expert analysis and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-green-700 mb-2">Wheat Market Outlook</h3>
                    <p className="text-gray-600 mb-2">
                      Wheat prices are expected to remain stable with a slight upward trend over the next month due to
                      reduced global supply and steady demand.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Price Prediction:</span>
                      <span className="text-green-600 font-medium">↑ 3-5% in 30 days</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-green-700 mb-2">Rice Market Trends</h3>
                    <p className="text-gray-600 mb-2">
                      Rice prices are showing volatility due to changing export policies in major producing countries.
                      Consider holding stocks if possible.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Price Prediction:</span>
                      <span className="text-amber-600 font-medium">↕ Volatile in short term</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-green-700 mb-2">Soybean Market Analysis</h3>
                    <p className="text-gray-600 mb-2">
                      Soybean prices are expected to decline slightly as the new harvest enters the market. Consider
                      selling current stocks before the price drop.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Price Prediction:</span>
                      <span className="text-red-600 font-medium">↓ 2-4% in 15 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">Selling Tips</CardTitle>
                <CardDescription>Maximize your profits with these strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Timing Your Sales</h3>
                      <p className="text-gray-600 text-sm">
                        Monitor price trends and sell when demand is high. Avoid selling immediately after harvest when
                        prices are typically lower due to oversupply.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Quality Grading</h3>
                      <p className="text-gray-600 text-sm">
                        Ensure your crops are properly graded and sorted. Higher quality produce commands better prices
                        and attracts premium buyers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Direct Marketing</h3>
                      <p className="text-gray-600 text-sm">
                        Consider selling directly to processors or retailers to eliminate middlemen and increase your
                        profit margins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Collective Selling</h3>
                      <p className="text-gray-600 text-sm">
                        Join farmer producer organizations or cooperatives to increase bargaining power and access
                        better markets.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-6">Market Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-700">Price Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Receive notifications when crop prices reach your target levels or show significant changes.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Set Price Alerts</Button>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-700">Buyer Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get matched with potential buyers based on your crop type, quality, and quantity.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Find Buyers</Button>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-700">Market Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Access detailed weekly and monthly market reports with price analysis and forecasts.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">View Reports</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

