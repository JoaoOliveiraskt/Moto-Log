import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export default function Stock() {
  const { register, setValue } = useFormContext();

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Estoque</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>
                <span>Desconto (%)</span>
              </TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead className="max-w-[100px]">Cor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover-none">
              <TableCell>
                <Label htmlFor="stock" className="sr-only">
                  Estoque
                </Label>
                <Input
                  {...register("stock", {
                    required: "O estoque é obrigatório",
                  })}
                  id="stock"
                  type="number"
                  placeholder="Ex: 100"
                />
              </TableCell>

              <TableCell>
                <Label htmlFor="price" className="sr-only">
                  Preço
                </Label>
                <Input
                  {...register("price", {
                    required: "O preço é obrigatório",
                  })}
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 99.99"
                />
              </TableCell>

              <TableCell className="flex items-center">
                <Label htmlFor="discountPercentage" className="sr-only">
                  Desconto
                </Label>
                <Input
                  {...register("discountPercentage", {
                    required: "O desconto é obrigatório",
                  })}
                  id="discountPercentage"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 10.00"
                />
              </TableCell>

              <TableCell>
                <Select onValueChange={(value) => setValue("size", value)}>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P">P</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="G">G</SelectItem>
                    <SelectItem value="GG">GG</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Select onValueChange={(value) => setValue("color", value)}>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preto">Preto</SelectItem>
                    <SelectItem value="branco">Branco</SelectItem>
                    <SelectItem value="azul">Azul</SelectItem>
                    <SelectItem value="vermelho">Vermelho</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
