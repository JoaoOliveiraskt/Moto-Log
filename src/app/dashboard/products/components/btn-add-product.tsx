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
        size={"rounded"}
        className="flex items-center gap-2 h-10 w-10 sm:w-max px-0 py-0 sm:px-4 sm:py-4"
        onClick={toggleModalOpen}
      >
        <PlusCircle size={18} />
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
