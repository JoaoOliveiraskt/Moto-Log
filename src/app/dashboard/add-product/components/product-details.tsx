import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductDetailsProps {
  isEditing?: boolean;
}

export default function ProductDetails({ isEditing }: ProductDetailsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card  className="h-full">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Detalhes do Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              placeholder="Nome do produto"
              {...register("name", {
                required: "O nome do produto é obrigatório",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message?.toString()}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              className="min-h-32"
              placeholder="Descrição do produto"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
