import Link from "next/link";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="bg-black border-t border-white/10 py-12 px-4 text-sm">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        EchoForms
                    </Link>
                    <p className="text-muted-foreground">
                        © 2025 EchoForms Private Limited. <br />
                        All rights reserved.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">PAGES</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                        <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">LEGAL</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms and Conditions</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">CONNECT</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li>
                            <a href="https://github.com/RITISHM03/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/ritishm03/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/RITISHM3" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                Twitter
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
