"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
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
import Container from "@/components/container";
import ProductImage from "@/app/dashboard/add-product/components/product-image";

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

export default function EditProductForm({
  dadosIniciais,
}: {
  dadosIniciais: any;
}) {
  const methods = useForm<ProductData>({
    defaultValues: {
      nome: dadosIniciais.nome,
      descricao: dadosIniciais.descricao,
      preco: dadosIniciais.preco,
      porcentagemDesconto: dadosIniciais.porcentagemDesconto,
      estoque: dadosIniciais.estoque,
      categoriaId: dadosIniciais.categoriaId,
      status: dadosIniciais.status,
      imagemUrl: dadosIniciais.imagemUrl,
    },
  });

  const { isLoading, isSuccessful, startLoading, stopLoading, setSuccess } =
    useSubmitState();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    dadosIniciais.imagemUrl || null
  );

  const onSubmit = async (data: ProductData) => {
    startLoading();
    setErrorMessage("");

    try {
      isLoading;
      const formattedData = {
        ...data,
        preco: Number(data.preco),
        estoque: Number(data.estoque),
        porcentagemDesconto: Number(data.porcentagemDesconto),
      };

      const response = await fetch(`/api/product/${dadosIniciais.id}`, {
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
      console.log("Produto atualizado com sucesso:", result);
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
    <Container className="grid flex-1 items-center justify-center gap-4 p-4 md:gap-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetails
                defaultValues={{
                  nome: dadosIniciais.nome,
                  descricao: dadosIniciais.descricao,
                }}
              />
              <Stock
                defaultValues={{
                  estoque: Number(dadosIniciais.estoque),
                  preco: Number(dadosIniciais.preco),
                  porcentagemDesconto: Number(
                    dadosIniciais.porcentagemDesconto
                  ),
                }}
              />
              <ProductCategory
                defaultValue={{ categoria: dadosIniciais.categoriaId }}
              />
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ProductStatus />
              <ProductImage
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                dadosIniciais={dadosIniciais}
                register={methods.register}
              />
              <ProductFormActionButtons
                isLoading={isLoading}
                onDiscard={() => {
                  methods.reset(dadosIniciais);
                }}
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </form>
      </FormProvider>

      <ModalConfirmation
        isConfirmDialogOpen={isConfirmDialogOpen}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
      >
        Produto atualizado com sucesso! 🎉
      </ModalConfirmation>
    </Container>
  );
}
