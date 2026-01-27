import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const translateText = async (
  headline,
  subheadline,
  targetLanguage
) => {
  if (!ai) {
    console.warn("Translation disabled: missing VITE_GEMINI_API_KEY");
    return { headline, subheadline };
  }
  
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const jsonText = response.text;
    if (!jsonText) {
      console.warn("Translation returned empty response.");
      return { headline, subheadline };
    }
    
    try {
        // Clean potential markdown blocks just in case
        const cleanedJson = jsonText.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedJson);
    } catch (e) {
        console.error("Failed to parse translation JSON:", e, "Raw:", jsonText);
        return { headline, subheadline };
    }
  } catch (error) {
    console.error("Translation failed:", error);
    // Fallback to original if failure
    return { headline, subheadline };
  }
};
