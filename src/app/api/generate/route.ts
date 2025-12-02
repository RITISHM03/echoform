import { NextResponse } from "next/server";
import { generateFormSchema } from "@/lib/llm";
import { z, ZodError } from "zod";

const requestSchema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt } = requestSchema.parse(body);

        const schema = await generateFormSchema(prompt);

        return NextResponse.json({ schema }, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: (error as any).errors }, { status: 400 });
        }
        console.error("Error in generate API:", error);
        return NextResponse.json(
            { error: "Failed to generate form" },
            { status: 500 }
        );
    }
}
