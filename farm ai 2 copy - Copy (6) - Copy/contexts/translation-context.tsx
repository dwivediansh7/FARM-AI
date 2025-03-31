"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translateText, translateBatch } from "@/services/translation-service"
import { usePathname } from "next/navigation"

// Define available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
]

// Define translation keys type
type TranslationKey = keyof typeof baseTranslations

// Base translations in English
const baseTranslations = {
  // Navigation
  home: "Home",
  "crop-recommendation": "Crop Recommendation",
  "drone-mapping": "Drone Mapping",
  weather: "Weather",
  resources: "Resources",
  market: "Market",
  contact: "Contact",
  login: "Login",
  register: "Register",

  // Hero section
  "hero-title": "AI-Powered Farming Solutions",
  "hero-subtitle":
    "Maximize your profits and minimize losses with our cutting-edge AI technology designed specifically for farmers.",
  "join-now": "Join Now",
  "learn-more": "Learn More",
  "farmers-joined": "Farmers Joined",
  "yield-increase": "Yield Increase",
  "cost-reduction": "Cost Reduction",
  "ai-models": "AI Models",

  // Main sections
  "our-solutions": "Our AI-Powered Solutions",
  "weather-insights": "Weather & Climate Insights",
  "smart-farming": "Smart Farming Assistance",
  "market-insights": "Market & Storage Insights",
  "government-schemes": "Government Schemes & Education",

  // Crop recommendation
  "crop-recommendation-title": "AI Crop Recommendation",
  "crop-recommendation-subtitle":
    "Our advanced AI analyzes your land details, local climate data, and market trends to recommend the most profitable crops for your farm.",
  "data-driven": "Data-Driven",
  "market-aware": "Market-Aware",
  personalized: "Personalized",
  "enter-land-details": "Enter Your Land Details",
  "provide-information": "Provide information about your land to get personalized crop recommendations",

  // Weather
  "weather-title": "Weather & Climate Alerts",
  "weather-subtitle":
    "Stay ahead with accurate weather forecasts and predictive insights to plan your farming activities effectively.",
  "search-location": "Search location...",
  forecast: "5-Day Forecast",
  "weather-details": "Weather Details",
  humidity: "Humidity",
  precipitation: "Precipitation",
  "wind-speed": "Wind Speed",
  "farming-recommendations": "Farming Recommendations",

  // Resources
  "resources-title": "Smart Farming Resources",
  "resources-subtitle":
    "Access our comprehensive knowledge hub with guides, videos, and AI-powered assistance for modern farming techniques.",
  "farming-guides": "Farming Guides",
  "educational-videos": "Educational Videos",
  "ai-assistant": "AI Farming Assistant",
  "farming-community": "Farming Community",
  "discussion-forums": "Discussion Forums",
  "expert-connect": "Expert Connect",
  "success-stories": "Success Stories",

  // Market
  "market-title": "Market & Storage Insights",
  "market-subtitle":
    "Access real-time crop pricing and find optimal storage facilities to maximize your profits and reduce post-harvest losses.",
  "crop-prices": "Crop Prices",
  "storage-facilities": "Storage Facilities",
  "price-predictions": "Price Predictions",
  "market-insights": "Market Insights",

  // Drone mapping
  "drone-mapping-title": "Drone-Based Land Mapping",
  "drone-mapping-subtitle":
    "Our advanced drone technology provides detailed aerial analysis of your farmland, helping you make data-driven decisions.",
  "how-it-works": "How It Works",
  "drone-survey": "Drone Survey",
  "data-processing": "Data Processing",
  "analysis-reporting": "Analysis & Reporting",

  // Login/Register
  "login-title": "Login to FarmAI",
  "login-subtitle": "Enter your credentials to access your account",
  email: "Email",
  password: "Password",
  "forgot-password": "Forgot password?",
  "dont-have-account": "Don't have an account?",
  "register-now": "Register now",
  "register-title": "Create an Account",
  "register-subtitle": "Join thousands of farmers using our AI-powered platform",
  "full-name": "Full Name",
  "confirm-password": "Confirm Password",
  "phone-number": "Phone Number",
  "already-have-account": "Already have an account?",
  "login-instead": "Login instead",
  cancel: "Cancel",

  // Footer
  "footer-description": "Empowering farmers with AI-driven solutions for sustainable and profitable agriculture.",
  "quick-links": "Quick Links",
  "about-us": "About Us",
  services: "Services",
  support: "Support",
  "help-center": "Help Center",
  faqs: "FAQs",
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  "contact-us": "Contact Us",
  "all-rights-reserved": "All rights reserved.",
} as const

type TranslationContextType = {
  language: string
  setLanguage: (code: string) => void
  t: (key: TranslationKey) => string
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  isLoading: false,
})

export const useTranslation = () => useContext(TranslationContext)

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("en")
  const [translations, setTranslations] = useState<Record<TranslationKey, string>>(baseTranslations)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
    // Add a data attribute to the html element for CSS selectors
    document.documentElement.setAttribute("data-language", language)
  }, [language])

  // Update translations when language changes or route changes
  useEffect(() => {
    const updateTranslations = async () => {
      if (language === "en") {
        setTranslations(baseTranslations)
        return
      }

      setIsLoading(true)
      try {
        const texts = Object.values(baseTranslations)
        const translatedTexts = await translateBatch(texts, language)
        
        const newTranslations: Record<TranslationKey, string> = {} as Record<TranslationKey, string>
        Object.keys(baseTranslations).forEach((key, index) => {
          newTranslations[key as TranslationKey] = translatedTexts[index]
        })
        
        setTranslations(newTranslations)
      } catch (error) {
        console.error("Error updating translations:", error)
        setTranslations(baseTranslations)
      } finally {
        setIsLoading(false)
      }
    }

    // Add a small delay to ensure the page is fully loaded
    const timeoutId = setTimeout(updateTranslations, 100)
    return () => clearTimeout(timeoutId)
  }, [language, pathname]) // Add pathname as a dependency

  const t = (key: TranslationKey): string => {
    return translations[key] || baseTranslations[key] || key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  )
}

