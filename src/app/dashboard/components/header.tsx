"use client";

import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loja } from "prisma/generated/client";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [storeName, setStoreName] = useState<string>("Minha Loja");
  const [stores, setStores] = useState<Loja[]>([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch("/api/get-user-store", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar lojas");
        const storesData = await response.json();

        // Verifica se `storesData` é um array e atualiza o estado corretamente
        if (Array.isArray(storesData) && storesData.length > 0) {
          setStores(storesData);
          setStoreName(storesData[0]?.nome || "Minha Loja"); // Define o nome da primeira loja como padrão
        } else {
          setStoreName("Minha Loja");
        }
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
        setStoreName("Minha Loja");
      }
    }

    fetchStores();
  }, []);
  const handleSheetOpen = {
    open: () => setIsSheetOpen(true),
    close: () => setIsSheetOpen(false),
  };

  return (
    <header className="sticky  px-4 md:px-10 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background md:static md:h-auto md:border-0 md:bg-transparent">

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              onClick={handleSheetOpen.close}
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/store/dashboard/settings"
              onClick={handleSheetOpen.close}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/store/dashboard/orders"
              onClick={handleSheetOpen.close}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Pedidos
            </Link>
            <Link
              href="/store/dashboard/products"
              onClick={handleSheetOpen.close}
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <Package className="h-5 w-5" />
              Produtos
            </Link>
            <Link
              href="/store/dashboard/settings"
              onClick={handleSheetOpen.close}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Configurações
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

   <Select onValueChange={(value) => setStoreName(value)}>
        <SelectTrigger id="store" aria-label="Select store" className="w-full md:max-w-56">
          <SelectValue placeholder={storeName} />
        </SelectTrigger>
        <SelectContent>
          {stores.map((store) => (
            <SelectItem key={store.id} value={store.nome}>
              {store.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

    </header>
  );
}
