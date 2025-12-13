import { notFound } from "next/navigation";
import Link from "next/link";
import connectToDatabase from "@/lib/mongoose";
import Form from "@/models/Form";
import FormResponse from "@/models/Response";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const dynamic = 'force-dynamic';

export default async function FormDetailsPage({ params }: PageProps) {
    await connectToDatabase();
    const { id } = await params;

    const form = await Form.findById(id).lean();
    if (!form) notFound();

    const responses = await FormResponse.find({ formId: id })
        .sort({ createdAt: -1 })
        .lean();

    // Get all unique headers from all responses (in case schema changed)
    const allHeaders = new Set<string>();
    responses.forEach(r => {
        Object.keys(r.content || {}).forEach(k => allHeaders.add(k));
    });
    const headers = Array.from(allHeaders);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between border-b border-white/10 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold">{form.title}</h1>
                            <p className="text-muted-foreground mt-1">
                                {responses.length} {responses.length === 1 ? 'response' : 'responses'} collected
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/f/${form.slug}`} target="_blank">
                                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Live Form
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Responses Table */}
                <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/50">
                    {responses.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-xl font-semibold mb-2">No responses yet</h2>
                            <p className="text-muted-foreground">Share your form to start collecting feedback!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase bg-zinc-900/80 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 font-medium whitespace-nowrap">Submitted At</th>
                                        {headers.map(header => (
                                            <th key={header} className="px-6 py-4 font-medium whitespace-nowrap">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {responses.map((response) => (
                                        <tr key={response._id.toString()} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                                {new Date(response.createdAt).toLocaleString()}
                                            </td>
                                            {headers.map(header => (
                                                <td key={header} className="px-6 py-4 min-w-[200px]">
                                                    {typeof response.content[header] === 'object'
                                                        ? JSON.stringify(response.content[header])
                                                        : String(response.content[header] ?? '-')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
