import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "EchoForms",
    description: "AI-Powered Form Generator",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
