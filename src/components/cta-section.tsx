import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section id="get-started" className="py-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-8">
                <p className="text-sm font-bold tracking-widest text-primary uppercase">
                    Let&apos;s Get Started!
                </p>

                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                    Effortless Form Building
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Create AI-powered forms in seconds, share instantly, and collect responses effortlessly.
                </p>

                <div className="pt-4">
                    <Link href="/create">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full group">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
