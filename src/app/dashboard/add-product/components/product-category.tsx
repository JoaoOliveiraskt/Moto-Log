import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";

interface CategoriaProps {
  id: string;
  nome: string;
  imageUrl: string;
}

export default function ProductCategory() {
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
    <Card x-chunk="dashboard-07-chunk-2">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Categoria do Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="category">Categoria</Label>
            <Controller
              control={control}
              name="categoryId"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={(value) => {
                  field.onChange(value);
                }} defaultValue={field.value}>
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </CardContent>
    </Card>
  );
}