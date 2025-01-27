import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";
import Icon from "@/components/icons/icon-component";

interface Props {
  defaultValue?: {
    status: string;
  };
}

export default function ProductStatus({ defaultValue }: Props) {
  const { control } = useFormContext();

  return (
    <div className="grid gap-4">
      <Label htmlFor="status" className="h-fit">
        Status do Produto
      </Label>
      <Controller
        control={control}
        name="status"
        defaultValue={defaultValue?.status || "ATIVO"}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || "ATIVO"}
          >
            <SelectTrigger
              id="status"
              aria-label="Select status"
              className={cn("")}
            >
              <SelectValue placeholder="Selecionar status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATIVO" >
                <div className="flex items-center gap-x-4">
                  <Icon.folderCheck size={22}/>
                  <span>Ativo</span>
                </div>
              </SelectItem>
              <SelectItem value="ARQUIVADO">
                <div className="flex items-center gap-x-4">
                  <Icon.folderDown size={22}/>
                  <span>Arquivado</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
