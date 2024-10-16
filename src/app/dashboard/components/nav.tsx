// Header.tsx
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
import StoreSelect from "./store-select";
import MotoLogLogo from "@/components/icons/moto-log-logo";
import Container from "@/components/container";

const links = [
  { name: "Produtos", icon: Icon.package, href: "/dashboard/products" },
  { name: "Pedidos", icon: Icon.cart, href: "/dashboard/orders" },
  { name: "Analíticos", icon: Icon.lineChart, href: "/dashboard/analytics" },
  { name: "Configurações", icon: Icon.settings, href: "/dashboard/settings" },
];

export default function Nav() {
  const pathName = usePathname();

  return (
    <header className="sticky top-0 z-10 lg:flex items-center w-full py-4 border-b mt-[60px] hidden">
      <Container className="w-full flex gap-4 px-0">
        <StoreSelect onStoreChange={() => {}} />

        <nav className="flex items-center space-x-4">
          {links.map((link) => {
            const isActive = pathName.startsWith(link.href);
            return (
              <TooltipProvider key={link.name} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className={`${
                      isActive
                        ? "border-b border-foreground rounded-none !text-foreground"
                        : ""
                    }`}
                  >
                    <Link
                      href={link.href}
                      className={`text-muted-foreground flex items-center px-4 py-1.5 transition-colors hover:text-foreground`}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="ml-2 text-sm font-semibold">{link.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{link.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
