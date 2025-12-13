import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Form from "@/models/Form";
import FormResponse from "@/models/Response";
import { z } from "zod";

const submissionSchema = z.object({
    formId: z.string(),
    content: z.record(z.any()),
});

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        console.log("Submitting form data:", body); // Log received data

        const { formId, content } = submissionSchema.parse(body);

        const form = await Form.findById(formId);
        if (!form) {
            console.error("Form not found for ID:", formId);
            return NextResponse.json({ error: "Form not found" }, { status: 404 });
        }

        // Save response
        await FormResponse.create({
            formId,
            content,
        });

        // Increment submission count
        await Form.findByIdAndUpdate(formId, { $inc: { submissions: 1 } });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error submitting form:", error);
        // Ensure error is simple object
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: "Failed to submit form", details: errorMessage },
            { status: 500 }
        );
    }
}
