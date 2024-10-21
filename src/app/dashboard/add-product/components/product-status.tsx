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

export default function ProductStatus() {
  const { control } = useFormContext();

  return (
    <div className="grid pl-1 pr-6">
      <div className="grid gap-4">
        <Label htmlFor="status">Status do Produto</Label>
        <Controller
          control={control}
          name="status"
          defaultValue="ATIVO"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Selecionar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="ARQUIVADO">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
