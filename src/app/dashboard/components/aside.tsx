"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/icons/icon-component";

export default function Aside() {
  const links = [
    { name: "Produtos", icon: Icon.package, href: "/dashboard/products" },
    { name: "Pedidos", icon: Icon.cart, href: "/dashboard/orders" },
    {
      name: "Analíticos",
      icon: Icon.lineChart,
      href: "/dashboard/analytics",
    },
    {
      name: "Configurações",
      icon: Icon.settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex mt-[72px]">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Icon.package2 className="group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {links.map((link) => (
          <AsideToolTip
            key={link.name}
            name={link.name}
            icon={link.icon}
            href={link.href}
          />
        ))}
      </nav>
    </aside>
  );
}

interface Props {
  name: string;
  icon: React.ElementType; // Recebe um componente de ícone
  href: string;
}

export function AsideToolTip({ name, href, icon: IconComponent }: Props) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(href);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground hover:bg-accent md:h-8 md:w-8 ${
              isActive ? "bg-accent" : ""
            }`}
          >
            <IconComponent className="h-5 w-5 text-foreground" />
            <span className="sr-only">{name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
