import { GenerateContentConfig, GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { GenerateContentParameters } from "@google/genai";
import { SYSTEM_PROMPT } from "./config.js";
import "../../envConfig.ts"
import { schema_read_file } from "./tools/functions/read_file.js";

const GEMINI_API_KEY: string | undefined = process.env.GEMINI_API_KEY;
const llm: GoogleGenAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
    let config: GenerateContentConfig = {
        candidateCount: 1,
        systemInstruction: SYSTEM_PROMPT,
        
    };
    
    let params: GenerateContentParameters = {
        model: "gemini-2.0-flash-001",
        contents: "say a few words",
        config: config,
    };
    // const response: GenerateContentResponse = await llm.models.generateContent(params);
    // console.log(response)

    console.dir(schema_read_file);
}

main()