"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import { useTranslation } from "@/contexts/translation-context"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResourcesPage() {
  const { t } = useTranslation()
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setCharHistory] = useState([
    {
      role: "ai",
      content: "Hello! I'm your AI farming assistant. How can I help you today?",
    },
    {
      role: "user",
      content: "My tomato plants have yellow leaves. What could be the issue?",
    },
    {
      role: "ai",
      content:
        "Yellow leaves on tomato plants could indicate several issues: nutrient deficiency (especially nitrogen), overwatering, or early blight. Could you share a photo of the leaves?",
    },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    // Add user message to chat
    setCharHistory([...chatHistory, { role: "user", content: chatMessage }])

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your description, it sounds like your crops might be experiencing nutrient deficiency. I recommend testing your soil pH and adding appropriate fertilizers.",
        "This could be related to the recent weather patterns in your region. Consider adjusting your irrigation schedule to compensate for the increased humidity.",
        "From what you've described, this appears to be a common issue with that crop variety. Many farmers in your area have reported success with crop rotation and organic pest management.",
        "I'd recommend checking for signs of pest infestation. Look for small holes in the leaves or stems, and consider applying an organic pesticide if needed.",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      setCharHistory((prev) => [...prev, { role: "ai", content: randomResponse }])
    }, 1000)

    setChatMessage("")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden mb-10">
            <div className="absolute inset-0">
              <img
                src="/images/farming/smart-farming.jpg"
                alt="Modern Farming"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative z-10 text-center py-16 px-4">
              <h1 className="text-4xl font-bold text-white mb-4">{t("resources-title")}</h1>
              <p className="text-gray-100 max-w-2xl mx-auto">{t("resources-subtitle")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">{t("farming-guides")}</CardTitle>
                <CardDescription>Step-by-step instructions for various farming techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="border-b border-gray-100 pb-4">
                    <Link href="#" className="flex items-center gap-4 text-green-600 hover:text-green-700">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src="/images/farming/soil-analysis.jpg" 
                          alt="Soil Analysis" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Sustainable Farming Practices</h4>
                        <p className="text-sm text-gray-600">Learn about eco-friendly farming methods</p>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-gray-100 pb-4">
                    <Link href="#" className="flex items-center gap-4 text-green-600 hover:text-green-700">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src="/images/farming/water-management.jpg" 
                          alt="Water Management" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Water Conservation Techniques</h4>
                        <p className="text-sm text-gray-600">Efficient irrigation and water management</p>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-gray-100 pb-4">
                    <Link href="#" className="flex items-center gap-4 text-green-600 hover:text-green-700">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src="/images/farming/crop-health.jpg" 
                          alt="Crop Health" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Organic Pest Management</h4>
                        <p className="text-sm text-gray-600">Natural pest control solutions</p>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-gray-100 pb-4">
                    <Link href="#" className="flex items-center gap-4 text-green-600 hover:text-green-700">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src="/images/farming/smart-farming.jpg" 
                          alt="Smart Farming" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Smart Farming Technologies</h4>
                        <p className="text-sm text-gray-600">Modern agricultural techniques</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center gap-4 text-green-600 hover:text-green-700">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src="/images/farming/drone-mapping.jpg" 
                          alt="Drone Mapping" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Precision Agriculture</h4>
                        <p className="text-sm text-gray-600">Data-driven farming decisions</p>
                      </div>
                    </Link>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 border-green-600 text-green-600 hover:bg-green-50">
                  View All Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">{t("educational-videos")}</CardTitle>
                <CardDescription>Visual learning resources in multiple languages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <a
                      href="https://www.youtube.com/watch?v=ykCXfjzfaco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative bg-gray-100 h-32 rounded-md flex items-center justify-center mb-2 overflow-hidden group">
                        <img
                          src="https://img.youtube.com/vi/ykCXfjzfaco/mqdefault.jpg"
                          alt="Modern Irrigation Systems"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="text-white h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="font-medium">Modern Irrigation Systems</h3>
                      <p className="text-sm text-gray-500">Available in 5 languages</p>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.youtube.com/watch?v=UGBZnMtO5kA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative bg-gray-100 h-32 rounded-md flex items-center justify-center mb-2 overflow-hidden group">
                        <img
                          src="https://img.youtube.com/vi/UGBZnMtO5kA/mqdefault.jpg"
                          alt="Fertilizer Application Techniques"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="text-white h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="font-medium">Fertilizer Application Techniques</h3>
                      <p className="text-sm text-gray-500">Available in 8 languages</p>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.youtube.com/watch?v=VH3t-2a9Ow4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative bg-gray-100 h-32 rounded-md flex items-center justify-center mb-2 overflow-hidden group">
                        <img
                          src="https://img.youtube.com/vi/VH3t-2a9Ow4/mqdefault.jpg"
                          alt="Organic Farming Practices"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="text-white h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="font-medium">Organic Farming Practices</h3>
                      <p className="text-sm text-gray-500">Available in 6 languages</p>
                    </a>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50">
                  Browse Video Library
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">{t("ai-assistant")}</CardTitle>
                <CardDescription>Get real-time advice from our AI chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-md p-4 mb-4 h-48 overflow-y-auto">
                  {chatHistory.map((message, index) =>
                    message.role === "ai" ? (
                      <div key={index} className="flex gap-2 mb-3">
                        <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                          AI
                        </div>
                        <div className="bg-green-50 p-2 rounded-md text-sm">{message.content}</div>
                      </div>
                    ) : (
                      <div key={index} className="flex gap-2 mb-3 justify-end">
                        <div className="bg-blue-50 p-2 rounded-md text-sm">{message.content}</div>
                        <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-700 flex-shrink-0">
                          You
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Ask a farming question..."
                    className="flex-1"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Educational Resources</h2>
            <div className="bg-white rounded-lg border border-green-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4">Crop Management Techniques</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Soil Preparation</h4>
                    <p className="text-gray-600 mb-4">
                      Proper soil preparation is crucial for successful crop growth. It involves testing soil pH, adding
                      organic matter, and ensuring proper drainage. The ideal soil pH for most crops is between 6.0 and
                      7.0, though some crops prefer more acidic or alkaline conditions.
                    </p>
                    <p className="text-gray-600 mb-4">Steps for soil preparation:</p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                      <li>Test your soil to determine pH and nutrient levels</li>
                      <li>Remove weeds, rocks, and debris from the planting area</li>
                      <li>Add organic matter such as compost or well-rotted manure</li>
                      <li>Till the soil to a depth of 8-12 inches to break up compaction</li>
                      <li>Level the soil surface and create proper drainage channels if needed</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Irrigation Management</h4>
                    <p className="text-gray-600 mb-4">
                      Efficient irrigation is essential for maximizing crop yield while conserving water. Different
                      crops have different water requirements, and these needs change throughout the growing season.
                    </p>
                    <p className="text-gray-600 mb-4">Common irrigation methods include:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>
                        <strong>Drip Irrigation:</strong> Delivers water directly to the plant's root zone, minimizing
                        evaporation and runoff. Ideal for row crops and orchards.
                      </li>
                      <li>
                        <strong>Sprinkler Irrigation:</strong> Simulates rainfall by spraying water over the crops. Good
                        for larger areas but less water-efficient than drip systems.
                      </li>
                      <li>
                        <strong>Flood Irrigation:</strong> Involves flooding the field with water. Traditional but less
                        efficient method still used for certain crops like rice.
                      </li>
                      <li>
                        <strong>Subsurface Irrigation:</strong> Delivers water directly to the root zone through buried
                        drip lines or pipes. Highly efficient but more complex to install.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Pest and Disease Management</h4>
                    <p className="text-gray-600 mb-4">
                      Integrated Pest Management (IPM) is a sustainable approach that combines different management
                      strategies and practices to grow healthy crops while minimizing the use of pesticides.
                    </p>
                    <p className="text-gray-600 mb-4">Key components of IPM include:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>
                        <strong>Prevention:</strong> Using resistant varieties, crop rotation, and sanitation practices
                      </li>
                      <li>
                        <strong>Monitoring:</strong> Regular scouting for pests and diseases to detect problems early
                      </li>
                      <li>
                        <strong>Biological Control:</strong> Using beneficial insects, microbes, or other organisms to
                        control pests
                      </li>
                      <li>
                        <strong>Cultural Control:</strong> Modifying the growing environment to reduce pest
                        establishment and reproduction
                      </li>
                      <li>
                        <strong>Chemical Control:</strong> Using pesticides selectively and only when necessary
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Language Resources Sections */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Regional Language Resources
            </h2>
            
            <Tabs defaultValue="hindi" className="w-full">
              <TabsList className="flex flex-wrap gap-2 mb-6">
                <TabsTrigger value="hindi">हिंदी</TabsTrigger>
                <TabsTrigger value="bengali">বাংলা</TabsTrigger>
                <TabsTrigger value="telugu">తెలుగు</TabsTrigger>
                <TabsTrigger value="marathi">मराठी</TabsTrigger>
                <TabsTrigger value="tamil">தமிழ்</TabsTrigger>
                <TabsTrigger value="gujarati">ગુજરાતી</TabsTrigger>
                <TabsTrigger value="odia">ଓଡ଼ିଆ</TabsTrigger>
                <TabsTrigger value="punjabi">ਪੰਜਾਬੀ</TabsTrigger>
                <TabsTrigger value="kannada">ಕನ್ನಡ</TabsTrigger>
                <TabsTrigger value="malayalam">മലയാളം</TabsTrigger>
              </TabsList>

              {/* Hindi Section */}
              <TabsContent value="hindi" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    हिंदी में कृषि संसाधन (Agricultural Resources in Hindi)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Kisan Helpline */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@KisaanHelpline/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">किसान हेल्पलाइन (Kisan Helpline)</h3>
                        <p className="text-sm text-gray-600">
                          किसानों के लिए दैनिक खेती की जानकारी और समाधान
                          (Daily farming tips and solutions for farmers)
                        </p>
                      </a>
                    </div>

                    {/* DD Kisan */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@DDKisan/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">डीडी किसान (DD Kisan)</h3>
                        <p className="text-sm text-gray-600">
                          सरकारी कृषि चैनल - नवीनतम कृषि समाचार और तकनीकें
                          (Government agriculture channel - Latest farming news and techniques)
                        </p>
                      </a>
                    </div>

                    {/* Advance Agri Solutions */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@advanceagrisolutions5821"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">एडवांस एग्री सॉल्यूशंस (Advance Agri Solutions)</h3>
                        <p className="text-sm text-gray-600">
                          आधुनिक खेती की तकनीकें और नवीन कृषि समाधान
                          (Modern farming techniques and innovative agricultural solutions)
                        </p>
                      </a>
                    </div>

                    {/* Farming Leader */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@farmingleaderOfficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">फार्मिंग लीडर (Farming Leader)</h3>
                        <p className="text-sm text-gray-600">
                          सफल किसानों की कहानियां और प्रेरणादायक कृषि विषय
                          (Success stories of farmers and inspirational agricultural content)
                        </p>
                      </a>
                    </div>

                    {/* Krishi Jagran */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@kjkrishijagran"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">कृषि जागरण (Krishi Jagran)</h3>
                        <p className="text-sm text-gray-600">
                          कृषि समाचार, मौसम जानकारी और फसल सुरक्षा टिप्स
                          (Agricultural news, weather updates, and crop protection tips)
                        </p>
                      </a>
                    </div>

                    {/* Featured Video */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/watch?v=ztu8HAXc9wo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <img
                            src="https://img.youtube.com/vi/ztu8HAXc9wo/hqdefault.jpg"
                            alt="Featured Farming Video"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">आधुनिक खेती की तकनीकें (Modern Farming Techniques)</h3>
                        <p className="text-sm text-gray-600">
                          विशेष वीडियो: उन्नत कृषि पद्धतियों का विस्तृत विश्लेषण
                          (Special video: Detailed analysis of advanced farming methods)
                        </p>
                      </a>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-gray-600 text-sm">
                      नोट: सभी वीडियो हिंदी भाषा में उपलब्ध हैं और नियमित रूप से अपडेट किए जाते हैं।
                      (Note: All videos are available in Hindi and are regularly updated.)
                    </p>
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      और देखें (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Bengali Section */}
              <TabsContent value="bengali" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    কৃষি সম্পদ বাংলায় (Agricultural Resources in Bengali)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Agriculture Diary */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@agriculturediary"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">কৃষি ডায়েরি (Agriculture Diary)</h3>
                        <p className="text-sm text-gray-600">
                          দৈনিক কৃষি টিপস এবং পরামর্শ
                          (Daily farming tips and advice)
                        </p>
                      </a>
                    </div>

                    {/* Krishi Barta */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@krishibarta9167/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">কৃষি বার্তা (Krishi Barta)</h3>
                        <p className="text-sm text-gray-600">
                          আধুনিক কৃষি প্রযুক্তি এবং বাজার তথ্য
                          (Modern farming technology and market information)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      আরও দেখুন (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Telugu Section */}
              <TabsContent value="telugu" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    తెలుగులో వ్యవసాయ వనరులు (Agricultural Resources in Telugu)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Telugu Farmer Gopi */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@telugufarmergopi/shorts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">తెలుగు ఫార్మర్ గోపి (Telugu Farmer Gopi)</h3>
                        <p className="text-sm text-gray-600">
                          రైతు అనుభవాలు మరియు వ్యవసాయ చిట్కాలు
                          (Farmer experiences and agricultural tips)
                        </p>
                      </a>
                    </div>

                    {/* Agri Telugu */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@agritelugu1655/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">అగ్రి తెలుగు (Agri Telugu)</h3>
                        <p className="text-sm text-gray-600">
                          ఆధునిక వ్యవసాయ పద్ధతులు మరియు సాంకేతిక పరిజ్ఞానం
                          (Modern farming methods and technical knowledge)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      మరిన్ని చూడండి (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Continue with other language sections similarly... */}
              
              {/* Marathi Section */}
              <TabsContent value="marathi" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    मराठीतील कृषी संसाधने (Agricultural Resources in Marathi)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Krushi Mahiti */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@KrushiMahiti-RameshRathod/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">कृषी माहिती (Krushi Mahiti)</h3>
                        <p className="text-sm text-gray-600">
                          शेतीविषयक माहिती आणि मार्गदर्शन
                          (Agricultural information and guidance)
                        </p>
                      </a>
                    </div>

                    {/* Agrowon Digital */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@AgrowonDigital/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">अॅग्रोवन डिजिटल (Agrowon Digital)</h3>
                        <p className="text-sm text-gray-600">
                          आधुनिक शेती तंत्रज्ञान आणि बाजारपेठ माहिती
                          (Modern farming technology and market information)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      अधिक पहा (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Tamil Section */}
              <TabsContent value="tamil" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    தமிழில் விவசாய வளங்கள் (Agricultural Resources in Tamil)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Naveen Auzhavan */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@naveenauzhavan/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">நவீன உழவன் (Naveen Auzhavan)</h3>
                        <p className="text-sm text-gray-600">
                          நவீன விவசாய தொழில்நுட்பங்கள்
                          (Modern farming technologies)
                        </p>
                      </a>
                    </div>

                    {/* Tamil Agriculture */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@tamilagriculture4991/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">தமிழ் விவசாயம் (Tamil Agriculture)</h3>
                        <p className="text-sm text-gray-600">
                          விவசாய அறிவியல் மற்றும் பயிற்சி
                          (Agricultural science and training)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      மேலும் காண (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Gujarati Section */}
              <TabsContent value="gujarati" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    ગુજરાતીમાં કૃષિ સંસાધનો (Agricultural Resources in Gujarati)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Agri Science TV */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@AGRISCIENCETV/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">એગ્રી સાયન્સ ટીવી (Agri Science TV)</h3>
                        <p className="text-sm text-gray-600">
                          વૈજ્ઞાનિક ખેતી પદ્ધતિઓ અને સંશોધન
                          (Scientific farming methods and research)
                        </p>
                      </a>
                    </div>

                    {/* Vegad Farming */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@vegadfarminggujarati/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">વેગડ ફાર્મિંગ (Vegad Farming)</h3>
                        <p className="text-sm text-gray-600">
                          આધુનિક ખેતી અને પશુપાલન માર્ગદર્શન
                          (Modern farming and animal husbandry guidance)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      વધુ જુઓ (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Odia Section */}
              <TabsContent value="odia" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    ଓଡ଼ିଆରେ କୃଷି ସମ୍ବଳ (Agricultural Resources in Odia)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Efarming Odisha */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@EfarmingOdisha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">ଇ-ଫାର୍ମିଂ ଓଡ଼ିଶା (E-farming Odisha)</h3>
                        <p className="text-sm text-gray-600">
                          ଆଧୁନିକ କୃଷି ପ୍ରଯୁକ୍ତି ଏବଂ ଜ୍ଞାନ
                          (Modern farming technology and knowledge)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      ଅଧିକ ଦେଖନ୍ତୁ (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Punjabi Section */}
              <TabsContent value="punjabi" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    ਪੰਜਾਬੀ ਵਿੱਚ ਖੇਤੀਬਾੜੀ ਸਰੋਤ (Agricultural Resources in Punjabi)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Agriculture Information Punjabi */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@AgricultureInformationPunjabi/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">ਖੇਤੀਬਾੜੀ ਜਾਣਕਾਰੀ (Agriculture Information)</h3>
                        <p className="text-sm text-gray-600">
                          ਖੇਤੀਬਾੜੀ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ ਨਵੀਨਤਮ ਤਕਨੀਕਾਂ
                          (Agricultural information and latest techniques)
                        </p>
                      </a>
                    </div>

                    {/* Punjab Agricultural University */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@punjab_agricultural_university/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">ਪੰਜਾਬ ਐਗਰੀਕਲਚਰ ਯੂਨੀਵਰਸਿਟੀ (PAU)</h3>
                        <p className="text-sm text-gray-600">
                          ਖੋਜ ਅਧਾਰਿਤ ਖੇਤੀਬਾੜੀ ਸਿੱਖਿਆ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ
                          (Research-based agricultural education and guidance)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      ਹੋਰ ਦੇਖੋ (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Kannada Section */}
              <TabsContent value="kannada" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    ಕನ್ನಡದಲ್ಲಿ ಕೃಷಿ ಸಂಪನ್ಮೂಲಗಳು (Agricultural Resources in Kannada)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Kannada Farmer */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@kannadaFarmer/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">ಕನ್ನಡ ಫಾರ್ಮರ್ (Kannada Farmer)</h3>
                        <p className="text-sm text-gray-600">
                          ರೈತರಿಗಾಗಿ ಕೃಷಿ ಮಾಹಿತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ
                          (Agricultural information and guidance for farmers)
                        </p>
                      </a>
                    </div>

                    {/* Bosswallah Farming */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@bosswallahfarmingkannada/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">ಬಾಸ್ವಾಲ ಫಾರ್ಮಿಂಗ್ (Bosswallah Farming)</h3>
                        <p className="text-sm text-gray-600">
                          ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಗಳು ಮತ್ತು ಯಶೋಗಾಥೆಗಳು
                          (Modern farming techniques and success stories)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      ಇನ್ನಷ್ಟು ನೋಡಿ (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Malayalam Section */}
              <TabsContent value="malayalam" className="mt-4">
                <div className="bg-white rounded-lg border border-green-100 overflow-hidden p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    മലയാളത്തിലെ കാർഷിക വിഭവങ്ങൾ (Agricultural Resources in Malayalam)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Agri TV India */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@AgriTVindia/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">അഗ്രി ടിവി (Agri TV)</h3>
                        <p className="text-sm text-gray-600">
                          കാർഷിക വിദ്യാഭ്യാസവും സാങ്കേതിക വിദ്യയും
                          (Agricultural education and technology)
                        </p>
                      </a>
                    </div>

                    {/* Variety Farmer */}
                    <div className="space-y-4">
                      <a
                        href="https://www.youtube.com/@VarietyFarmer/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative bg-gray-100 h-40 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-white h-10 w-10" />
                          </div>
                        </div>
                        <h3 className="font-medium mt-2 text-green-800">വെറൈറ്റി ഫാർമർ (Variety Farmer)</h3>
                        <p className="text-sm text-gray-600">
                          വൈവിധ്യമാർന്ന കൃഷി രീതികളും അനുഭവങ്ങളും
                          (Diverse farming methods and experiences)
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" className="mt-4 border-green-600 text-green-600 hover:bg-green-50">
                      കൂടുതൽ കാണുക (View More)
                    </Button>
                  </div>
                </div>
              </TabsContent>

            </Tabs>
          </div>

          <div className="bg-green-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">{t("farming-community")}</h2>
            <p className="text-gray-600 text-center mb-8">
              Connect with other farmers and agricultural experts to share knowledge and experiences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img
                    src="/images/farming/soil-analysis.svg"
                    alt="Discussion Forums"
                    className="w-full h-full"
                  />
                </div>
                <h3 className="font-medium text-green-700 mb-2 text-center">{t("discussion-forums")}</h3>
                <p className="text-gray-600 mb-4 text-center">Join topic-based discussions with farmers from around the country.</p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Browse Forums
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img
                    src="/images/farming/smart-farming.svg"
                    alt="Expert Connect"
                    className="w-full h-full"
                  />
                </div>
                <h3 className="font-medium text-green-700 mb-2 text-center">{t("expert-connect")}</h3>
                <p className="text-gray-600 mb-4 text-center">Schedule one-on-one consultations with agricultural experts.</p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Find an Expert
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img
                    src="/images/farming/crop-health.svg"
                    alt="Success Stories"
                    className="w-full h-full"
                  />
                </div>
                <h3 className="font-medium text-green-700 mb-2 text-center">{t("success-stories")}</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Read about how other farmers have improved their yields and profits.
                </p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Read Stories
                </Button>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden mb-12">
            <div className="absolute inset-0">
              <img
                src="/images/farming/drone-mapping.jpg"
                alt="Expert Consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>
            <div className="relative z-10 text-center py-12 px-4">
              <h2 className="text-2xl font-bold text-white mb-4">Need Personalized Assistance?</h2>
              <p className="text-gray-200 max-w-2xl mx-auto mb-6">
                Our team of agricultural experts is available to provide personalized guidance for your specific farming
                needs.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">Request Expert Consultation</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

