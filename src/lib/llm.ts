import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// Configuration
const LLM_PROVIDER = process.env.LLM_PROVIDER || "google";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

// Interfaces
export interface FormSchema {
    title: string;
    description: string;
    fields: {
        label: string;
        type: "text" | "number" | "email" | "textarea" | "select" | "checkbox" | "radio";
        required: boolean;
        options?: string[];
        placeholder?: string;
    }[];
}

// Mock Data
const MOCK_SCHEMAS: Record<string, FormSchema> = {
    default: {
        title: "Untitled Form",
        description: "A generated form.",
        fields: [
            { label: "Name", type: "text", required: true, placeholder: "Your name" },
            { label: "Email", type: "email", required: true, placeholder: "your@email.com" },
        ],
    },
    feedback: {
        title: "Product Feedback",
        description: "We value your feedback!",
        fields: [
            { label: "Name", type: "text", required: true, placeholder: "Your name" },
            { label: "Email", type: "email", required: true, placeholder: "your@email.com" },
            { label: "Rating", type: "select", required: true, options: ["1", "2", "3", "4", "5"] },
            { label: "Comments", type: "textarea", required: false, placeholder: "Any suggestions?" },
        ],
    },
    registration: {
        title: "Event Registration",
        description: "Register for our upcoming event.",
        fields: [
            { label: "Full Name", type: "text", required: true },
            { label: "Email", type: "email", required: true },
            { label: "Dietary Restrictions", type: "text", required: false },
            { label: "Attending Days", type: "checkbox", required: true, options: ["Day 1", "Day 2"] },
        ],
    },
};

// System Prompt
const SYSTEM_PROMPT = `
You are a helpful AI that generates form schemas based on user prompts.
Output JSON only. Do not include markdown formatting like \`\`\`json.
The schema must follow this structure:
{
  "title": "Form Title",
  "description": "Form Description",
  "fields": [
    {
      "label": "Field Label",
      "type": "text" | "number" | "email" | "textarea" | "select" | "checkbox" | "radio",
      "required": boolean,
      "options": ["Option 1", "Option 2"], // Only for select, checkbox, radio
      "placeholder": "Placeholder text"
    }
  ]
}
`;

// Helper: Clean JSON string
function cleanJson(text: string): string {
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

// Helper: Mock Generator
async function generateMock(prompt: string): Promise<FormSchema> {
    console.warn("Using mock LLM response.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("feedback")) return MOCK_SCHEMAS.feedback;
    if (lowerPrompt.includes("register") || lowerPrompt.includes("registration")) return MOCK_SCHEMAS.registration;
    return MOCK_SCHEMAS.default;
}

// Helper: Google Gemini Generator
async function generateWithGemini(prompt: string): Promise<FormSchema> {
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing");

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Try primary model first, then fallback to specific versions found in user's account
    const modelsToTry = [
        GEMINI_MODEL,
        "gemini-2.0-flash",
        "gemini-flash-latest",
        "gemini-pro-latest",
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro"
    ];

    let lastError;

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: { responseMimeType: "application/json" }
            });

            const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nGenerate a form for: ${prompt}`);
            const response = await result.response;
            const text = response.text();

            return JSON.parse(cleanJson(text)) as FormSchema;
        } catch (error: any) {
            console.warn(`Failed to generate with model ${modelName}:`, error.message);
            lastError = error;
        }
    }

    // If all fail, try to list available models to help debug
    try {
        console.log("Attempting to list available models for debugging...");
        const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
        const listData = await listResponse.json();
        console.log("Available Gemini Models:", JSON.stringify(listData, null, 2));
    } catch (listError) {
        console.error("Failed to list models:", listError);
    }

    throw lastError || new Error("All Gemini models failed");
}

// Helper: OpenAI Generator
async function generateWithOpenAI(prompt: string): Promise<FormSchema> {
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is missing");

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Generate a form for: ${prompt}` },
        ],
        response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content received from OpenAI");

    return JSON.parse(content) as FormSchema;
}

// Main Export
export async function generateFormSchema(prompt: string): Promise<FormSchema> {
    try {
        // 1. Try Google Gemini if selected or default
        if (LLM_PROVIDER === "google" && GEMINI_API_KEY) {
            return await generateWithGemini(prompt);
        }

        // 2. Try OpenAI if selected
        if (LLM_PROVIDER === "openai" && OPENAI_API_KEY) {
            return await generateWithOpenAI(prompt);
        }

        // 3. Fallback to Mock if provider is "mock" or keys missing
        return await generateMock(prompt);

    } catch (error) {
        console.error(`Error generating form schema with ${LLM_PROVIDER}:`, error);
        // Fallback to mock on error to keep app usable
        return await generateMock(prompt);
    }
}
