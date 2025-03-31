import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// IMPORTANT: This would need a real API key in production
const apiKey = process.env.OPENAI_API_KEY || ""

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json()

    // Make sure we have an API key
    if (!apiKey) {
      return new Response("OpenAI API key not configured", { status: 500 })
    }

    // Create a system prompt for the farming assistant
    const systemPrompt = `You are an AI farming assistant designed to help farmers with their agricultural needs.
    
    Your expertise includes:
    - Crop recommendations based on soil type, climate, and market trends
    - Weather interpretation and farming advice
    - Pest and disease identification and treatment
    - Modern farming techniques and best practices
    - Information about government schemes and subsidies for farmers
    - Market trends and pricing information
    
    Always provide practical, actionable advice that farmers can implement. Use simple language and avoid technical jargon unless necessary. If you don't know something, admit it and suggest where they might find the information.`

    // Request the AI model to generate a response
    const response = await generateText({
      model: openai("gpt-4o", { apiKey }),
      prompt: messages.map((m: any) => m.content).join("\n"),
      system: systemPrompt,
      temperature: 0.7,
      maxTokens: 800,
    })

    // Return the response as a streaming text response
    return new Response(response.text)
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Error processing your request", { status: 500 })
  }
}

