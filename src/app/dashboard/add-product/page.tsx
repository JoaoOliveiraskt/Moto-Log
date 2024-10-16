"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useSubmitState } from "@/hooks/use-submit-state";
import ProductDetails from "./components/product-details";
import Stock from "./components/stock";
import ProductCategory from "./components/product-category";
import ProductStatus from "./components/product-status";
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
import { useState } from "react";
import ModalConfirmation from "./components/modal-confirmation";
import ProductFormActionButtons from "./components/save-product";
import Container from "@/components/container";
import GoBackButton from "@/components/go-back-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductData {
  name: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  categoryId: string;
  status: string;
  imageUrl: string;
  color: string;
  size: string;
}

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function AddProductPage({ isModalOpen, setIsModalOpen }: Props) {
  const methods = useForm<ProductData>();
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
        price: parseFloat(data.price as unknown as string),
        stock: parseInt(data.stock as unknown as string, 10),
        discountPercentage: parseFloat(
          data.discountPercentage as unknown as string
        ),
      };

      const response = await fetch("/api/create-product", {
        method: "POST",
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
      console.error("Erro ao salvar produto:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao salvar produto. Tente novamente.";
      setErrorMessage(errorMsg);
      setSuccess(false);
    } finally {
      stopLoading();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="h-full max-h-[85%]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes abaixo para adicionar um novo produto à sua
            loja.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[98%] overflow-hidden">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid w-full h-full flex-1 auto-rows-max gap-4 md:gap-4 lg:min-h-[calc(100vh-9.125rem)]"
            >
              <div className="h-full grid gap-4 lg:gap-5 justify-between">
                {/* Parte da esquerda com os detalhes do produto */}
                <div className="h-full grid auto-rows-max items-start gap-4 lg:gap-5">
                  <ProductDetails />
                  <Stock />
                </div>

                {/* Parte da direita com o status, imagem e botões */}
                <div className="h-full grid auto-rows-max items-start gap-4 lg:gap-5">
                  <Card className="overflow-hidden h-full">
                    <CardHeader className="px-6 mt-6 space-y-2 mb-5">
                      <CardTitle>Imagem do Produto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        type="text"
                        placeholder="URL da imagem"
                        {...methods.register("imageUrl", { required: true })}
                      />
                    </CardContent>
                  </Card>
                  <ProductCategory />
                  <ProductStatus />
                  <ProductFormActionButtons
                    isLoading={isLoading}
                    onDiscard={() => methods.reset()}
                  />
                </div>
              </div>

              <DialogFooter>
                {/* Botões para telas menores */}
                <div className="flex items-center justify-center gap-2 md:hidden h-full pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => methods.reset()}
                  >
                    Descartar
                  </Button>
                  <Button
                    size="sm"
                    type="submit"
                    disabled={isLoading}
                    className="min-w-28"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Salvar produto"
                    )}
                  </Button>
                </div>

                {/* Mensagem de erro */}
                {errorMessage && (
                  <p className="text-red-500 text-center">{errorMessage}</p>
                )}
              </DialogFooter>
            </form>
          </FormProvider>
          <ScrollBar orientation="vertical" className="-ml-2" />
        </ScrollArea>

        {/* Modal de confirmação */}
        <ModalConfirmation
          isConfirmDialogOpen={isConfirmDialogOpen}
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
