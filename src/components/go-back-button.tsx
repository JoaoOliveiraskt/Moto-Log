"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./icons/icon-component";
import { cn } from "@/lib/utils";
import MotoLogLogo from "./icons/moto-log-logo";
import TypographyH4 from "./typography/typography-h4";
import useIsMobile from "@/hooks/use-is-mobile";

interface Props {
  className?: string;
  name?: string;
  containerClassName?: string;
  routeNameClassName?: string;
}

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
  "/favorites": "Favoritos",
  "/following": "Seguindo",
  "/search": "Pesquisar",
};

const GoBackButton: React.FC<Props> = ({
  className,
  name,
  containerClassName,
  routeNameClassName,
}: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const isHome = pathName === "/";
  const routeName = name || routeTranslations[pathName] || " ";
  const handleGoBack = () => router.back();
  const isMobile = useIsMobile();

  return (
    <>
      {isHome ? (
        <MotoLogLogo />
      ) : (
        <div className={cn("flex items-center", containerClassName)}>
          <Button
            onClick={handleGoBack}
            className={`flex items-center justify-start lg:justify-center hover:bg-transparent lg:hover:bg-accent
            rounded-full h-12 w-12 lg:w-fit lg:h-fit lg:p-1 lg:border lg:bg-card ${className}`}
            size="icon"
            variant="ghost"
            title="Voltar"
          >
            <Icon.arrowLeft size={isMobile ? 24 : 16} />
          </Button>

          {routeName && (
            <TypographyH4
              className={cn(
                "text-foreground font-extrabold",
                routeNameClassName
              )}
            >
              {routeName}
            </TypographyH4>
          )}
        </div>
      )}
    </>
  );
};

export default GoBackButton;
