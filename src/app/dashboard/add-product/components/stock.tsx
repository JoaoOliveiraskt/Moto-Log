import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function Stock() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="pl-1 pr-6 flex gap-2 mb-10 w-full">
      <div className="space-y-2 w-full">
        <Label htmlFor="stock">Estoque</Label>
        <Input
          {...register("stock", {
            required: "O estoque é obrigatório",
          })}
          id="stock"
          type="number"
          placeholder="Ex: 100"
        />
      </div>

      <div className="space-y-2 w-full">
        <Label htmlFor="price">Preço</Label>
        <Input
          {...register("price", {
            required: "O preço é obrigatório",
          })}
          id="price"
          type="number"
          step="0.01"
          placeholder="Ex: 99.99"
        />
      </div>

      <div className="space-y-2 w-full">
        <Label htmlFor="discountPercentage">Desconto</Label>
        <Input
          {...register("discountPercentage", {
            required: "O desconto é obrigatório",
          })}
          id="discountPercentage"
          type="number"
          step="0.01"
          placeholder="Ex: 10.00"
        />
      </div>
    </div>
  );
}
