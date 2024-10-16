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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { motion } from "framer-motion";
import StoreSelect from "./store-select";
import MotoLogLogo from "@/components/icons/moto-log-logo";

const asideAnimation = {
  expanded: { width: "16rem" }, // Expandido
  collapsed: { width: "4.5rem" }, // Recolhido
  transition: { duration: 0.3, ease: "easeInOut" }, // Transição suave
};

export default function Aside() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [storeName, setStoreName] = useState<string>("Minha Loja");
  const handleExpand = () => setIsExpanded((prev) => !prev);

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
    <>
      <motion.aside
        className={`inset-y-0 z-10 hidden sticky top-[80px] max-h-[calc(100vh-4rem)] ${
          isExpanded ? "w-64" : "w-max"
        } flex-col border-r border-t rounded-lg bg-background lg:flex mt-[72px] px-2 overflow-y-auto`}
        animate={
          isExpanded ? asideAnimation.expanded : asideAnimation.collapsed
        }
        transition={asideAnimation.transition}
        initial={asideAnimation.expanded}
      >
        <Button
          onClick={handleExpand}
          size="icon"
          variant="outline"
          className="place-self-end mt-2 mb-4"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        ></motion.div>

        <StoreSelect onStoreChange={setStoreName} hidden={isExpanded} />

        <nav className="flex flex-col gap-2 py-4">
          {links.map((link) => (
            <AsideToolTip
              expand={isExpanded}
              key={link.name}
              name={link.name}
              icon={link.icon}
              href={link.href}
            />
          ))}
        </nav>
      </motion.aside>
    </>
  );
}

interface Props {
  name: string;
  icon: React.ElementType;
  href: string;
  expand: boolean;
}

export function AsideToolTip({
  name,
  href,
  expand,
  icon: IconComponent,
}: Props) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(href);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`flex px-4 py-5 gap-4 h-9 w-9 items-center rounded-md transition-colors hover:text-foreground hover:bg-accent md:h-8 md:w-full ${
              isActive ? "bg-accent" : ""
            }`}
          >
            <div className="h-5 w-5 flex-shrink-0">
              <IconComponent className="h-5 w-5 text-foreground" />
            </div>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: expand ? 1 : 0,
                width: expand ? "auto" : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {name}
            </motion.span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
