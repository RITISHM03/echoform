import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongoose";
import Form from "@/models/Form";
import { FormRenderer } from "@/components/form-renderer";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PublicFormPage({ params }: PageProps) {
    await connectToDatabase();

    const { slug } = await params;
    const form = await Form.findOne({ slug }).lean();

    if (!form) {
        notFound();
    }

    // Convert _id to string for serialization
    const serializedForm = {
        ...form,
        _id: form._id.toString(),
        createdAt: form.createdAt?.toISOString(),
        updatedAt: form.updatedAt?.toISOString(),
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8">
            <div className="max-w-xl mx-auto space-y-8 bg-zinc-900/50 p-6 sm:p-10 rounded-xl border border-white/10 shadow-2xl">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">{form.title}</h1>
                    {form.description && (
                        <p className="text-muted-foreground">{form.description}</p>
                    )}
                </div>

                <div className="h-px bg-white/10" />

                <FormRenderer
                    formId={serializedForm._id}
                    fields={serializedForm.content}
                />
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                Powered by <span className="font-bold text-white">EchoForms</span>
            </div>
        </div>
    );
}
