"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./icons/icon-component";
import { cn } from "@/lib/utils";
import MotoLogLogo from "./icons/moto-log-logo";
import TypographyH4 from "./typography/typography-h4";

interface Props {
  className?: string;
  name?: string;
  containerClassName?: string;
}

// Objeto de tradução de rotas
const routeTranslations: Record<string, string> = {
  "/best-sellers": "Em alta",
  "/cart": "Meu carrinho",
  "/category": "Categoria",
  "/community": "Comunidade",
  "/create-store": "Criar loja",
  "/dashboard/analytics": "Analíticos",
  "/dashboard/orders": "Pedidos",
  "/dashboard/products": "Meus produtos",
  "/dashboard/settings": "Configurações",
  "/discount": "Melhores ofertas",
  "/my-orders": "Meus pedidos",
  "/product": " ",
  "/recent-products": "Mais recentes",
  "/store": "Loja",
  "/welcome-create-store": " ",
};

const GoBackButton: React.FC<Props> = ({
  className,
  name,
  containerClassName,
}: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const isHome = pathName === "/";

  const routeName = name || routeTranslations[pathName] || " ";

  const handleGoBack = () => router.back();

  return (
    <>
      {isHome ? (
        <MotoLogLogo />
      ) : (
        <div
          className={cn(
            "flex items-center justify-between gap-4 w-full",
            containerClassName
          )}
        >
          <div className="flex items-center gap-x-4">
            <Button
              onClick={handleGoBack}
              className={`flex items-center rounded-full lg:p-1 lg:border lg:bg-card ${className}`}
              size="icon"
              variant="ghost"
              title="Voltar"
            >
              <Icon.arrowLeft size={16} />
            </Button>

            {routeName && (
              <TypographyH4 className="text-foreground">
                {routeName}
              </TypographyH4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GoBackButton;
