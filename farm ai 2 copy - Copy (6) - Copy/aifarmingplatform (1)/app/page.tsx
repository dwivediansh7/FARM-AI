import Link from "next/link"
import { ArrowRight, Cloud, Droplet, MapPin, MessageSquare, PieChart, Tractor, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherWidget from "@/components/weather-widget"
import HeroSection from "@/components/hero-section"
import AIChatbot from "@/components/ai-chatbot"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection />

        <section className="container mx-auto py-12 px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Our AI-Powered Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <PieChart className="h-5 w-5" />
                  AI Crop Recommendation
                </CardTitle>
                <CardDescription>Get personalized crop suggestions based on your land details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our AI analyzes soil type, climate, and market trends to recommend the most profitable crops for your
                  land.
                </p>
                <Link href="/crop-recommendation">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Try Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <MapPin className="h-5 w-5" />
                  Drone-Based Land Mapping
                </CardTitle>
                <CardDescription>Advanced aerial analysis of your farmland</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our drones capture detailed imagery to analyze soil health, moisture levels, and crop conditions in
                  real-time.
                </p>
                <Link href="/drone-mapping">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Cloud className="h-5 w-5" />
                  Weather & Climate Alerts
                </CardTitle>
                <CardDescription>Stay ahead with predictive weather insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get accurate forecasts and timely alerts to plan your farming activities and protect your crops.
                </p>
                <Link href="/weather">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Check Weather <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-green-50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Weather & Climate Insights</h2>
            <WeatherWidget />
          </div>
        </section>

        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">Smart Farming Assistance</h2>
              <p className="text-gray-600 mb-6">
                Access our comprehensive knowledge hub with step-by-step guides on modern farming techniques, crop
                management, and sustainable practices.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Droplet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Water Management</h3>
                    <p className="text-gray-600">Optimize irrigation with AI-driven recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Community Support</h3>
                    <p className="text-gray-600">Connect with other farmers and agricultural experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">AI Chatbot</h3>
                    <p className="text-gray-600">Get real-time farming advice 24/7</p>
                  </div>
                </div>
              </div>
              <Button className="mt-6 bg-green-600 hover:bg-green-700">
                Explore Knowledge Hub <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Farmer using tablet for smart farming"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        <section className="bg-amber-50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Market & Storage Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-700">Real-time Crop Pricing</CardTitle>
                  <CardDescription>Make informed decisions with up-to-date market data</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Access current prices for your crops across different markets to maximize your profits.
                  </p>
                  <Link href="/market-prices">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      Check Prices <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-700">Storage Facilities</CardTitle>
                  <CardDescription>Find the nearest storage locations for your harvest</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Locate optimal storage facilities to preserve your crops and reduce post-harvest losses.
                  </p>
                  <Link href="/storage-locations">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      Find Storage <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-12 px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Government Schemes & Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-700">Subsidies & Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Stay updated on the latest government subsidies, loans, and policies designed to support farmers.
                </p>
                <Link href="/government-schemes">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    View Schemes
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-700">Educational Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn modern farming techniques through our library of educational videos in multiple languages.
                </p>
                <Link href="/educational-videos">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    Watch Videos
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-700">Training Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Enroll in hands-on training programs to enhance your farming skills and knowledge.
                </p>
                <Link href="/training-programs">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    Enroll Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tractor className="h-8 w-8" />
                <span className="text-xl font-bold">FarmAI</span>
              </div>
              <p className="text-green-100">
                Empowering farmers with AI-driven solutions for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-green-100 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-green-100 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-green-100 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-green-100 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-green-100 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-green-100 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-green-100 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-green-100 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <p className="text-green-100 mb-2">Email: support@farmai.com</p>
              <p className="text-green-100 mb-4">Phone: +1 (123) 456-7890</p>
              <div className="flex gap-4">
                <Link href="#" className="text-green-100 hover:text-white">
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-green-100 hover:text-white">
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-green-100 hover:text-white">
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
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-green-100 hover:text-white">
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
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>&copy; {new Date().getFullYear()} FarmAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  )
}

