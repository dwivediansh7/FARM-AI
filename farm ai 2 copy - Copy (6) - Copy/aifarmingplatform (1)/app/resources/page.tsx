import { ArrowLeft, BookOpen, Video, FileText, Download, Users } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TalkToExpert from "@/components/talk-to-expert"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Farming Resources & Knowledge Hub</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access our comprehensive collection of farming resources, educational materials, and expert advice to
              enhance your agricultural knowledge and practices.
            </p>
          </div>

          <Tabs defaultValue="library" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="library">Knowledge Library</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="expert">Talk to Expert</TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white border-green-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-green-700 text-lg">Crop Guides</CardTitle>
                    </div>
                    <CardDescription>Detailed guides for various crops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Wheat Cultivation Guide
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Rice Farming Techniques
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Cotton Growing Best Practices
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Vegetable Farming Handbook
                        </Link>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      View All Crop Guides
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-green-700 text-lg">Farming Techniques</CardTitle>
                    </div>
                    <CardDescription>Modern and traditional farming methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Precision Farming Guide
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Organic Farming Methods
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Sustainable Agriculture Practices
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Crop Rotation Strategies
                        </Link>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      View All Techniques
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-green-700 text-lg">Pest & Disease Control</CardTitle>
                    </div>
                    <CardDescription>Identification and management guides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Common Crop Pests Identification
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Integrated Pest Management
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Organic Pest Control Methods
                        </Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <Link href="#" className="text-gray-700 hover:text-green-600">
                          Plant Disease Management
                        </Link>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      View All Pest Guides
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-green-800 mb-4">Latest Publications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white border-green-100">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-700 mb-1">Climate-Resilient Farming Strategies</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            Learn how to adapt your farming practices to changing climate conditions and extreme weather
                            events.
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Published: May 15, 2023</span>
                            <Button variant="ghost" size="sm" className="h-8 text-green-600 hover:text-green-700">
                              <Download className="h-4 w-4 mr-1" /> Download PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-green-100">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-700 mb-1">Water Conservation in Agriculture</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            Discover effective techniques for conserving water while maintaining optimal crop yields.
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Published: April 28, 2023</span>
                            <Button variant="ghost" size="sm" className="h-8 text-green-600 hover:text-green-700">
                              <Download className="h-4 w-4 mr-1" /> Download PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg p-6 border border-green-100">
                <h2 className="text-xl font-bold text-green-800 mb-4">Government Schemes & Subsidies</h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-medium text-green-700 mb-1">PM-KISAN Scheme</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Income support of ₹6,000 per year in three equal installments to all land holding farmer families.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
                      Learn More & Apply
                    </Button>
                  </div>
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-medium text-green-700 mb-1">Pradhan Mantri Fasal Bima Yojana</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Crop insurance scheme to provide financial support to farmers suffering crop loss/damage due to
                      unforeseen events.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
                      Learn More & Apply
                    </Button>
                  </div>
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-medium text-green-700 mb-1">Soil Health Card Scheme</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Provides information on soil health and recommendations on appropriate dosage of nutrients for
                      improving soil health and fertility.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
                      Learn More & Apply
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-700 mb-1">Micro Irrigation Fund</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Financial assistance to states for expanding coverage of micro irrigation systems.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
                      Learn More & Apply
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white border-green-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-green-700 text-lg">Crop Cultivation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-3">
                      <img
                        src="/placeholder.svg?height=200&width=350"
                        alt="Crop Cultivation Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 rounded-full p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-600"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium text-green-700 mb-1">Wheat Cultivation Techniques</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Learn the best practices for wheat cultivation from soil preparation to harvesting.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Duration: 18:24</span>
                      <span>Views: 12.5K</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-green-700 text-lg">Pest Management</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-3">
                      <img
                        src="/placeholder.svg?height=200&width=350"
                        alt="Pest Management Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 rounded-full p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-600"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium text-green-700 mb-1">Integrated Pest Management</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Discover effective and sustainable methods to manage pests in your crops.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Duration: 22:15</span>
                      <span>Views: 9.8K</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-green-700 text-lg">Water Management</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-3">
                      <img
                        src="/placeholder.svg?height=200&width=350"
                        alt="Water Management Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 rounded-full p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-600"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium text-green-700 mb-1">Drip Irrigation Systems</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Learn how to set up and maintain efficient drip irrigation systems for your farm.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Duration: 15:42</span>
                      <span>Views: 15.3K</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-green-800 mb-4">Featured Video Series</h2>
                <Card className="bg-white border-green-100">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src="/placeholder.svg?height=200&width=350"
                            alt="Modern Farming Series Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="font-medium text-green-700 mb-2">Modern Farming Techniques Series</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          A comprehensive 10-part video series covering the latest innovations and techniques in modern
                          farming. Learn about precision agriculture, smart irrigation, drone technology, and more.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            Precision Farming
                          </span>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            Smart Irrigation
                          </span>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            Drone Technology
                          </span>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Soil Management</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <span>10 Episodes</span> • <span>Total Duration: 3h 45m</span>
                          </div>
                          <Button className="bg-green-600 hover:bg-green-700">Watch Series</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-white rounded-lg p-6 border border-green-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-800">Video Categories</h2>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>All Languages</option>
                    <option>Hindi</option>
                    <option>English</option>
                    <option>Punjabi</option>
                    <option>Bengali</option>
                    <option>Telugu</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Crop Cultivation
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Pest Management
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Water Management
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Soil Health
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Organic Farming
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Farm Equipment
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Livestock Management
                  </Button>
                  <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Post-Harvest
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border-green-100">
                  <CardHeader>
                    <CardTitle className="text-green-700">Farmer Forums</CardTitle>
                    <CardDescription>Connect with other farmers and share experiences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-green-700">Wheat Farming Discussion</h3>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Discussion on optimal wheat varieties for different soil types and climate conditions.
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>32 participants</span>
                          <span>Last active: 2 hours ago</span>
                        </div>
                      </div>
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-green-700">Organic Pest Control Methods</h3>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Sharing effective organic methods to control common pests in vegetable crops.
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>47 participants</span>
                          <span>Last active: 30 minutes ago</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-green-700">Water Conservation Techniques</h3>
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">New</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Discussion on innovative water conservation methods for drought-prone regions.
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>18 participants</span>
                          <span>Started: Yesterday</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Join Discussion Forums</Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-green-100">
                  <CardHeader>
                    <CardTitle className="text-green-700">Upcoming Events</CardTitle>
                    <CardDescription>Workshops, webinars, and farmer meetups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-green-700">Sustainable Farming Webinar</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Online</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Learn about sustainable farming practices that improve soil health and reduce environmental
                          impact.
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>June 15, 2023 • 3:00 PM - 4:30 PM</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 border-green-600 text-green-600 hover:bg-green-50"
                        >
                          Register Now
                        </Button>
                      </div>
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-green-700">Farmer's Market Workshop</h3>
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">In-Person</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Hands-on workshop on how to effectively sell your produce at local farmer's markets.
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>June 22, 2023 • 10:00 AM - 2:00 PM</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 border-green-600 text-green-600 hover:bg-green-50"
                        >
                          Register Now
                        </Button>
                      </div>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-green-700">Annual Farmers' Conference</h3>
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">In-Person</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Join us for our annual conference featuring expert speakers, networking, and the latest in
                          agricultural innovation.
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>July 10-12, 2023 • All Day</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 border-green-600 text-green-600 hover:bg-green-50"
                        >
                          Register Now
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">View All Events</Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-green-100">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-green-700">Farmer Success Stories</CardTitle>
                  </div>
                  <CardDescription>Learn from the experiences of successful farmers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-bold">RS</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-green-700">Rajesh Singh</h3>
                          <p className="text-xs text-gray-500">Punjab, India</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        "Switching to precision farming techniques increased my wheat yield by 30% while reducing water
                        usage by 25%. The AI recommendations from FarmAI were crucial in making this transition."
                      </p>
                      <div className="text-xs text-gray-500">Crops: Wheat, Rice, Potatoes</div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-bold">AP</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-green-700">Anita Patel</h3>
                          <p className="text-xs text-gray-500">Gujarat, India</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        "The drone mapping service helped me identify areas of pest infestation before they became
                        visible to the naked eye. This early detection saved my cotton crop from significant damage."
                      </p>
                      <div className="text-xs text-gray-500">Crops: Cotton, Groundnuts</div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-bold">MK</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-green-700">Manoj Kumar</h3>
                          <p className="text-xs text-gray-500">Maharashtra, India</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        "The weather alerts from FarmAI helped me prepare for unexpected rainfall, allowing me to
                        protect my harvested crops. The seasonal forecasts also helped me plan my planting schedule."
                      </p>
                      <div className="text-xs text-gray-500">Crops: Sugarcane, Soybeans</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50">
                    Read More Success Stories
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expert" className="space-y-6">
              <TalkToExpert />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

