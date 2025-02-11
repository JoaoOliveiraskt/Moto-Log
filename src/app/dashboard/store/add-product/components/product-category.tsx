"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";

interface CategoriaProps {
  id: string;
  nome: string;
  imagemUrl: string;
}

interface Props {
  defaultValue?: {
    categoria: string;
  };
}

export default function ProductCategory({ defaultValue }: Props) {
  const [categories, setCategories] = useState<CategoriaProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { control } = useFormContext();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/fetch-categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }
        const data: CategoriaProps[] = await response.json();
        setCategories(data);
      } catch (error) {
        setErrorMessage("Erro ao buscar categorias");
      }
    }

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="grid gap-4">
        <Label htmlFor="categoriaId">Categoria do Produto</Label>
        <Controller
          control={control}
          name="categoriaId"
          defaultValue={defaultValue?.categoria || ""}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
              }}
              defaultValue={field.value || ""}
            >
              <SelectTrigger id="categoriaId" aria-label="Select category">
                <SelectValue
                  placeholder={
                    defaultValue?.categoria
                      ? defaultValue.categoria
                      : "Selecionar categoria"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem
                      aria-hidden={false}
                      key={category.id}
                      value={category.id}
                    >
                      {category.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
