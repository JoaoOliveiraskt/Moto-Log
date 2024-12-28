"use client";

import TypographyH4 from "@/components/typography/typography-h4";
import TypographyP from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    <main>
      {selectedStore && (
        <div className="max-w-4xl">
          <TypographyH4 className="mb-8">Personalização da loja</TypographyH4>

          <form className="grid gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-8">
              <div className="grid gap-4">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  className=""
                  defaultValue={selectedStore.nome}
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  defaultValue={selectedStore.descricao}
                  className="min-h-32"
                />
              </div>
            </div>

            <div className="grid gap-8">
              {/* Imagem de banner */}
              <div className="grid gap-4 relative h-fit">
                <Label htmlFor="storeImage">Imagem de banner</Label>
                <div className="flex flex-wrap gap-4">
                  <Image
                    alt="Preview Banner"
                    width={200}
                    height={100}
                    className="w-full max-w-72 h-44 object-cover rounded-md"
                    src={selectedStore.imagemUrl || "/placeholder-image.png"}
                  />
                  <div className="flex flex-col gap-y-4">
                    <TypographyP className="text-muted-foreground text-sm max-w-xs">
                      Para garantir os melhores resultados em todos os
                      dispositivos, escolha uma imagem de até 6 MB com pelo
                      menos 2.048 x 1.152 pixels.
                    </TypographyP>
                    <div className="h-fit w-fit">
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => console.log(e.target.files)}
                      />
                      <Button
                        type="button"
                        variant={"secondary"}
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagem de perfil */}
              <div className="grid gap-4 relative h-fit">
                <Label htmlFor="profileImage">Imagem de perfil</Label>

                <div className="flex flex-wrap gap-4">
                  <div className="w-full max-w-72 h-44 bg-accent rounded-md flex items-center justify-center py-4">
                    <Image
                      alt="Preview Perfil"
                      width={200}
                      height={100}
                      className="w-36 h-full object-cover rounded-full"
                      src={selectedStore.imagemUrl || "/placeholder-image.png"}
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <TypographyP className="text-muted-foreground text-sm max-w-xs">
                      Recomendamos usar uma imagem de até 4 MB com pelo menos 98
                      x 98 pixels. Use um arquivo no formato PNG ou GIF (sem
                      animações). E não se esqueça: as imagens precisam seguir
                      as diretrizes da comunidade do Moto Log.
                    </TypographyP>
                    <div className="h-fit w-fit">
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => console.log(e.target.files)}
                      />
                      <Button
                        type="button"
                        variant={"secondary"}
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-fit">Atualizar</Button>
          </form>
        </div>
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
