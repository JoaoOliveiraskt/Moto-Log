import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface StockProps {
  defaultValues?: {
    estoque: number;
    preco: number;
    porcentagemDesconto: number;
  };
}

export default function Stock({ defaultValues }: StockProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid gap-y-4 w-full">
        <Label htmlFor="estoque">Estoque</Label>
        <Input
          {...register("estoque", {
            required: "O estoque é obrigatório",
          })}
          defaultValue={defaultValues?.estoque || ""}
          id="estoque"
          type="number"
          placeholder="Ex: 100"
          className={cn({ "border-red-500": errors.estoque })}
        />
        {errors.stock && (
          <span className="text-sm text-red-500">
            {errors.stock.message as string}
          </span>
        )}
      </div>

      <div className="grid gap-y-4 w-full">
        <Label htmlFor="preco">Preço</Label>
        <Input
          {...register("preco", {
            required: "O preço é obrigatório",
          })}
          defaultValue={defaultValues?.preco || ""}
          id="preco"
          type="number"
          step="0.01"
          placeholder="Ex: 99.99"
          className={cn({ "border-red-500": errors.preco })}
        />
        {errors.price && (
          <span className="text-sm text-red-500">
            {errors.price.message as string}
          </span>
        )}
      </div>

      <div className="grid gap-y-4 w-full">
        <Label htmlFor="porcentagemDesconto">Desconto</Label>
        <Input
          {...register("porcentagemDesconto", {
            required: "O desconto é obrigatório",
          })}
          defaultValue={defaultValues?.porcentagemDesconto || ""}
          className={cn({ "border-red-500": errors.porcentagemDesconto })}
          id="porcentagemDesconto"
          type="number"
          step="0.01"
          placeholder="Ex: 10.00"
        />
      </div>
    </div>
  );
}
