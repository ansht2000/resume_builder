import { Content, GenerateContentConfig, GenerateContentResponse, GoogleGenAI, Part } from "@google/genai";
import { GenerateContentParameters } from "@google/genai";
import { MODEL, RESUME_FROM_ITEMS_SYSTEM_PROMPT, RESUME_FROM_PROMPT_SYSTEM_PROMPT } from "./config.js";
import "../../envConfig.js"
import { response_schema } from "../schemas/response_schema.js";
import { InspectOptions } from "util";
import { ResumeItems } from "@/types/types.js";

const GEMINI_API_KEY: string | undefined = process.env.GEMINI_API_KEY;
const llm: GoogleGenAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function get_response_from_prompt(prompt: string): Promise<any> {
    // create config for llm call to return only one response and according to the response schema
    let config: GenerateContentConfig = {
        candidateCount: 1,
        systemInstruction: RESUME_FROM_PROMPT_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: response_schema,
    };

    let params: GenerateContentParameters = {
        model: MODEL,
        contents: prompt,
        config: config,
    };

    const response: GenerateContentResponse = await llm.models.generateContent(params);
    // id have to use some library like zod to validate this at runtime, ill probs add that later
    // but for now ill trust that the llm ("trust the llm" lmao) returns a properly formatted response
    const response_json: any = JSON.parse(response.candidates![0].content!.parts![0].text!);
    return response_json;
}

export async function get_response_from_item_list(item_list: ResumeItems, job_description: string): Promise<any> {
    let config: GenerateContentConfig = {
        candidateCount: 1,
        systemInstruction: RESUME_FROM_ITEMS_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: response_schema,
    };

    let json_part: Part = {
        inlineData: {
            data: btoa(JSON.stringify(item_list)),
            mimeType: "application/json",
        }
    }

    let job_part: Part = {
        text: job_description
    }

    let prompt: Content = {
        parts: [json_part, job_part]
    }

    let params: GenerateContentParameters = {
        model: MODEL,
        contents: prompt,
        config: config,
    };

    const response: GenerateContentResponse = await llm.models.generateContent(params);
    const response_json: any = JSON.parse(response.candidates![0].content!.parts![0].text!);
    return response_json;
}

async function test_get_response_from_prompt() {
    const options: InspectOptions = {
        depth: null,
    };
    const response_json = await get_response_from_prompt("I went to johns hopkins from august 2019 to may 2024, i got a bachelor of science in physics. i have had one job as a tutor for axiom educators in baltimore where i tutored middle school kids. i know python and go and i am a hard worker.");
    console.dir(response_json, options);
}

async function test_get_response_from_item_list() {
    const options: InspectOptions = {
        depth: null,
    };
    let item_list: ResumeItems = {
        education: [
            {
                institution_name: "Johns Hopkins",
                degree_type: "Bachelor of Science",
                degree_subject: "Physics",
                location: {
                    city: "Baltimore",
                    state: "MD"
                },
                duration: {
                    start_date: "Aug 2019",
                    end_date: "July 2024"
                }
            }
        ],
        work_experiences: [
            {
                company_name: "Axiom",
                position_title: "Tutor",
                contributions: [
                    "hello",
                    "example",
                    "anotha one"
                ],
                location: {
                    city: "Baltimore",
                    state: "MD"
                },
                duration: {
                    start_date: "Nov 2022",
                    end_date: "April 2023"
                }
            }
        ],
        skills: [
            {
                category: "languages",
                skill_list: [
                    "Python",
                    "Go"
                ]
            }
        ],
        projects: [
            {
                project_name: "cimp",
                github_link: "link",
                description: "example",
                contributions: [
                    "did stuff"
                ]
            }
        ],
        coursework: [
            {
                subject: "Physics",
                class_list: [
                    "quantum",
                    "classical",
                    "statistical"
                ]
            }
        ]
    }
    const job_description: string = `Job Title: Video Tuning Software Engineer

Job Type: Long Term Contract

Location: Milpitas, CA

Job Requirements

    Software expert with strong data processing experience using python.
    Expert in python programming.
    Mathematical skills and algorithm development.

Responsibilities

    Develop quality software and web applications.
    Analyze and maintain existing software applications.
    Design highly scalable, testable code.
    Discover and fix programming bugs.

Tasks

    Tasks include communication with devices to collect and load new data after processing using mostly python language.
    Device communication could entail FPGAs, PCs, cameras, and scientific equipment of all kind.
    Algorithms could entail data averaging, data fitting using multiple schemes and data parameters derivation and optimization.
    Develop plotting tools to visualize results.

Desired but not required

    Image processing (2D) experience.
    Camera image grabbing SW technique and processing.
    Display visualization experience such as color gamut brightness, gamma, contrast ratio, mura mapping.
    Experience with color measurement tools such as radiant or Klein or beam profiler meters.

Qualifications

    BS computer science or physics/applied math with strong CS background.
    3 years working experience.
    Individual must be willing to learn above in short order.
    Work on premises (this is not a remote job as candidate has to visualize what they are working on).
    A 3 month evaluation of skills is expected.
`
    const response_json = await get_response_from_item_list(item_list, job_description);
    console.dir(response_json, options);
    // console.log(JSON.stringify(item_list));
}

// test_get_response_from_prompt()

test_get_response_from_item_list()