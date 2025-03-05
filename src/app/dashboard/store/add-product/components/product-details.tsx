import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  className?: string;
  defaultValues?: {
    nome: string;
    descricao: string;
  };
}

export default function ProductDetails({
  defaultValues,
  className,
}: ProductDetailsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          type="text"
          className={cn("w-full", className)}
          defaultValue={defaultValues?.nome || ""}
          placeholder="Nome do produto"
          {...register("nome", {
            required: "O nome do produto é obrigatório",
          })}
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">
            {errors.nome.message?.toString()}
          </p>
        )}
      </div>
      <div className="grid gap-4">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          className={cn("min-h-32 rounded-2xl", className)}
          defaultValue={defaultValues?.descricao || ""}
          placeholder="Descrição do produto"
          {...register("descricao")}
        />
        {errors.descricao && (
          <p className="text-red-500 text-sm">
            {errors.descricao.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
