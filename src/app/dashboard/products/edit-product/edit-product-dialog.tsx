"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useSubmitState } from "@/hooks/use-submit-state";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponsiveDialogOrDrawer } from "@/components/responsive-dialog-or-drawer";
import EditProductForm from "./edit-product-form";

interface EditProductDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productId: string;
}

async function fetchProduct(id: string) {
  const url = process.env.NEXT_PUBLIC_API_URL + `/api/product/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

export default function EditProductDialog({
  isOpen,
  onOpenChange,
  productId,
}: EditProductDialogProps) {
  const methods = useForm();
  const { isLoading, startLoading, stopLoading } = useSubmitState();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      startLoading();
      fetchProduct(productId)
        .then(setProduct)
        .catch((error) => setErrorMessage(error.message))
        .finally(stopLoading);
    }
  }, [isOpen, productId, startLoading, stopLoading]);

  return (
    <ResponsiveDialogOrDrawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Editar Produto"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
      
          <EditProductForm dadosIniciais={product} />
     
      )}
    </ResponsiveDialogOrDrawer>
  );
}