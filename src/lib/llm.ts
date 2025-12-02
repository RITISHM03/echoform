import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export interface FormSchema {
    title: string;
    description: string;
    fields: {
        label: string;
        type: 'text' | 'number' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
        required: boolean;
        options?: string[]; // For select, radio, checkbox
        placeholder?: string;
    }[];
}

const MOCK_SCHEMAS: Record<string, FormSchema> = {
    default: {
        title: "Untitled Form",
        description: "A generated form.",
        fields: [
            { label: "Name", type: "text", required: true, placeholder: "Your name" },
            { label: "Email", type: "email", required: true, placeholder: "your@email.com" }
        ]
    },
    feedback: {
        title: "Product Feedback",
        description: "We value your feedback!",
        fields: [
            { label: "Name", type: "text", required: true, placeholder: "Your name" },
            { label: "Email", type: "email", required: true, placeholder: "your@email.com" },
            { label: "Rating", type: "select", required: true, options: ["1", "2", "3", "4", "5"] },
            { label: "Comments", type: "textarea", required: false, placeholder: "Any suggestions?" }
        ]
    },
    registration: {
        title: "Event Registration",
        description: "Register for our upcoming event.",
        fields: [
            { label: "Full Name", type: "text", required: true },
            { label: "Email", type: "email", required: true },
            { label: "Dietary Restrictions", type: "text", required: false },
            { label: "Attending Days", type: "checkbox", required: true, options: ["Day 1", "Day 2"] }
        ]
    }
};

export async function generateFormSchema(prompt: string): Promise<FormSchema> {
    if (!openai) {
        console.warn("OPENAI_API_KEY not found. Using mock LLM response.");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

        const lowerPrompt = prompt.toLowerCase();
        if (lowerPrompt.includes("feedback")) return MOCK_SCHEMAS.feedback;
        if (lowerPrompt.includes("register") || lowerPrompt.includes("registration")) return MOCK_SCHEMAS.registration;
        return MOCK_SCHEMAS.default;
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful AI that generates form schemas based on user prompts.
          Output JSON only.
          The schema must follow this structure:
          {
            "title": "Form Title",
            "description": "Form Description",
            "fields": [
              {
                "label": "Field Label",
                "type": "text" | "number" | "email" | "textarea" | "select" | "checkbox" | "radio",
                "required": boolean,
                "options": ["Option 1", "Option 2"] // Only for select, checkbox, radio
                "placeholder": "Placeholder text"
              }
            ]
          }`
                },
                {
                    role: "user",
                    content: `Generate a form for: ${prompt}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content received from OpenAI");

        return JSON.parse(content) as FormSchema;
    } catch (error) {
        console.error("Error generating form schema:", error);
        return MOCK_SCHEMAS.default;
    }
}
