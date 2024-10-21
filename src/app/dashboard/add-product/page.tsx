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
import Balancer from "react-wrap-balancer";
import { Label } from "@/components/ui/label";
import MotoLogLogo from "@/components/icons/moto-log-logo";

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
      <DialogContent className="h-full max-h-[85%] lg:min-w-[40%] pb-16">
        <DialogHeader className="pl-1  grid items-center justify-center">
          <div className=" grid items-center justify-center">
            <MotoLogLogo disabled={true} />
          </div>
          <DialogTitle>
            <p className="text-center">
              <Balancer>
                Preencha os detalhes abaixo para adicionar um novo produto à sua
                loja.
              </Balancer>
            </p>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[98%] overflow-hidden">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="grid w-full h-full flex-1 auto-rows-max gap-4 md:gap-4 lg:min-h-[calc(100vh-9.125rem)]"
            >
              <div className="h-full grid auto-rows-max items-start gap-4 lg:gap-8">
                <div className="grid gap-4 pl-1 pr-6 mt-8">
                  <Label htmlFor="imageUrl">Url da imagem</Label>
                  <Input
                    type="text"
                    placeholder="URL da imagem"
                    {...methods.register("imageUrl", { required: true })}
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
        />
      </DialogContent>
    </Dialog>
  );
}
