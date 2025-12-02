import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StepCardProps {
    step: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export function StepCard({ step, title, description, icon: Icon }: StepCardProps) {
    return (
        <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors duration-300 group" tabIndex={0}>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="mt-1 h-10 w-10 shrink-0 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {step}
                    </p>
                    <CardTitle className="text-lg font-semibold leading-tight">
                        {title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pl-[4.5rem]">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
