"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useSubmitState } from "@/hooks/use-submit-state";
import ProductDetails from "./components/product-details";
import Stock from "./components/stock";
import ProductCategory from "./components/product-category";
import ProductStatus from "./components/product-status";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ModalConfirmation from "./components/modal-confirmation";
import ProductFormActionButtons from "./components/save-product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Balancer from "react-wrap-balancer";
import { Label } from "@/components/ui/label";
import MotoLogLogo from "@/components/icons/moto-log-logo";

interface ProductData {
  nome: string;
  descricao?: string;
  preco: number;
  porcentagemDesconto?: number;
  estoque: number;
  categoriId: string;
  status: string;
  imagemUrl: string;
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
        preco: parseFloat(data.preco as unknown as string),
        estoque: parseInt(data.estoque as unknown as string, 10),
        porcentagemDesconto: parseFloat(
          data.porcentagemDesconto as unknown as string
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
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccess(true);
      setIsConfirmDialogOpen(true);
    } catch (error) {
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
      <DialogContent className="h-full max-h-[70%] lg:min-w-[45%] pb-16 pt-0">
        <DialogHeader className="grid items-center justify-center space-y-0 p-0">
          <div className=" grid items-center justify-center">
            <MotoLogLogo disabled={true} />
          </div>
          <DialogTitle className="text-center">Adicionar produto</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[98%] overflow-hidden">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid w-full h-full flex-1 auto-rows-max gap-4 md:gap-4 lg:min-h-[calc(100vh-9.125rem)]"
            >
              <div className="h-full grid auto-rows-max items-start gap-4 lg:gap-8">
                <div className="grid gap-4 pl-1 pr-6 mt-8">
                  <Label htmlFor="imagemUrl">Url da imagem</Label>
                  <Input
                    type="text"
                    placeholder="URL da imagem"
                    {...methods.register("imagemUrl", { required: true })}
                  />
                </div>
                <ProductDetails />
                <ProductCategory />
                <ProductStatus />
                <Stock />
              </div>

              <DialogFooter className="mb-8 fixed -bottom-4">
                <ProductFormActionButtons
                  isLoading={isLoading}
                  onDiscard={() => methods.reset()}
                />

                {errorMessage && (
                  <p className="text-red-500 text-center">{errorMessage}</p>
                )}
              </DialogFooter>
            </form>
          </FormProvider>
          <ScrollBar orientation="vertical" className="-ml-2" />
        </ScrollArea>

        <ModalConfirmation
          isConfirmDialogOpen={isConfirmDialogOpen}
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
        >
          Produto adicionado com sucesso! 🎉
        </ModalConfirmation>
      </DialogContent>
    </Dialog>
  );
}
