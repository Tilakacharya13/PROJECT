import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const translateText = async (
  headline,
  subheadline,
  targetLanguage
) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLanguage}. Maintain the punchy, marketing tone.
      
      Headline: "${headline}"
      Subheadline: "${subheadline}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            subheadline: { type: Type.STRING },
          },
          required: ["headline", "subheadline"],
        },
      },
    });

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
