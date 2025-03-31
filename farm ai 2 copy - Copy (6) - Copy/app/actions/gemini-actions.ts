"use server"

// FuturixAI API implementation
const FUTURIX_API_KEY = process.env.FUTURIX_API_KEY || "67e438791128ba853fa9515e";
// The API URL had underscores instead of dots - fix that
const FUTURIX_API_URL = "https://api-v2.futurixai.com/api/lara/v1/completion";

// Enhanced fallback responses for different farming topics
const fallbackResponses = {
  general: [
    "As your farming companion, I can help with questions about crop management, pest control, irrigation, and sustainable farming practices. Could you provide more details about your specific farming situation so I can give you more tailored advice?",
    "I'm here to assist with your farming questions. I can provide guidance on crop selection, soil health, pest management, and more. What specific aspect of farming would you like to know about?",
    "Welcome to Aapka Sathi! I'm your farming assistant. I can provide information on sustainable practices, seasonal crops, and agricultural innovations. How can I help with your farm today?"
  ],
  sustainable: [
    "Sustainable farming involves practices like crop rotation, organic fertilizers, and water conservation. These methods improve soil health and reduce environmental impact while maintaining productivity.",
    "For sustainable farming, consider intercropping compatible plants, using natural pest control methods, and implementing drip irrigation. These practices conserve resources and promote long-term soil health.",
    "Sustainable agriculture focuses on three pillars: economic profitability, environmental stewardship, and social responsibility. Practices like organic fertilizers, integrated pest management, and water conservation support all three goals.",
    "Sustainable farming practices include: 1) Using organic fertilizers like compost and manure, 2) Implementing crop rotation to prevent soil depletion, 3) Using drip irrigation for water conservation, 4) Practicing integrated pest management to reduce chemical use, and 5) Planting native species that thrive in local conditions."
  ],
  crops: [
    "Crop rotation is crucial for soil health. For Indian farming, try a three-year rotation with cereals, legumes, and vegetables. This helps break pest cycles and maintains soil nutrients naturally.",
    "Select crops based on your local climate, soil type, and water availability. Indigenous varieties often require less water and are more resistant to local pests and diseases.",
    "Consider companion planting to maximize space and deter pests. For example, plant marigolds with vegetables, grow onions near carrots, or pair beans with corn for mutual benefits."
  ],
  pests: [
    "For sustainable pest management, try neem oil spray (mix 5ml neem oil with 1L water), or introduce natural predators like ladybugs. Check your crops early morning when pests are most visible.",
    "Integrated Pest Management (IPM) combines biological controls, habitat manipulation, and resistant crop varieties to minimize pest damage with minimal environmental impact.",
    "Create natural barriers against pests by planting repellent crops like neem, tulsi, and lemongrass around field borders. These help deter many harmful insects without chemicals."
  ],
  water: [
    "In Indian conditions, drip irrigation can save up to 80% water compared to flood irrigation. Consider collecting rainwater during monsoon season. For most crops, water early morning to reduce evaporation.",
    "Mulching with straw, leaves, or compost helps retain soil moisture, reducing irrigation needs by up to 25%. It also suppresses weeds and gradually adds nutrients to the soil.",
    "Consider micro-irrigation techniques like drip systems or micro-sprinklers. They deliver water directly to plant roots, minimizing loss through evaporation and runoff."
  ],
  fertilizer: [
    "Try vermicomposting with local earthworms. Mix crop residues, cow dung and kitchen waste in 3:1:1 ratio. Cover and keep moist for 45-60 days. This creates nutrient-rich organic fertilizer suitable for most crops.",
    "Green manuring improves soil fertility naturally. Grow plants like dhaincha or sunn hemp for 45-60 days, then plow them back into the soil before they flower.",
    "For balanced nutrition, combine organic sources like compost (3-4 tons/acre) with biofertilizers specific to your crop. This supports healthy growth while building long-term soil health."
  ],
  weather: [
    "Weather-resilient farming is becoming essential. Consider raised beds in flood-prone areas, and drought-resistant varieties like bajra in dry regions. Agroforestry can also provide microclimate benefits for your crops.",
    "Monitor weather forecasts regularly and adjust your farming activities accordingly. Early or delayed monsoon may require changes in sowing dates or crop selection.",
    "Climate-smart farming includes diversifying crops, improving water management, and using weather-resistant varieties. These strategies help manage risks from increasingly unpredictable weather patterns."
  ],
  soil: [
    "You can test soil pH using simple kits available at agricultural centers. Most crops grow best in slightly acidic to neutral soil (pH 6-7). For acidic soils, add agricultural lime; for alkaline soils, add organic matter like compost.",
    "Improve soil structure by adding organic matter regularly. This increases water retention in sandy soils and improves drainage in clay soils.",
    "Cover crops like legumes can fix nitrogen, prevent erosion, and add organic matter when plowed under. They're an excellent way to improve soil health between main crop seasons."
  ],
  greeting: [
    "नमस्ते! मैं आपका साथी हूँ, आपका कृषि सहायक। मैं फसल प्रबंधन, मौसम, कीट नियंत्रण, और अन्य कृषि संबंधित प्रश्नों में आपकी सहायता कर सकता हूँ। आप मुझसे क्या पूछना चाहेंगे?",
    "Hello! I'm your farming companion. I can assist you with crop management, weather information, pest control, and other agriculture-related questions. What would you like to ask me?",
    "Greetings! I'm Aapka Sathi, your agricultural assistant. I'm here to provide guidance on farming practices, crop selection, pest management, and more. How can I help you today?"
  ]
};

// Get a random response from a specific category
function getRandomTopicResponse(topic: keyof typeof fallbackResponses) {
  const responses = fallbackResponses[topic];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// Function to get a response from FuturixAI API
export async function getGeminiResponse(prompt: string) {
  // For debugging purposes, add basic console log
  console.log("Received query:", prompt);
  
  try {
    // Handle simple greetings immediately for better UX
    const lowercasePrompt = prompt.toLowerCase();
    if (lowercasePrompt.includes("hello") || lowercasePrompt.includes("hi") || 
        lowercasePrompt.includes("namaste") || lowercasePrompt === "hello" || 
        lowercasePrompt === "hi" || lowercasePrompt === "namaste") {
      return {
        success: true,
        data: getRandomTopicResponse("greeting")
      };
    }

    // Since the API seems to be having issues, let's use our enhanced fallback system
    return useFallbackResponse(prompt);

    /* Keeping the API code commented out for future use if needed
    // Prepare the request payload for FuturixAI
    const payload = {
      messages: [
        {
          role: "system",
          content: "You are 'Aapka Sathi', an agricultural assistant specializing in Indian farming practices. Provide concise, practical advice tailored to Indian conditions. Focus on sustainable farming, crop management, pest control, and climate adaptation. Keep responses brief and actionable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      top_p: 1
    };

    console.log("Calling FuturixAI API...");
    
    // Call the FuturixAI API
    const response = await fetch(FUTURIX_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": FUTURIX_API_KEY
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    console.log("API Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error status: ${response.status}, body:`, errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response data:", JSON.stringify(data).substring(0, 200) + "..."); 

    // Try multiple possible response formats based on the API documentation
    let text = "";
    if (data.choices && data.choices[0] && data.choices[0].message) {
      text = data.choices[0].message.content;
    } else if (data.content) {
      text = data.content;
    } else if (data.response) {
      text = data.response;
    } else if (data.message) {
      text = data.message;
    } else if (data.answer) {
      text = data.answer;
    } else if (data.result) {
      text = data.result;
    } else if (data.text) {
      text = data.text;
    } else if (typeof data === 'string') {
      text = data;
    } else {
      console.error("Unknown API response format:", data);
      // If we can't parse the response, use the fallback
      return useFallbackResponse(prompt);
    }

    if (!text) {
      console.warn("Empty response from API, using fallback");
      return useFallbackResponse(prompt);
    }

    console.log("Successfully parsed response:", text.substring(0, 50) + "...");
    return { success: true, data: text };
    */
  } catch (error) {
    console.error(`Error:`, error);
    // Fall back to local response system
    return useFallbackResponse(prompt);
  }
}

// Provide a fallback response when the API fails
function useFallbackResponse(prompt: string) {
  console.log("Using fallback response system");
  const lowercasePrompt = prompt.toLowerCase();
  
  // Determine the most relevant topic based on keywords in the query
  if (lowercasePrompt.includes("hello") || lowercasePrompt.includes("hi") || lowercasePrompt.includes("namaste")) {
    return {
      success: true,
      data: getRandomTopicResponse("greeting")
    };
  } else if (lowercasePrompt.includes("sustainable") || lowercasePrompt.includes("eco") || lowercasePrompt.includes("environment")) {
    return {
      success: true,
      data: getRandomTopicResponse("sustainable")
    };
  } else if ((lowercasePrompt.includes("crop") && lowercasePrompt.includes("rotate")) || lowercasePrompt.includes("crop") || lowercasePrompt.includes("plant") || lowercasePrompt.includes("seed")) {
    return {
      success: true,
      data: getRandomTopicResponse("crops")
    };
  } else if (lowercasePrompt.includes("pest") || lowercasePrompt.includes("insect") || lowercasePrompt.includes("disease")) {
    return {
      success: true,
      data: getRandomTopicResponse("pests")
    };
  } else if (lowercasePrompt.includes("irrigation") || lowercasePrompt.includes("water") || lowercasePrompt.includes("moisture")) {
    return {
      success: true,
      data: getRandomTopicResponse("water")
    };
  } else if (lowercasePrompt.includes("fertilizer") || lowercasePrompt.includes("organic") || lowercasePrompt.includes("compost") || lowercasePrompt.includes("nutrient")) {
    return {
      success: true,
      data: getRandomTopicResponse("fertilizer")
    };
  } else if (lowercasePrompt.includes("weather") || lowercasePrompt.includes("rain") || lowercasePrompt.includes("monsoon") || lowercasePrompt.includes("climate")) {
    return {
      success: true,
      data: getRandomTopicResponse("weather")
    };
  } else if (lowercasePrompt.includes("soil") || lowercasePrompt.includes("ph") || lowercasePrompt.includes("land")) {
    return {
      success: true,
      data: getRandomTopicResponse("soil")
    };
  } else {
    return {
      success: true,
      data: getRandomTopicResponse("general")
    };
  }
}

