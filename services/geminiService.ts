import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BirthDetails, AstrologyReading } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const readingSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    sunSign: { type: Type.STRING, description: "The Zodiac sign of the Sun." },
    moonSign: { type: Type.STRING, description: "The Zodiac sign of the Moon." },
    risingSign: { type: Type.STRING, description: "The Rising sign (Ascendant)." },
    natalAnalysis: { type: Type.STRING, description: "A detailed 2-3 paragraph analysis of the person's character, strengths, and challenges based on their natal chart." },
    currentPrediction: { type: Type.STRING, description: "A detailed 2-3 paragraph forecast for the current time period, discussing relevant transits and advice." },
  },
  required: ["sunSign", "moonSign", "risingSign", "natalAnalysis", "currentPrediction"],
};

export const generateAstrologyReading = async (details: BirthDetails): Promise<AstrologyReading> => {
  try {
    const model = "gemini-3-pro-preview"; // Using Pro for better creative writing and reasoning
    
    const prompt = `
      Act as an expert master astrologer. 
      Generate a detailed reading for a person born on ${details.date} at ${details.time} in ${details.city}, ${details.country}.
      
      Calculate the approximate positions of the Sun, Moon, and Ascendant based on the provided time and location.
      Provide a deep, mystical, yet practical analysis.
      
      Output JSON matching the schema:
      - sunSign, moonSign, risingSign
      - natalAnalysis: The general personality and destiny prediction.
      - currentPrediction: What is happening right now in the stars for them (transits) and advice for the immediate future.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: readingSchema,
        temperature: 0.7, // A bit of creativity
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from the oracle.");
    }

    const data = JSON.parse(text) as AstrologyReading;
    return data;
  } catch (error) {
    console.error("Astrology API Error:", error);
    throw error;
  }
};