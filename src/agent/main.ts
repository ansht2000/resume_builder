import { GoogleGenAI } from "@google/genai";
import "../../envConfig.ts"

const GEMINI_API_KEY: string | undefined = process.env.GEMINI_API_KEY
const agent: GoogleGenAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

console.log(GEMINI_API_KEY)