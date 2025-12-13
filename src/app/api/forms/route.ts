import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Form from "@/models/Form";
import { z } from "zod";

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    fields: z.array(z.any()),
});

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { title, description, fields } = formSchema.parse(body);

        // Generate a simple unique slug
        // In a real app, check for collision
        const slug = Math.random().toString(36).substring(2, 10);

        const form = await Form.create({
            title,
            description: description || "",
            content: fields,
            slug,
            published: true,
        });

        return NextResponse.json({
            success: true,
            formId: form._id,
            slug: form.slug
        });
    } catch (error) {
        console.error("Error creating form:", error);
        return NextResponse.json(
            { error: "Failed to create form" },
            { status: 500 }
        );
    }
}
