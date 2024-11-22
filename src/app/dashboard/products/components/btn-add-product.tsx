"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AddProductDialog from "../add-product/dialog";

export default function BtnAddProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModalOpen = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Button
        size={"lg"}
        className="flex items-center gap-1"
        onClick={toggleModalOpen}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Adicionar produto
        </span>
      </Button>
      <AddProductDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
