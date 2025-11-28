import Link from "next/link";
import Icon from "@/components/icons/icon-component";
import { Button } from "@/components/ui/button";
import TypographyH3 from "@/components/typography/typography-h3";
import TypographyP from "@/components/typography/typography-p";

export default function SearchEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-accent/50 rounded-full flex items-center justify-center">
                <Icon.search size={48} className="text-muted-foreground" />
            </div>
            <div className="space-y-2 max-w-md">
                <TypographyH3>Nenhum resultado encontrado</TypographyH3>
                <TypographyP className="text-muted-foreground">
                    Não encontramos nada com esse termo. Tente buscar por palavras-chave diferentes ou verifique a ortografia.
                </TypographyP>
            </div>
            <Button asChild>
                <Link href="/">Voltar para o início</Link>
            </Button>
        </div>
    );
}
