"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

export function NavBar() {
    const { data: session, status } = useSession();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToFeatures = () => {
        const featuresSection = document.getElementById("features");
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-white/10 shadow-lg"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    EchoForms
                </Link>

                <div className="flex items-center gap-4">
                    {status === "authenticated" ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">
                                    Dashboard
                                </Button>
                            </Link>
                            <div className="flex items-center gap-2">
                                {/* Optional: Show user avatar if available */}
                                {session.user?.image && (
                                    <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full border border-white/10" />
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:text-red-400 hover:bg-white/10"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    title="Sign Out"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                            <Link href="/create">
                                <Button className="bg-white text-black hover:bg-white/90">
                                    Create Form
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                className="text-white hover:text-white/80 hover:bg-white/10 hidden sm:inline-flex"
                                onClick={scrollToFeatures}
                            >
                                How it works
                            </Button>
                            <Link href="/login">
                                <Button className="bg-white text-black hover:bg-white/90">
                                    Sign In
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
