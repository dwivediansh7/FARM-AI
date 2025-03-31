"use client"

import { createContext, useContext, useState, type ReactNode, useRef, useEffect } from "react"

type Language = {
  code: string
  name: string
}

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  translate: (text: string) => string
  isTranslating: boolean
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Hindi translations for common weather terms
const hindiTranslations: Record<string, string> = {
  // Navigation
  Home: "होम",
  "Crop Recommendation": "फसल अनुशंसा",
  "Drone Mapping": "ड्रोन मैपिंग",
  Weather: "मौसम",
  Resources: "संसाधन",
  Market: "बाज़ार",
  Contact: "संपर्क",
  Login: "लॉगिन",

  // Weather page
  "Weather & Climate Insights": "मौसम और जलवायु अंतर्दृष्टि",
  "Get accurate forecasts, seasonal predictions, and timely alerts to plan your farming activities and protect your crops from adverse weather conditions.":
    "अपनी कृषि गतिविधियों की योजना बनाने और अपनी फसलों को प्रतिकूल मौसम की स्थिति से बचाने के लिए सटीक पूर्वानुमान, मौसमी भविष्यवाणियां और समय पर अलर्ट प्राप्त करें।",
  Temperature: "तापमान",
  Humidity: "आर्द्रता",
  Rainfall: "वर्षा",
  Wind: "हवा",
  "Current Weather": "वर्तमान मौसम",
  "10-Day Forecast": "10-दिन का पूर्वानुमान",
  "Weather Alerts & Advisories": "मौसम अलर्ट और सलाह",
  "Seasonal Forecast": "मौसमी पूर्वानुमान",
  "Climate-Smart Farming Tips": "जलवायु-स्मार्ट खेती के टिप्स",
  "Weather Data Services": "मौसम डेटा सेवाएं",

  // Weather conditions
  Clear: "साफ",
  Clouds: "बादल",
  Rain: "बारिश",
  Drizzle: "हल्की बारिश",
  Thunderstorm: "आंधी-तूफान",
  Snow: "बर्फ",
  Mist: "कोहरा",
  Smoke: "धुआं",
  Haze: "धुंध",
  Dust: "धूल",
  Fog: "कोहरा",
  Sand: "रेत",
  Ash: "राख",
  Squall: "तूफान",
  Tornado: "बवंडर",
  sunny: "धूप",
  cloudy: "बादल",
  rainy: "बारिश",
  windy: "हवादार",
  snowy: "बर्फीला",
  stormy: "तूफानी",

  // Weather widget
  "Change Location": "स्थान बदलें",
  "Search for a city...": "शहर खोजें...",
  "Try Again": "पुनः प्रयास करें",
  "Weather Details": "मौसम विवरण",
  "Farming Advice": "कृषि सलाह",
  "Feels Like": "महसूस होता है",
  Pressure: "दबाव",
  Cloudiness: "बादल",
  "Farming Recommendations": "कृषि सिफारिशें",
  "Crop-Specific Advice": "फसल-विशिष्ट सलाह",
  "AI Prediction:": "AI भविष्यवाणी:",
  "View Detailed Forecast": "विस्तृत पूर्वानुमान देखें",

  // Weather alerts
  "Weather Alerts": "मौसम अलर्ट",
  "Notifications Active": "सूचनाएं सक्रिय",
  "Alert Preferences": "अलर्ट प्राथमिकताएं",
  "Severe Weather Alerts": "गंभीर मौसम अलर्ट",
  "Optimal Farming Conditions": "इष्टतम कृषि स्थितियां",
  "Daily Forecast Notifications": "दैनिक पूर्वानुमान सूचनाएं",
  "Enable Quiet Hours (10 PM - 6 AM)": "शांत घंटे सक्षम करें (रात 10 बजे - सुबह 6 बजे)",
  "Alert Delivery Methods": "अलर्ट वितरण विधियां",
  "View Details": "विवरण देखें",

  // Farming advice
  "Ideal conditions for harvesting. Consider irrigation in the evening.":
    "कटाई के लिए आदर्श स्थितियां। शाम में सिंचाई पर विचार करें।",
  "Good conditions for field work and planting. Monitor humidity levels.":
    "खेत के काम और रोपण के लिए अच्छी स्थितियां। आर्द्रता स्तर की निगरानी करें।",
  "Postpone spraying and harvesting. Check drainage systems.": "छिड़काव और कटाई स्थगित करें। जल निकासी प्रणालियों की जांच करें।",
  "Secure equipment and livestock. Avoid outdoor work until the storm passes.":
    "उपकरण और पशुधन को सुरक्षित करें। तूफान गुजरने तक बाहरी काम से बचें।",
  "Protect sensitive crops from frost. Ensure livestock has adequate shelter.":
    "संवेदनशील फसलों को ठंढ से बचाएं। सुनिश्चित करें कि पशुधन के पास पर्याप्त आश्रय है।",
  "Avoid spraying pesticides. Secure any loose structures or coverings.":
    "कीटनाशकों का छिड़काव न करें। किसी भी ढीली संरचना या कवरिंग को सुरक्षित करें।",

  // Specific alerts
  "High temperature alert: Ensure adequate irrigation for heat-sensitive crops.":
    "उच्च तापमान अलर्ट: गर्मी-संवेदनशील फसलों के लिए पर्याप्त सिंचाई सुनिश्चित करें।",
  "High humidity alert: Monitor for fungal diseases in crops like tomatoes and grapes.":
    "उच्च आर्द्रता अलर्ट: टमाटर और अंगूर जैसी फसलों में फंगल रोगों की निगरानी करें।",
  "Low humidity alert: Increase irrigation frequency for shallow-rooted crops.":
    "कम आर्द्रता अलर्ट: उथली जड़ वाली फसलों के लिए सिंचाई की आवृत्ति बढ़ाएं।",
  "Strong winds: Consider delaying fertilizer application and pesticide spraying.":
    "तेज हवाएं: उर्वरक अनुप्रयोग और कीटनाशक छिड़काव में देरी पर विचार करें।",

  // Days of week
  Today: "आज",
  Monday: "सोमवार",
  Tuesday: "मंगलवार",
  Wednesday: "बुधवार",
  Thursday: "गुरुवार",
  Friday: "शुक्रवार",
  Saturday: "शनिवार",
  Sunday: "रविवार",

  // Forecast tips
  "Farming Tip:": "कृषि टिप: ",
  "Rain expected in the coming days. Consider harvesting ripe crops and ensuring proper drainage.":
    "आने वाले दिनों में बारिश की उम्मीद है। पकी फसलों की कटाई और उचित जल निकासी सुनिश्चित करने पर विचार करें।",
  "High temperatures expected. Ensure adequate irrigation and consider shade for sensitive crops.":
    "उच्च तापमान की उम्मीद है। पर्याप्त सिंचाई सुनिश्चित करें और संवेदनशील फसलों के लिए छाया पर विचार करें।",
  "Favorable weather conditions expected. Ideal for regular farming activities.":
    "अनुकूल मौसम की स्थितियों की उम्मीद है। नियमित कृषि गतिविधियों के लिए आदर्श।",

  // Alert titles
  "Heavy Rainfall Expected": "भारी वर्षा की संभावना",
  "Optimal Planting Conditions": "इष्टतम रोपण स्थितियां",
  "Heat Wave Alert": "गर्मी की लहर अलर्ट",

  // Alert descriptions
  "Heavy rainfall expected in your region over the next 48 hours. Potential for localized flooding in low-lying areas.":
    "अगले 48 घंटों में आपके क्षेत्र में भारी वर्षा की उम्मीद है। निचले इलाकों में स्थानीय बाढ़ की संभावना है।",
  "Weather conditions will be ideal for planting wheat and barley over the next week with moderate temperatures and adequate soil moisture.":
    "अगले सप्ताह में मध्यम तापमान और पर्याप्त मिट्टी की नमी के साथ गेहूं और जौ लगाने के लिए मौसम की स्थितियां आदर्श होंगी।",
  "Temperatures expected to rise above 38°C starting next Monday. Take precautions to protect heat-sensitive crops.":
    "अगले सोमवार से तापमान 38°C से ऊपर जाने की उम्मीद है। गर्मी-संवेदनशील फसलों की सुरक्षा के लिए सावधानियां बरतें।",

  // Monsoon outlook
  "Monsoon Outlook (June-September)": "मानसून आउटलुक (जून-सितंबर)",
  "The monsoon is expected to be normal to slightly above normal this year, with well-distributed rainfall across most agricultural regions.":
    "इस साल मानसून सामान्य से थोड़ा ऊपर रहने की उम्मीद है, जिसमें अधिकांश कृषि क्षेत्रों में अच्छी तरह से वितरित वर्षा होगी।",
  "Rainfall Prediction:": "वर्षा भविष्यवाणी:",
  "102% of Long Period Average": "दीर्घकालिक औसत का 102%",

  // Temperature trend
  "Temperature Trend": "तापमान प्रवृत्ति",
  "Temperatures are expected to remain slightly above normal for the next three months, with occasional heat waves in May and early June.":
    "अगले तीन महीनों के लिए तापमान सामान्य से थोड़ा ऊपर रहने की उम्मीद है, मई और जून की शुरुआत में कभी-कभी गर्मी की लहरें आएंगी।",

  // AI recommendation
  "AI-Based Recommendation": "AI-आधारित अनुशंसा",
  "Consider planting heat-resistant varieties for summer crops. Prepare water conservation measures for the pre-monsoon period. Monsoon sowing can proceed as per normal schedule.":
    "गर्मियों की फसलों के लिए गर्मी-प्रतिरोधी किस्मों के रोपण पर विचार करें। प्री-मानसून अवधि के लिए जल संरक्षण उपायों की तैयारी करें। मानसून की बुवाई सामान्य कार्यक्रम के अनुसार आगे बढ़ सकती है।",

  // Climate-smart farming tips
  "Water Management": "जल प्रबंधन",
  "Install rainwater harvesting systems before monsoon. Consider drip irrigation for efficient water use during dry spells.":
    "मानसून से पहले वर्षा जल संचयन प्रणाली स्थापित करें। सूखे के दौरान कुशल जल उपयोग के लिए ड्रिप सिंचाई पर विचार करें।",
  "Heat Protection": "गर्मी से सुरक्षा",
  "Use shade nets for sensitive crops during peak summer. Apply mulching to reduce soil temperature and conserve moisture.":
    "चरम गर्मी के दौरान संवेदनशील फसलों के लिए छाया जाल का उपयोग करें। मिट्टी के तापमान को कम करने और नमी संरक्षित करने के लिए मल्चिंग लागू करें।",
  "Wind Protection": "हवा से सुरक्षा",
  "Establish windbreaks around orchards and vulnerable crops. Secure structures and covers before forecasted storms.":
    "बागों और कमजोर फसलों के आसपास विंडब्रेक स्थापित करें। पूर्वानुमानित तूफानों से पहले संरचनाओं और कवर को सुरक्षित करें।",
  "Crop Planning": "फसल योजना",
  "Diversify crops to reduce climate risk. Consider short-duration varieties that can be harvested before extreme weather periods.":
    "जलवायु जोखिम को कम करने के लिए फसलों में विविधता लाएं। कम अवधि की किस्मों पर विचार करें जिन्हें चरम मौसम की अवधि से पहले काटा जा सकता है।",

  // Weather data services
  Basic: "बेसिक",
  Premium: "प्रीमियम",
  Enterprise: "एंटरप्राइज",
  Free: "मुफ्त",
  "5-Day Forecast": "5-दिन का पूर्वानुमान",
  "Daily Weather Updates": "दैनिक मौसम अपडेट",
  "Basic Weather Alerts": "बुनियादी मौसम अलर्ट",
  "Current Plan": "वर्तमान योजना",
  "15-Day Forecast": "15-दिन का पूर्वानुमान",
  "Hourly Weather Updates": "घंटेवार मौसम अपडेट",
  "Advanced Weather Alerts": "उन्नत मौसम अलर्ट",
  "Seasonal Predictions": "मौसमी भविष्यवाणियां",
  "Crop-Specific Recommendations": "फसल-विशिष्ट सिफारिशें",
  "Upgrade Now": "अभी अपग्रेड करें",
  "30-Day Forecast": "30-दिन का पूर्वानुमान",
  "Real-time Weather Monitoring": "रीयल-टाइम मौसम निगरानी",
  "Custom Weather Stations": "कस्टम मौसम स्टेशन",
  "Climate Change Impact Analysis": "जलवायु परिवर्तन प्रभाव विश्लेषण",
  "AI-Powered Farming Recommendations": "AI-संचालित कृषि सिफारिशें",
  "Contact Sales": "बिक्री से संपर्क करें",

  // Other common terms
  "Loading weather prediction...": "मौसम की भविष्यवाणी लोड हो रही है...",
  "Continued rainfall expected. Consider postponing outdoor activities.":
    "लगातार बारिश की उम्मीद है। बाहरी गतिविधियों को स्थगित करने पर विचार करें।",
  "High temperatures expected to continue. Ensure crops are well-irrigated.":
    "उच्च तापमान जारी रहने की उम्मीद है। सुनिश्चित करें कि फसलें अच्छी तरह से सिंचित हैं।",
  "Stable weather conditions expected for the next 24 hours.": "अगले 24 घंटों के लिए स्थिर मौसम की स्थितियों की उम्मीद है।",
  "10-Day Forecast for": "10-दिन का पूर्वानुमान:",
  Precipitation: "वर्षा",
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isTranslating, setIsTranslating] = useState(false)

  const pendingTranslations = useRef<string[]>([])

  // Update the setLanguage function to clear translations when switching languages
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)

    // Clear translations when switching languages
    if (language.code === "en") {
      setTranslations({})
    } else if (language.code === "hi") {
      // For Hindi, use our predefined translations
      setTranslations(hindiTranslations)
    } else {
      // For other languages, clear translations to force retranslation
      setTranslations({})

      // Add common UI elements to pending translations for immediate translation
      const commonPhrases = [
        "Home",
        "Crop Recommendation",
        "Drone Mapping",
        "Weather",
        "Resources",
        "Market",
        "Contact",
        "Login",
      ]

      pendingTranslations.current = commonPhrases
    }
  }

  const translate = (text: string): string => {
    // If English or empty text, return as is
    if (currentLanguage.code === "en" || !text) return text

    // If we already have a translation, use it
    if (translations[text]) return translations[text]

    // If Hindi, check if we have a partial match (for sentences)
    if (currentLanguage.code === "hi") {
      // Try to find partial matches for longer sentences
      const keys = Object.keys(hindiTranslations)
      for (const key of keys) {
        if (text.includes(key) && key.length > 10) {
          return text.replace(key, hindiTranslations[key])
        }
      }
    }

    // If we don't have a translation yet, schedule it to be translated
    // but return the original text for now
    if (!pendingTranslations.current.includes(text)) {
      pendingTranslations.current.push(text)

      // Schedule translation outside of render cycle
      setTimeout(() => {
        translatePendingTexts()
      }, 0)
    }

    // Return original text while translation is in progress
    return text
  }

  const translatePendingTexts = async () => {
    if (pendingTranslations.current.length === 0 || currentLanguage.code === "en") return

    setIsTranslating(true)
    const textsToTranslate = [...pendingTranslations.current]
    pendingTranslations.current = []

    const newTranslations: Record<string, string> = { ...translations }
    let hasNewTranslations = false

    for (const text of textsToTranslate) {
      if (!translations[text]) {
        try {
          // In a real implementation, you would call the Google Translate API here
          // For demo purposes, we'll simulate translation with a delay
          await new Promise((resolve) => setTimeout(resolve, 100))

          // For Hindi, we already have translations in hindiTranslations
          if (currentLanguage.code === "hi" && hindiTranslations[text]) {
            newTranslations[text] = hindiTranslations[text]
            hasNewTranslations = true
            continue
          }

          // Simple mock translations for demonstration
          const mockTranslations: Record<string, Record<string, string>> = {
            hi: hindiTranslations,
            // Add more languages as needed
          }

          // Get the translation if available
          const translatedText = mockTranslations[currentLanguage.code]?.[text] || text

          if (translatedText !== text) {
            newTranslations[text] = translatedText
            hasNewTranslations = true
          }
        } catch (error) {
          console.error("Translation error:", error)
        }
      }
    }

    if (hasNewTranslations) {
      setTranslations(newTranslations)
    }

    setIsTranslating(false)
  }

  // Add this useEffect to handle initial translations
  useEffect(() => {
    if (currentLanguage.code !== "en") {
      translatePendingTexts()
    }
  }, [currentLanguage.code])

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

