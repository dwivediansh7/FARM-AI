"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MessageSquare, Phone, Video, User, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const experts = [
  {
    id: 1,
    name: "Dr. Amit Sharma",
    specialty: "Crop Science",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviews: 124,
    available: true,
    languages: ["English", "Hindi", "Punjabi"],
    experience: "15+ years",
    bio: "Dr. Sharma is a renowned crop scientist specializing in sustainable farming practices and crop disease management. He has helped thousands of farmers improve their yields through scientific approaches.",
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    specialty: "Soil Science",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 98,
    available: true,
    languages: ["English", "Hindi", "Gujarati"],
    experience: "12+ years",
    bio: "Dr. Patel is an expert in soil health and fertility management. Her research focuses on organic farming methods and sustainable soil practices for different agro-climatic zones.",
  },
  {
    id: 3,
    name: "Dr. Rajiv Kumar",
    specialty: "Agricultural Economics",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviews: 87,
    available: false,
    languages: ["English", "Hindi", "Bengali"],
    experience: "10+ years",
    bio: "Dr. Kumar specializes in agricultural economics and market trends. He helps farmers make informed decisions about crop selection, pricing strategies, and market access.",
  },
]

export default function TalkToExpert() {
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null)
  const [consultationType, setConsultationType] = useState("chat")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const { translate } = useLanguage()

  const handleExpertSelect = (id: number) => {
    setSelectedExpert(id)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsBooked(true)
    setIsSubmitting(false)
  }

  if (isBooked) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6 pb-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">{translate("Consultation Booked Successfully!")}</h3>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            {translate(
              "Your consultation has been scheduled. You will receive a confirmation email with all the details and instructions to join the session.",
            )}
          </p>
          <div className="bg-white p-4 rounded-lg border border-green-200 max-w-sm mx-auto mb-6">
            <div className="flex items-start gap-4">
              <div>
                <div className="font-medium text-green-700 mb-1">{translate("Consultation Details")}</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    <span>{experts.find((e) => e.id === selectedExpert)?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {consultationType === "chat" && <MessageSquare className="h-4 w-4 text-green-600" />}
                    {consultationType === "video" && <Video className="h-4 w-4 text-green-600" />}
                    {consultationType === "phone" && <Phone className="h-4 w-4 text-green-600" />}
                    <span>
                      {translate(
                        consultationType.charAt(0).toUpperCase() + consultationType.slice(1) + " Consultation",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsBooked(false)} className="bg-green-600 hover:bg-green-700">
            {translate("Book Another Consultation")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <Card
            key={expert.id}
            className={`bg-white border-green-100 hover:border-green-300 transition-colors cursor-pointer ${
              selectedExpert === expert.id ? "border-green-500 ring-1 ring-green-500" : ""
            }`}
            onClick={() => handleExpertSelect(expert.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-green-100">
                  <img
                    src={expert.image || "/placeholder.svg"}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-green-700 mb-1">{expert.name}</h3>
                  <p className="text-gray-600 text-sm">{translate(expert.specialty)}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill={i < Math.floor(expert.rating) ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-amber-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">{expert.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({expert.reviews} {translate("reviews")})
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${expert.available ? "bg-green-500" : "bg-gray-400"} mr-1`}
                    ></span>
                    <span className="text-xs text-gray-600">
                      {expert.available ? translate("Available Today") : translate("Available Tomorrow")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-1">{translate("Languages")}:</div>
                <div className="flex flex-wrap gap-1">
                  {expert.languages.map((lang, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {translate(lang)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p>{expert.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedExpert && (
        <Card className="bg-white border-green-100">
          <CardHeader>
            <CardTitle className="text-green-700">{translate("Book a Consultation")}</CardTitle>
            <CardDescription>
              {translate("Schedule a session with")} {experts.find((e) => e.id === selectedExpert)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>{translate("Consultation Type")}</Label>
                <Tabs
                  defaultValue="chat"
                  value={consultationType}
                  onValueChange={setConsultationType}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {translate("Chat")}
                    </TabsTrigger>
                    <TabsTrigger value="video">
                      <Video className="h-4 w-4 mr-2" />
                      {translate("Video Call")}
                    </TabsTrigger>
                    <TabsTrigger value="phone">
                      <Phone className="h-4 w-4 mr-2" />
                      {translate("Phone Call")}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">{translate("Date")}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{translate("Time")}</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder={translate("Select a time slot")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                      <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                      <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                      <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="query">{translate("Describe your query or issue")}</Label>
                <Textarea
                  id="query"
                  placeholder={translate("Please provide details about your farming issue or questions...")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-green-700">{translate("Consultation Fee")}</h3>
                  <span className="font-bold text-green-700">₹500</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {translate("30-minute consultation with")} {experts.find((e) => e.id === selectedExpert)?.name}
                </p>
                <div className="text-xs text-gray-500">
                  {translate("Payment will be processed after booking confirmation")}
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {translate("Processing...")}
                  </>
                ) : (
                  translate("Book Consultation")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!selectedExpert && (
        <Card className="bg-white border-green-100">
          <CardHeader>
            <CardTitle className="text-green-700">{translate("Ask a Quick Question")}</CardTitle>
            <CardDescription>{translate("Get a quick response from our agricultural experts")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">{translate("Topic")}</Label>
                <Select>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder={translate("Select a topic")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crop">{translate("Crop Management")}</SelectItem>
                    <SelectItem value="pest">{translate("Pest & Disease Control")}</SelectItem>
                    <SelectItem value="soil">{translate("Soil Health")}</SelectItem>
                    <SelectItem value="water">{translate("Water Management")}</SelectItem>
                    <SelectItem value="market">{translate("Market & Pricing")}</SelectItem>
                    <SelectItem value="equipment">{translate("Farm Equipment")}</SelectItem>
                    <SelectItem value="other">{translate("Other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quick-query">{translate("Your Question")}</Label>
                <Textarea id="quick-query" placeholder={translate("Type your farming question here...")} rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photos">{translate("Add Photos (Optional)")}</Label>
                <Input id="photos" type="file" multiple accept="image/*" />
                <p className="text-xs text-gray-500">
                  {translate("Upload photos of your crops, soil, or issue for better assistance")}
                </p>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">{translate("Submit Question")}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="bg-white rounded-lg p-6 border border-green-100">
        <h2 className="text-xl font-bold text-green-800 mb-4">{translate("Frequently Asked Questions")}</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-green-700 mb-2">{translate("How does the expert consultation work?")}</h3>
            <p className="text-gray-600">
              {translate(
                "Select an expert, choose your preferred consultation method (chat, video, or phone call), select a date and time, and describe your issue. After booking, you'll receive confirmation with instructions to join the session.",
              )}
            </p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-green-700 mb-2">
              {translate("What if I need to reschedule my consultation?")}
            </h3>
            <p className="text-gray-600">
              {translate(
                "You can reschedule your consultation up to 4 hours before the scheduled time. Simply go to your bookings in your account dashboard and select the reschedule option.",
              )}
            </p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-green-700 mb-2">{translate("How long are the consultation sessions?")}</h3>
            <p className="text-gray-600">
              {translate(
                "Standard consultation sessions are 30 minutes long. If you need more time, you can book extended sessions or follow-up consultations at a discounted rate.",
              )}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-green-700 mb-2">{translate("Can I get a refund if I'm not satisfied?")}</h3>
            <p className="text-gray-600">
              {translate(
                "Yes, we offer a satisfaction guarantee. If you're not satisfied with your consultation, you can request a refund within 24 hours of the session.",
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

