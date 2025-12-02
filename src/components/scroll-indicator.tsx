"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
    const scrollToFeatures = () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={scrollToFeatures}
            role="button"
            aria-label="Scroll to features"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    scrollToFeatures();
                }
            }}
        >
            <ChevronDown className="h-8 w-8 text-muted-foreground/50 hover:text-white transition-colors" />
        </div>
    );
}
