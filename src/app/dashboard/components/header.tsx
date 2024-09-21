"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loja } from "prisma/generated/client";
import MenuSideBar from "./menu-sidebar";

export default function Header() {
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

        if (Array.isArray(storesData) && storesData.length > 0) {
          setStores(storesData);
          setStoreName(storesData[0]?.nome || "Minha Loja");
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

  return (
    <header className="sticky  px-4 md:px-10 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background md:static md:h-auto md:border-0 md:bg-transparent">
      <MenuSideBar />

      <Select onValueChange={(value) => setStoreName(value)}>
        <SelectTrigger
          id="store"
          aria-label="Select store"
          className="w-full md:max-w-56"
        >
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
