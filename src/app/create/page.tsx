"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormPreview } from "@/components/form-preview";
import { Loader2, Sparkles } from "lucide-react";
import { FormSchema } from "@/lib/llm";

export default function CreatePage() {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [schema, setSchema] = useState<FormSchema | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) throw new Error("Failed to generate form");

            const data = await res.json();
            setSchema(data.schema);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">Create a New Form</h1>
                    <p className="text-muted-foreground">
                        Describe your form in plain English, and we&apos;ll build it for you.
                    </p>
                </div>

                <form onSubmit={handleGenerate} className="flex gap-4 max-w-2xl mx-auto">
                    <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. A feedback form for my coffee shop with rating and comments..."
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !prompt.trim()}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate
                            </>
                        )}
                    </Button>
                </form>

                {schema && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                        <FormPreview schema={schema} />
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={async () => {
                                    if (!schema) return;
                                    try {
                                        const res = await fetch("/api/forms", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(schema),
                                        });
                                        const data = await res.json();
                                        if (data.success) {
                                            alert(`Form published! Share URL: ${window.location.origin}/f/${data.slug}`);
                                        }
                                    } catch (err) {
                                        alert("Failed to publish form");
                                    }
                                }}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Publish Form
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
