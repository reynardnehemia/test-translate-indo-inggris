
import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const languageMap: Record<Language, string> = {
  id: 'Indonesian',
  en: 'English',
};

export const translateText = async (
  text: string,
  sourceLang: Language,
  targetLang: Language
): Promise<string> => {
  if (!text.trim()) {
    return '';
  }

  try {
    const prompt = `Translate the following text from ${languageMap[sourceLang]} to ${languageMap[targetLang]}. Provide only the translated text, without any introductory phrases, explanations, or additional formatting.\n\nText:\n"""\n${text}\n"""`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Translation API error:", error);
    throw new Error("Failed to translate text. Please check your connection and API key.");
  }
};
