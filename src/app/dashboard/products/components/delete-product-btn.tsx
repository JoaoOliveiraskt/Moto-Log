"use client";

import Icon from "@/components/icons/icon-component";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  productId: string;
  setIsConfirmDialogOpen: (isOpen: boolean) => void;
}

export default function DeleteProductBtn({
  productId,
  setIsConfirmDialogOpen,
}: Props) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const timeOut = setTimeout(() => {
    setSuccess(false);
    clearTimeout(timeOut);
  }, 2000);

  const deleteProduct = async () => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: "DELETE",
      });
      setSuccess(true);

      setTimeout(() => {
        setIsConfirmDialogOpen(false);
      }, 2000);
    } catch (error) {
      setSuccess(false);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <Button
      size={"rounded"}
      className={cn(success && "bg-confirmed text-white")}
      onClick={deleteProduct}
      disabled={isSubmitLoading}
    >
      {success ? <Icon.confirmed size={20} /> : "Excluir"}
      {isSubmitLoading && <Loader2 className="ml-2 animate-spin" size={20}/>}
    </Button>
  );
}
