import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Form from "@/models/Form";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    fields: z.array(z.any()),
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const body = await req.json();
        const { title, description, fields } = formSchema.parse(body);

        // Generate unique slug
        let slug = generateSlug();
        let isUnique = false;

        // Ensure uniqueness (simple retry logic)
        while (!isUnique) {
            const existing = await Form.findOne({ slug });
            if (!existing) {
                isUnique = true;
            } else {
                slug = generateSlug();
            }
        }

        const form = await Form.create({
            userId: (session.user as any).id, // casting because we patched id into session type locally or dynamically
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
