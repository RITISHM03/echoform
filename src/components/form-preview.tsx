import { FormSchema } from "@/lib/llm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FormPreviewProps {
    schema: FormSchema;
}

export function FormPreview({ schema }: FormPreviewProps) {
    return (
        <Card className="w-full max-w-2xl mx-auto bg-white text-black">
            <CardHeader>
                <CardTitle>{schema.title}</CardTitle>
                <CardDescription>{schema.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {schema.fields.map((field, index) => (
                    <div key={index} className="space-y-2">
                        <Label>
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>

                        {field.type === "text" && (
                            <Input placeholder={field.placeholder} />
                        )}

                        {field.type === "email" && (
                            <Input type="email" placeholder={field.placeholder} />
                        )}

                        {field.type === "number" && (
                            <Input type="number" placeholder={field.placeholder} />
                        )}

                        {field.type === "textarea" && (
                            <Textarea placeholder={field.placeholder} />
                        )}

                        {field.type === "select" && (
                            <Select>
                                <SelectTrigger>
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
                        )}

                        {field.type === "checkbox" && (
                            <div className="flex flex-col gap-2">
                                {field.options?.map((opt) => (
                                    <div key={opt} className="flex items-center space-x-2">
                                        <Checkbox id={`${index}-${opt}`} />
                                        <label
                                            htmlFor={`${index}-${opt}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {opt}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {field.type === "radio" && (
                            <RadioGroup>
                                {field.options?.map((opt) => (
                                    <div key={opt} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt} id={`${index}-${opt}`} />
                                        <Label htmlFor={`${index}-${opt}`}>{opt}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    </div>
                ))}

                <div className="pt-4 flex justify-end">
                    <Button onClick={() => alert("This is a preview. Publish the form to test submission!")}>
                        Submit (Preview)
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
