"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getGeminiResponse } from "@/app/actions/gemini-actions"
import { Send, Loader2, X, MessageSquare, MinusCircle } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

type Message = {
  role: "user" | "assistant"
  content: string
}

// Client-side fallback responses if server actions fail completely
const clientFallbackResponses = [
  "Based on traditional farming wisdom, rotating crops helps maintain soil fertility and reduces pest problems. For example, follow rice with legumes, then vegetables.",
  "For organic pest management, neem oil extract (5ml per liter of water) is effective against many common pests while being safe for beneficial insects.",
  "Water management is crucial - collect rainwater during monsoon season. For paddy, maintain 2-3cm water level. For wheat, give irrigation at crown root initiation stage.",
  "Traditional Indian companion planting techniques work well: grow marigolds with vegetables, plant onions near carrots, grow beans with corn.",
  "Mulching with locally available materials like straw or dried leaves can help conserve soil moisture and reduce weed growth.",
  "Indigenous seed varieties like desi cotton are well-adapted to local climate conditions and often more resistant to regional pests.",
  "For small-scale farming, vermicomposting provides excellent organic fertilizer. Mix cow dung, crop residue and kitchen waste in 3:1:1 ratio.",
  "Check soil pH before planting. Most crops prefer 6.0-7.0 pH. Add lime for acidic soils, sulfur for alkaline soils.",
  "For natural pest control, plant neem, tulsi, and lemongrass around field borders. These repel many harmful insects.",
  "Practice crop rotation: cereals (wheat/rice) → legumes (moong/urad) → vegetables (tomato/chilli) → back to cereals.",
  "For drought management, use drought-resistant varieties like bajra or jowar. Implement drip irrigation to save water.",
  "Integrated farming with livestock provides multiple income sources. Cow dung and urine are excellent organic fertilizers.",
  "Monitor weather forecasts regularly. Plan sowing and harvesting according to weather predictions.",
  "For organic certification, maintain detailed records of all inputs and practices. Avoid chemical fertilizers for 3 years.",
  "Use bio-fertilizers like Rhizobium for pulses, Azotobacter for cereals. They're cost-effective and eco-friendly."
];

// Add specific short responses for quick feedback
const quickResponses = {
  "fertilizer": "For organic farming: 1) Use vermicompost (3-4 tons/acre) 2) Apply neem cake (200kg/acre) 3) Use bio-fertilizers specific to crop 4) Add green manure crops like dhaincha 5) Maintain proper soil pH (6.0-7.0).",
  "pest": "Natural pest control methods: 1) Neem oil spray (5ml/L water) 2) Yellow sticky traps for flying pests 3) Pheromone traps (5-6/acre) 4) Beneficial insects like ladybugs 5) Crop rotation to break pest cycles.",
  "water": "Water management tips: 1) Use drip irrigation for 70% water savings 2) Mulch soil to reduce evaporation 3) Irrigate early morning/evening 4) Install soil moisture sensors 5) Harvest rainwater in farm ponds.",
  "crop": "Crop selection guide: 1) Match crop to soil type 2) Consider local climate 3) Check market demand 4) Use certified seeds 5) Plan rotation sequence 6) Include legumes for soil health.",
  "soil": "Soil health tips: 1) Regular testing (pH, NPK) 2) Add organic matter 3) Practice crop rotation 4) Use cover crops 5) Minimize tillage 6) Maintain proper drainage 7) Apply balanced nutrients.",
  "monsoon": "Monsoon preparation: 1) Clean drainage channels 2) Prepare raised beds 3) Select water-resistant varieties 4) Keep fungicides ready 5) Plan for excess water storage 6) Strengthen field bunds.",
  "organic": "Organic farming steps: 1) Build soil health with compost 2) Use crop rotation 3) Apply bio-fertilizers 4) Practice natural pest control 5) Maintain buffer zones 6) Keep detailed records.",
  "weather": "Weather adaptation: 1) Install rain gauge 2) Use weather-based irrigation 3) Plant wind-breaks 4) Choose climate-resilient varieties 5) Have contingency crop plan 6) Monitor forecasts.",
  "seeds": "Seed selection tips: 1) Use certified seeds 2) Check germination rate 3) Store properly 4) Consider local adaptability 5) Save indigenous varieties 6) Treatment before sowing.",
  "market": "Market strategies: 1) Check market rates daily 2) Form farmer groups 3) Use e-NAM platform 4) Plan crop timing 5) Maintain produce quality 6) Direct marketing when possible.",
  "disease": "Disease management: 1) Crop rotation 2) Resistant varieties 3) Proper spacing 4) Balanced nutrition 5) Timely intervention 6) Clean field practices.",
  "irrigation": "Irrigation best practices: 1) Check soil moisture 2) Time watering properly 3) Maintain equipment 4) Use water-efficient methods 5) Monitor crop water needs 6) Recycle water.",
  "storage": "Storage guidelines: 1) Clean and dry produce 2) Use proper bags/bins 3) Monitor moisture 4) Control pests 5) Regular inspection 6) Maintain ventilation.",
  "livestock": "Integrated farming: 1) Choose suitable breeds 2) Proper housing 3) Balanced feed 4) Regular health checks 5) Waste management 6) Marketing of products."
};

// Get a random response from the fallback list
const getRandomFallbackResponse = () => {
  const randomIndex = Math.floor(Math.random() * clientFallbackResponses.length);
  return clientFallbackResponses[randomIndex];
};

// Get a quick response based on keywords in the query
const getQuickResponse = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  for (const [keyword, response] of Object.entries(quickResponses)) {
    if (lowercaseQuery.includes(keyword)) {
      return response;
    }
  }
  return null;
};

export default function AapkaSathiChatbot() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "नमस्ते! मैं आपका साथी हूँ, आपका कृषि सहायक। मैं फसल प्रबंधन, मौसम, कीट नियंत्रण, और अन्य कृषि संबंधित प्रश्नों में आपकी सहायता कर सकता हूँ। आप मुझसे क्या पूछना चाहेंगे?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiFailCount, setApiFailCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Reset fail count when the chatbot is closed and reopened
  useEffect(() => {
    if (isOpen) {
      setApiFailCount(0)
    }
  }, [isOpen])

  // Cleanup abortController on unmount
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort()
      }
    }
  }, [abortController])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userInput = input.trim();
    
    // Add user message
    const userMessage = { role: "user" as const, content: userInput }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Abort previous request if it exists
    if (abortController) {
      abortController.abort()
    }

    // Create new abort controller for this request
    const newAbortController = new AbortController()
    setAbortController(newAbortController)

    // Check for a quick response based on keywords and immediately show it
    // while API call is happening in the background
    const quickResponse = getQuickResponse(userInput);
    let usedQuickResponse = false;

    if (quickResponse) {
      setTimeout(() => {
        // If we're still loading (API hasn't returned yet)
        if (isLoading) {
          setMessages((prev) => [...prev, { 
            role: "assistant", 
            content: quickResponse 
          }]);
          usedQuickResponse = true;
          setIsLoading(false);
          // Still continue with API call in background
        }
      }, 800); // Show quick response after a short delay for natural feeling
    }

    try {
      // Set a timeout to prevent waiting too long - increased to 8 seconds for Llama API
      const timeoutId = setTimeout(() => {
        if (abortController === newAbortController) {
          newAbortController.abort();
          throw new Error("Request timed out");
        }
      }, 8000);

      const response = await getGeminiResponse(userInput);
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);

      // If we've already shown a quick response, don't update the messages
      if (!usedQuickResponse) {
        if (response.success) {
          setMessages((prev) => [...prev, { role: "assistant", content: response.data || "" }])
          // Reset fail count on success
          setApiFailCount(0)
        } else {
          // Increment fail count and use fallback
          setApiFailCount(prev => prev + 1)
          throw new Error("API returned error")
        }
      }
    } catch (error) {
      console.error("Error getting response:", error)
      
      // If we didn't already use a quick response, use fallback
      if (!usedQuickResponse) {
        // Use client-side fallback
        const fallbackResponse = getRandomFallbackResponse()
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ])
      }

      // Increment fail count
      setApiFailCount(prev => prev + 1)
    } finally {
      setIsLoading(false)
      setAbortController(null)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-green-600 hover:bg-green-700 shadow-lg z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? "w-72" : "w-80 sm:w-96 md:w-[450px]"}`}
    >
      <Card className="border-green-200 shadow-xl">
        <CardHeader className="bg-green-600 text-white rounded-t-lg py-3 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">
              {isMinimized ? "आपका साथी" : "आपका साथी (Your Companion)"}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-green-700 rounded-full p-0"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <MinusCircle className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-green-700 rounded-full p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <CardDescription className="text-green-50 mt-1">
              Ask me anything about farming and agriculture
            </CardDescription>
          )}
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-4 max-h-[400px] overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-green-600 text-white"
                          : "bg-white border border-green-100 text-gray-700"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-white border border-green-100">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                        <p className="text-sm text-gray-500">Processing your question...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="p-3 border-t">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  placeholder="Type your farming question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

