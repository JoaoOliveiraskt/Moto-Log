"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useSubmitState } from "@/hooks/use-submit-state";
import ProductDetails from "./components/product-details";
import Stock from "./components/stock";
import ProductCategory from "./components/product-category";
import ProductStatus from "./components/product-status";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ProductFormActionButtons from "./components/save-product";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/responsive-modal";
import Icon from "@/components/icons/icon-component";
import { ToastAction } from "@/components/ui/toast";

interface ProductData {
  nome: string;
  descricao?: string;
  preco: number;
  porcentagemDesconto?: number;
  estoque: number;
  categoriaId: string;
  status: string;
  imagemUrl: string;
}

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function AddProductDialog({
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const methods = useForm<ProductData>();
  const { isLoading, isSuccessful, startLoading, stopLoading, setSuccess } =
    useSubmitState();
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

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

      setSuccess(true);
      toast({
        duration: 3000,
        // @ts-ignore
        title: (
          <div className="flex items-center gap-x-2">
            <Icon.confirmed color="green" size={20} />
            <span>Produto adicionado com sucesso</span>
          </div>
        ),
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
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
    <ResponsiveModal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
      <ResponsiveModalContent className="h-full max-h-[70%] lg:min-w-[30%] pb-14 pt-0 pr-0 pl-0 overflow-hidden">
        <ResponsiveModalHeader className="flex flex-row items-center gap-x-4 pl-6">
          <ResponsiveModalTitle className="text-2xl">
            Adicionar produto
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ScrollArea className="max-h-[98%] overflow-hidden">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid px-6 w-full h-full flex-1 auto-rows-max gap-4 md:gap-4"
            >
              <div className="h-full grid auto-rows-max items-start gap-8 mb-2">
                <ProductDetails />
                <div className="grid gap-4">
                  <Label htmlFor="imagemUrl" className="text-sm">
                    Url da imagem
                  </Label>
                  <Input
                    id="imagemUrl"
                    className="h-14"
                    type="text"
                    placeholder="URL da imagem"
                    {...methods.register("imagemUrl", { required: true })}
                  />
                </div>
                <ProductCategory />
                <ProductStatus />
                <Stock />
              </div>

              <ResponsiveModalFooter className="fixed bottom-0 right-0 px-4 py-2 items-end h-fit w-full">
                <ProductFormActionButtons
                  isLoading={isLoading}
                />

                {errorMessage && (
                  <p className="text-red-500 text-center">{errorMessage}</p>
                )}
              </ResponsiveModalFooter>
            </form>
          </FormProvider>
          <ScrollBar orientation="vertical" className="-ml-2" />
        </ScrollArea>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
