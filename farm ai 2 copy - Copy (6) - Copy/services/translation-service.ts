import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `You are a professional translator. Translate the following text to ${targetLanguage}. 
    Provide only the translation without any additional text, explanations, or formatting.
    Do not use markdown or code blocks.
    Maintain the original meaning and tone.
    
    Text to translate: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translation = response.text().trim();

    return translation;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text if translation fails
  }
}

export async function translateBatch(texts: string[], targetLanguage: string): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `You are a professional translator. Translate the following texts to ${targetLanguage}.
    Return ONLY a JSON array of translations, with no additional text, markdown, or code blocks.
    The array should contain exactly ${texts.length} translations in the same order as the input texts.
    Each translation should maintain the original meaning and tone.
    
    Example format:
    ["translation1", "translation2", "translation3"]
    
    Texts to translate: ${JSON.stringify(texts)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text().trim();
    
    // Remove any markdown code block formatting if present
    responseText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const translations = JSON.parse(responseText);
      
      // Validate that we got back an array of the same length
      if (!Array.isArray(translations) || translations.length !== texts.length) {
        console.error("Invalid translation response format");
        return texts;
      }
      
      return translations;
    } catch (parseError) {
      console.error("Failed to parse translation response:", parseError);
      console.error("Raw response:", responseText);
      return texts;
    }
  } catch (error) {
    console.error("Batch translation error:", error);
    return texts; // Return original texts if translation fails
  }
} 