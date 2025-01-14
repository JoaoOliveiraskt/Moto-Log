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

        <nav className="flex items-center space-x-6">
          {links.map((link) => {
            const isActive = pathName.startsWith(link.href);
            return (
              <Link
                key={link.href}
                className={cn(
                  "text-muted-foreground h-9 flex items-center transition-colors pb-2 ",
                  isActive
                    ? "border-b border-sky-600 rounded-none !text-sky-600"
                    : "hover:text-sky-600 relative after:absolute after:bg-sky-600 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 "
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
