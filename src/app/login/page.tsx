"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: "/dashboard" });
        } catch (error) {
            console.error("Login failed:", error);
            setIsLoading(false);
        }
    };

    if (status === "loading" || status === "authenticated") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-sm space-y-8 text-center">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-gray-400">Sign in to manage your forms</p>
                </div>

                <div className="space-y-4 pt-4">
                    <Button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full h-12 bg-white text-black hover:bg-gray-200 font-medium text-base"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                        )}
                        Continue with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
