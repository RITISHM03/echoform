import Link from "next/link";
import connectToDatabase from "@/lib/mongoose";
import Form from "@/models/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye, MessageSquare, ExternalLink } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    await connectToDatabase();

    // Fetch forms for THIS user
    const forms = await Form.find({ userId: (session.user as any).id })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Your Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Manage your forms and view responses.</p>
                    </div>
                    <Link href="/create">
                        <Button className="bg-white text-black hover:bg-white/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Form
                        </Button>
                    </Link>
                </div>

                {forms.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-zinc-900/50">
                        <h2 className="text-xl font-semibold mb-2">No forms yet</h2>
                        <p className="text-muted-foreground mb-6">Create your first AI-generated form to get started.</p>
                        <Link href="/create">
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Create Form
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {forms.map((form) => {
                            const serializedId = form._id.toString();
                            return (
                                <Card key={serializedId} className="bg-zinc-900 border-white/10 text-white flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="truncate" title={form.title}>{form.title}</CardTitle>
                                        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                                            {form.description || "No description provided."}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                                            <div className="flex items-center">
                                                <Eye className="mr-1 h-4 w-4" />
                                                <span>{form.visits} views</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MessageSquare className="mr-1 h-4 w-4" />
                                                <span>{form.submissions} responses</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex gap-2 pt-4 border-t border-white/10">
                                        <Link href={`/dashboard/forms/${serializedId}`} className="flex-1 w-full">
                                            <Button variant="secondary" className="w-full justify-center bg-white/10 hover:bg-white/20 text-white border-0">
                                                View Responses
                                            </Button>
                                        </Link>
                                        {/* Use FULL URL for public link */}
                                        <Link href={`/f/${form.slug}`} target="_blank" className="flex-none">
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10" title="Open Public Form">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
