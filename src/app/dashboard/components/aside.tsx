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
    <aside className="fixed inset-y-0  z-10 hidden w-fit flex-col border-r bg-background md:flex mt-[72px]">
      <nav className="flex flex-col gap-2 px-2 py-4">
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
            className={`flex px-4 py-5 gap-4 h-9 w-9 items-center rounded-lg transition-colors hover:text-foreground hover:bg-accent md:h-8 md:w-full ${
              isActive ? "bg-accent" : ""
            }`}
          >
            <IconComponent className="h-5 w-5 text-foreground" />
            <span className="">{name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
