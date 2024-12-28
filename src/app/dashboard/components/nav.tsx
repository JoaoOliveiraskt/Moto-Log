"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Icon from "@/components/icons/icon-component";
import StoreSelect from "./store-select";
import { cn } from "@/lib/utils";

const links = [
  { name: "Produtos", icon: Icon.package, href: "/dashboard/products" },
  { name: "Pedidos", icon: Icon.cart, href: "/dashboard/orders" },
  { name: "Analíticos", icon: Icon.analytics, href: "/dashboard/analytics" },
  {
    name: "Personalização",
    icon: Icon.personalization,
    href: "/dashboard/settings",
  },
];

interface Props {
  className?: string;
}

export default function NavDashboard({ className }: Props) {
  const pathName = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-10 lg:flex hidden items-center w-full py-4",
        className
      )}
    >
      <div className="w-full flex gap-x-8 px-0 md:px-0">
        <StoreSelect onStoreChange={() => {}} />

        <nav className="flex items-center space-x-4">
          {links.map((link) => {
            const isActive = pathName.startsWith(link.href);
            return (
              <Link
                key={link.href}
                className={cn(
                  "text-muted-foreground flex items-center px-4 py-1.5 transition-colors hover:text-foreground pb-2",
                  isActive
                    ? "border-b border-foreground rounded-none !text-foreground"
                    : ""
                )}
                href={link.href}
              >
                <link.icon size={20} />
                <span className="ml-2 text-sm font-semibold">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
