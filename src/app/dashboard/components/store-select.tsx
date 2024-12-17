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
import Image from "next/image";

interface StoreSelectProps {
  onStoreChange: (storeName: string) => void;
  hidden?: boolean;
}

export default function StoreSelect({
  onStoreChange,
  hidden,
}: StoreSelectProps) {
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
        setStoreName("Minha Loja");
      }
    }

    fetchStores();
  }, []);

  return (
    <div className="flex gap-4 items-center w-fit">
      <div className="rounded-sm overflow-hidden">
        {stores[0]?.imagemUrl ? (
          <Image
            src={stores[0].imagemUrl}
            alt="logo da loja"
            width={100}
            height={100}
            objectFit="cover"
            className="w-8 h-8 object-cover rounded-md"
          />
        ) : (
          <div className="w-8 h-8 rounded-md border bg-accent"></div>
        )}
      </div>
      {/*<Select
        onValueChange={(value) => {
          setStoreName(value);
          onStoreChange(value);
        }}
      >
        <SelectTrigger
          id="store"
          aria-label="Select store"
          className="w-full md:min-w-40 h-8 rounded-sm bg-background border"
        >
          <SelectValue placeholder={storeName} />
        </SelectTrigger>
        <SelectContent className="rounded-sm">
          {stores.map((store) => (
            <SelectItem key={store.id} value={store.nome}>
              {store.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>*/}
    </div>
  );
}
