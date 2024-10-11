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

export default function AddProductPage() {
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
    <main className="grid flex-1 items-center justify-center gap-4 p-4 md:gap-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4"
        >
     
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetails />
              <Stock />
              <ProductCategory />
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ProductStatus />
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader className="px-6 mt-6 space-y-2 mb-5">
                  <CardTitle>Imagem do Produto</CardTitle>
                  <CardDescription>
                    Adicione a imagem do produto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    placeholder="URL da imagem"
                    {...methods.register("imageUrl", { required: true })}
                  />
                </CardContent>
              </Card>
              <ProductFormActionButtons isLoading={isLoading} onDiscard={() => methods.reset()} />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
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
