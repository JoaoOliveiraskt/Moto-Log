import Icon from "@/components/icons/icon-component";
import TypographyH2 from "@/components/typography/typography-h2";
import TypographyP from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotificationsPage() {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background relative flex flex-col items-center justify-center">
            {/* Ambient Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10 opacity-30 pointer-events-none" />

            <div className="flex flex-col items-center justify-center text-center space-y-8 relative z-10 px-4">

                {/* Icon Container with Glassmorphism */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
                    <div className="w-32 h-32 rounded-full bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center relative z-10 ring-1 ring-white/20">
                        <Icon.notification className="text-primary drop-shadow-sm" size={56} />
                    </div>

                    {/* Floating Badge Animation */}
                    <div className="absolute top-0 right-2 z-20 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-bounce delay-700">
                        1
                    </div>
                </div>

                <div className="space-y-4 max-w-lg mx-auto">
                    <TypographyH2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                        Novidades em breve
                    </TypographyH2>
                    <TypographyP className="text-lg text-muted-foreground leading-relaxed">
                        Estamos construindo uma central de notificações inteligente.
                        <br className="hidden sm:block" />
                        Você será o primeiro a saber sobre atualizações dos seus pedidos e ofertas exclusivas.
                    </TypographyP>
                </div>

                <div className="w-full max-w-xs">
                    <Button asChild size="lg" className="w-full rounded-full h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                        <Link href="/">
                            Explorar Loja
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
