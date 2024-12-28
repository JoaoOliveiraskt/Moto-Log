"use client";

import { Link } from "next-view-transitions";
import { PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Icon from "@/components/icons/icon-component";
import { Button } from "@/components/ui/button";

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
      icon: Icon.analytics,
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
        <Button size="iconShaped" variant="outline" className="lg:hidden">
          <PanelLeft size={20} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="md:max-w-screen-md">
        <nav className="grid text-lg font-medium space-y-4 mt-8">
          {links.map((link) => (
            <Button key={link.name} asChild variant="ghost" size="xl" className="w-full justify-start">
              <Link
                href={link.href}
                onClick={handleSheetOpen.close}
                className={`flex items-center gap-4`}
              >
                <link.icon className="h-6 w-6" />
                <span className="">{link.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
