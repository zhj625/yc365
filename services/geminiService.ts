
import { GoogleGenAI } from "@google/genai";

// Fixed: Correctly initialize GoogleGenAI with named parameter from process.env.API_KEY
export const analyzeMarket = async (marketTitle: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Please configure the API_KEY to use AI analysis features.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Fixed: Use 'gemini-3-flash-preview' for basic text tasks as per model selection rules
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following prediction market question briefly. Provide a short, witty insight on what factors might influence the outcome. Keep it under 50 words. Question: "${marketTitle}"`,
      config: {
        temperature: 0.7,
      }
    });

    // Fixed: Use response.text property directly as per extracts guidelines
    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Analysis temporarily unavailable.";
  }
};
