// app/dashboard/products/edit-product/[id]/edit-product-form.tsx
"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ModalConfirmation from "@/app/dashboard/add-product/components/modal-confirmation";
import { useSubmitState } from "@/hooks/use-submit-state";
import ProductCategory from "@/app/dashboard/add-product/components/product-category";
import ProductDetails from "@/app/dashboard/add-product/components/product-details";
import ProductStatus from "@/app/dashboard/add-product/components/product-status";
import ProductFormActionButtons from "@/app/dashboard/add-product/components/save-product";
import Stock from "@/app/dashboard/add-product/components/stock";
import Image from "next/image";

interface ProductData {
  nome: string;
  descricao?: string;
  preco: number;
  descontoPercentual?: number;
  estoque: number;
  categoriaId: string;
  status: string;
  imagemUrl: string;
  cor: string;
  tamanho: string;
}

export default function EditProductForm({ dadosIniciais }: { dadosIniciais: any }) {
  const router = useRouter();
  const methods = useForm<ProductData>({
    defaultValues: {
      nome: dadosIniciais.nome,
      descricao: dadosIniciais.descricao,
      preco: dadosIniciais.preco,
      descontoPercentual: dadosIniciais.descontoPercentual,
      estoque: dadosIniciais.estoque,
      categoriaId: dadosIniciais.categoriaId,
      status: dadosIniciais.status,
      imagemUrl: dadosIniciais.imagemUrl,
      cor: dadosIniciais.cor,
      tamanho: dadosIniciais.tamanho
    }
  });
  
  const { isLoading, isSuccessful, startLoading, stopLoading, setSuccess } =
    useSubmitState();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: ProductData) => {
    startLoading();
    setErrorMessage("");

    try {
      const formattedData = {
        ...data,
        preco: parseFloat(data.preco as unknown as string),
        estoque: parseInt(data.estoque as unknown as string, 10),
        descontoPercentual: parseFloat(
          data.descontoPercentual as unknown as string
        ),
      };

      const response = await fetch(`/api/products/${dadosIniciais.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro da API:", errorData);
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccess(true);
      
      setIsConfirmDialogOpen(true);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar produto. Tente novamente.";
      setErrorMessage(errorMsg);

      setSuccess(false);
    } finally {
      stopLoading();
    }
  };

  return (
    <main className="grid flex-1 items-center justify-center gap-4 p-4 md:gap-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetails isEditing={true} />
              <Stock />
              <ProductCategory />
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ProductStatus />
              <Card className="overflow-hidden">
                <CardHeader className="px-6 mt-6 space-y-2 mb-5">
                  <CardTitle>Imagem do Produto</CardTitle>
                  <CardDescription>
                    Atualize a imagem do produto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    placeholder="URL da imagem"
                    {...methods.register("imagemUrl", { required: true })}
                  />
                  {dadosIniciais.imagemUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Imagem atual:</p>
                      <Image
                        src={dadosIniciais.imagemUrl} 
                        alt="Imagem atual do produto"
                        className="w-full h-32 object-cover rounded-md"
                        width={400}
                        height={400}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              <ProductFormActionButtons 
                isLoading={isLoading} 
                onDiscard={() => {
                  methods.reset(dadosIniciais);

                }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              variant="outline"
            
              type="button"
              onClick={() => {
                methods.reset(dadosIniciais);
              }}
            >
              Descartar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-28"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </div>
          
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </form>
      </FormProvider>

      <ModalConfirmation
        isConfirmDialogOpen={isConfirmDialogOpen}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
      />
    </main>
  );
}