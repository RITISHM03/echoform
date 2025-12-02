import { cn } from "@/lib/utils";

export function HowItWorksCard() {
    return (
        <div className="h-full w-full min-h-[300px] rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white relative z-10">
                How it works
                <br />
                <span className="text-primary">?</span>
            </h2>
        </div>
    );
}
