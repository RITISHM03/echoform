"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface FormField {
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
    options?: string[];
}

interface FormRendererProps {
    formId: string;
    fields: FormField[];
}

export function FormRenderer({ formId, fields }: FormRendererProps) {
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting form with data:", { formId, answers });
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formId, content: answers }),
            });
            console.log("Submission response status:", res.status, res.statusText);

            if (!res.ok) {
                let errorData;
                try {
                    errorData = await res.json();
                } catch (e) {
                    errorData = { raw: "Could not parse JSON response" };
                }
                console.error("Submission error details:", JSON.stringify(errorData, null, 2));
                throw new Error(errorData.details || "Failed to submit form");
            }
            setIsSubmitted(true);
        } catch (error) {
            console.error("Submission error catch:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (label: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [label]: value }));
    };

    if (isSubmitted) {
        return (
            <div className="text-center space-y-4 p-8 bg-green-50/10 rounded-lg border border-green-500/20">
                <h2 className="text-2xl font-bold text-green-500">Thank You!</h2>
                <p className="text-gray-400">Your response has been recorded.</p>
                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                >
                    Submit another response
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, idx) => (
                <div key={idx} className="space-y-2">
                    <Label className="text-base">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>

                    {field.type === "text" || field.type === "email" || field.type === "number" ? (
                        <Input
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            onChange={(e) => handleInputChange(field.label, e.target.value)}
                            className="bg-white/5 border-white/10"
                        />
                    ) : field.type === "textarea" ? (
                        <Textarea
                            required={field.required}
                            placeholder={field.placeholder}
                            onChange={(e) => handleInputChange(field.label, e.target.value)}
                            className="bg-white/5 border-white/10"
                        />
                    ) : field.type === "select" ? (
                        <Select onValueChange={(val) => handleInputChange(field.label, val)} required={field.required}>
                            <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : field.type === "radio" ? (
                        <RadioGroup onValueChange={(val) => handleInputChange(field.label, val)} required={field.required}>
                            {field.options?.map((opt) => (
                                <div key={opt} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt} id={`${field.label}-${opt}`} />
                                    <Label htmlFor={`${field.label}-${opt}`}>{opt}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    ) : field.type === "checkbox" ? (
                        <div className="space-y-2">
                            {field.options ? (
                                field.options.map((opt) => (
                                    <div key={opt} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`${field.label}-${opt}`}
                                            onCheckedChange={(checked) => {
                                                const current = answers[field.label] || [];
                                                const updated = checked
                                                    ? [...current, opt]
                                                    : current.filter((v: string) => v !== opt);
                                                handleInputChange(field.label, updated);
                                            }}
                                        />
                                        <Label htmlFor={`${field.label}-${opt}`}>{opt}</Label>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={field.label}
                                        required={field.required}
                                        onCheckedChange={(checked) => handleInputChange(field.label, checked)}
                                    />
                                    <Label htmlFor={field.label}>{field.label}</Label>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            ))}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    );
}
