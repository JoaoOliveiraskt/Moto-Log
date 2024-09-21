"use client";

import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Icon from "@/components/icons/icon-component";

export default function MenuSideBar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetOpen = {
    open: () => setIsSheetOpen(true),
    close: () => setIsSheetOpen(false),
  };

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
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="md:max-w-xs">
        <nav className="grid text-lg font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={handleSheetOpen.close}
              className={`flex px-4 py-4 gap-4 h-9 w-9 items-center rounded-lg transition-colors hover:text-foreground hover:bg-accent md:h-8 md:w-full`}
            >
              <link.icon className="h-5 w-5 text-primary-foreground" />
              <span className="">{link.name}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
