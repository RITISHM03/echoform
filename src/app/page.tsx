"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/nav-bar";
import { FeatureCard } from "@/components/feature-card";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HowItWorksCard } from "@/components/how-it-works-card";
import { StepCard } from "@/components/step-card";
import { CTASection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import {
    ArrowRight,
    Sparkles,
    Settings,
    QrCode,
    BarChart3,
    Mail,
    FileSpreadsheet,
    MessageSquare,
    Zap,
    Share2,
    LineChart
} from "lucide-react";

export default function Home() {
    const features = [
        {
            title: "AI-Powered Form Generation",
            description: "Create any form instantly with a single prompt. No manual setup—just describe your needs, and EchoForms builds it for you.",
            icon: Sparkles
        },
        {
            title: "Customize Your Forms",
            description: "Modify fields, apply validations, and adjust form settings effortlessly with an intuitive UI.",
            icon: Settings
        },
        {
            title: "Generate & Share QR Codes",
            description: "Get a unique shareable link or QR code for every form, making it easy to distribute and collect responses.",
            icon: QrCode
        },
        {
            title: "Real-Time Response Tracking",
            description: "Monitor submissions as they happen with detailed analytics, ensuring you stay updated on user responses.",
            icon: BarChart3
        },
        {
            title: "Instant Email Alerts",
            description: "Receive immediate email notifications on new submissions with customizable templates.",
            icon: Mail
        },
        {
            title: "Seamless Data Export",
            description: "Export responses as CSV for analysis or integrate with other tools using webhooks.",
            icon: FileSpreadsheet
        }
    ];

    const steps = [
        {
            step: "Step 1",
            title: "Describe Your Form",
            description: "Simply type what kind of form you need—whether it's a survey, registration form, or feedback form. EchoForms instantly understands your needs.",
            icon: MessageSquare
        },
        {
            step: "Step 2",
            title: "AI Generates It",
            description: "Our powerful AI builds a fully functional form in seconds, structured exactly as you described—no coding or drag-and-drop required.",
            icon: Zap
        },
        {
            step: "Step 3",
            title: "Get a Shareable QR Code",
            description: "Every form gets a unique link and a QR code, making it easier to share and collect responses anywhere.",
            icon: Share2
        },
        {
            step: "Step 4",
            title: "Analyze Responses",
            description: "Track submissions in real time with our clean dashboard. Export data as CSV for reporting and analysis.",
            icon: LineChart
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-black text-white selection:bg-primary selection:text-white">
            <NavBar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-10 overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl">
                            <Sparkles className="mr-2 h-4 w-4" />
                            AI-Powered Form Generation
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2">
                            Generate Forms Instantly. <br />
                            No Code. Just Magic.
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            No more dragging fields, no more templates—just describe the form you need, and EchoForms will create it in seconds.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/create">
                                <Button size="lg" className="h-12 px-8 text-base">
                                    Try it now ! <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
                                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                How it works ?
                            </Button>
                        </div>
                    </div>

                    <ScrollIndicator />
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-4 bg-black/50 relative">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                Features That Matter !
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Everything you need to build, share, and analyze forms without writing a single line of code.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    title={feature.title}
                                    description={feature.description}
                                    icon={feature.icon}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-24 px-4 relative">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Large Card */}
                            <div className="lg:col-span-1 h-full">
                                <div className="sticky top-24 h-[calc(100vh-8rem)] min-h-[400px]">
                                    <HowItWorksCard />
                                </div>
                            </div>

                            {/* Right Column - Steps */}
                            <div className="lg:col-span-2 space-y-6">
                                {steps.map((step, index) => (
                                    <StepCard
                                        key={index}
                                        step={step.step}
                                        title={step.title}
                                        description={step.description}
                                        icon={step.icon}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection />
            </main>

            <SiteFooter />
        </div>
    );
}
