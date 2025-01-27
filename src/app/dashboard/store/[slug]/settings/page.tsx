"use client";

import TypographyH4 from "@/components/typography/typography-h4";
import TypographyP from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/hooks/use-store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import StoreSettingsSkeleton from "./components/settings-skeleton";

interface Loja {
  id: string;
  nome: string;
  descricao: string;
  imagemUrl: string;
  userId: string;
}

const fetchStoreData = async (storeId: string): Promise<Loja> => {
  try {
    const response = await fetch(`/api/store/${storeId}/personalization`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch store data");
    }

    const data = await response.json();
    return data.store;
  } catch (error) {
    throw new Error("Failed to fetch store data");
  }
};

export default function EditStore() {
  const { data: storeData } = useStore();
  const storeId = storeData?.id;

  const {
    data: store,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => fetchStoreData(storeId!),
    enabled: !!storeId,
  });

  if (isLoading) return <StoreSettingsSkeleton />;
  if (error) return <div>Erro ao carregar loja</div>;

  return (
    <main>
      <div className="max-w-4xl mt-4">
        <TypographyH4 className="mb-8">Personalização da loja</TypographyH4>

        <form className="grid gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-8">
            <div className="grid gap-4">
              <Label htmlFor="name">Nome {store?.nome}</Label>
              <Input
                id="name"
                type="text"
                className=""
                defaultValue={store?.nome}
                placeholder={store?.nome}
              />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                defaultValue={store?.descricao}
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
                  src={store?.imagemUrl || "/placeholder-image.png"}
                />
                <div className="flex flex-col gap-y-4">
                  <TypographyP className="text-muted-foreground text-sm max-w-xs">
                    Para garantir os melhores resultados em todos os
                    dispositivos, escolha uma imagem de até 6 MB com pelo menos
                    2.048 x 1.152 pixels.
                  </TypographyP>
                  <div className="h-fit w-fit">
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
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
                    src={store?.imagemUrl || "/placeholder-image.png"}
                  />
                </div>
                <div className="flex flex-col gap-y-4">
                  <TypographyP className="text-muted-foreground text-sm max-w-xs">
                    Recomendamos usar uma imagem de até 4 MB com pelo menos 98 x
                    98 pixels. Use um arquivo no formato PNG ou GIF (sem
                    animações). E não se esqueça: as imagens precisam seguir as
                    diretrizes da comunidade do Moto Log.
                  </TypographyP>
                  <div className="h-fit w-fit">
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
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
    </main>
  );
}
