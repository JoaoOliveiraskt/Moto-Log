"use client";

import ProductFormActionButtons from "@/app/dashboard/products/add-product/components/save-product";
import ModalConfirmation from "@/app/dashboard/products/add-product/components/modal-confirmation";
import ProductCategory from "@/app/dashboard/products/add-product/components/product-category";
import ProductDetails from "@/app/dashboard/products/add-product/components/product-details";
import ProductStatus from "@/app/dashboard/products/add-product/components/product-status";
import ProductImage from "@/app/dashboard/products/add-product/components/product-image";
import Stock from "@/app/dashboard/products/add-product/components/stock";
import Container from "@/components/container";
import { useSubmitState } from "@/hooks/use-submit-state";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

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
          : "Erro desconhecido ao atualizar produto. Tente novamente.";
      setErrorMessage(errorMsg);

      setSuccess(false);
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid max-w-[60rem] gap-4"
        >
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="space-y-4 gap-4 lg:col-span-2 lg:gap-8">
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

            <div className="flex flex-col gap-y-4">
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
</>
  );
}
