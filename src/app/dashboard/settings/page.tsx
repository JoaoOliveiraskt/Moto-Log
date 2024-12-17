"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Loja {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
}

export default function EditStore() {
  const [selectedStore, setSelectedStore] = useState<Loja | null>(null);
  const [stores, setStores] = useState<Loja[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

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
        const storesData: Loja[] = await response.json();

        setStores(storesData);
        if (storesData.length > 0) {
          setSelectedStoreId(storesData[0]?.id);
          setSelectedStore(storesData[0]);
        }
      } catch (error) {
        throw new Error("Erro ao buscar lojas");
      }
    }

    fetchStores();
  }, []);

  useEffect(() => {
    async function fetchStoreDetails(storeId: string) {
      try {
        const response = await fetch(`/api/get-store/${storeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar detalhes da loja");
        const storeData: Loja = await response.json();
        setSelectedStore(storeData);
      } catch (error) {
        throw new Error("Erro ao buscar detalhes da loja");
      }
    }

    if (selectedStoreId) {
      fetchStoreDetails(selectedStoreId);
    }
  }, [selectedStoreId]);

  return (
    <main className="flex flex-col space-y-10 mt-4">
      {selectedStore && (
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader className="px-6 mt-6 space-y-2 mb-5">
            <CardTitle className="text-3xl">Atualize sua loja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  className="max-w-xl"
                  defaultValue={selectedStore.nome}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  defaultValue={selectedStore.descricao}
                  className="min-h-32 max-w-xl"
                />
              </div>
            </div>

            <div className="grid gap-3 relative h-fit mt-6">
              <p>Imagem de banner</p>
              <Label
                htmlFor="storeImage"
                className="flex items-center justify-center max-w-xl h-20 border border-dashed rounded-md cursor-pointer"
              >
                <span className="sr-only">Adicionar imagem de banner</span>
                <Input
                  id="storeImage"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <Image
                  alt="Preview"
                  width={200}
                  height={100}
                  className="w-full h-full object-cover rounded-md"
                  src={selectedStore.imagemUrl || "/placeholder-image.png"}
                />

                <div className="flex items-center justify-center w-full h-full">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
              </Label>
            </div>
            <Button className="mt-6">Atualizar</Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

interface StoreSelectProps {
  stores: Loja[];
  onStoreChange: (store: Loja) => void;
}

function StoreSelect({ stores, onStoreChange }: StoreSelectProps) {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const storeId = e.target.value;
    const selectedStore = stores.find((store) => store.id === storeId);
    if (selectedStore) {
      setSelectedStoreId(storeId);
      onStoreChange(selectedStore);
    }
  };

  return (
    <div className="mb-4">
      <Label htmlFor="storeSelect">Selecione sua loja</Label>
      <select
        id="storeSelect"
        className="block w-full mt-1 border border-gray-300 rounded-md"
        value={selectedStoreId || ""}
        onChange={handleChange}
      >
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
