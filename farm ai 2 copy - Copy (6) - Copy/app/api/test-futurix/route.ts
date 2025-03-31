import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const FUTURIX_API_KEY = process.env.FUTURIX_API_KEY || "67e438791128ba853fa9515e";
    const FUTURIX_API_URL = "https://api-v2.futurixai.com/api/lara/v1/completion";

    console.log("Testing FuturixAI API connection...");
    console.log("API Key:", FUTURIX_API_KEY);
    console.log("API URL:", FUTURIX_API_URL);

    // Prepare the request payload for FuturixAI
    const payload = {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: "What is the capital of France?"
        }
      ],
      temperature: 0.7,
      top_p: 1
    };

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
      return NextResponse.json({ 
        success: false, 
        error: `API error: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }

    const data = await response.json();
    console.log("API Response:", data);

    return NextResponse.json({ 
      success: true, 
      data: data,
      message: "FuturixAI API connection successful!" 
    });
  } catch (error) {
    console.error("Error testing FuturixAI API:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to connect to FuturixAI API" 
    }, { status: 500 });
  }
} 