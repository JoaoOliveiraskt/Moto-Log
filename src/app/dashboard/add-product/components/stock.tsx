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
import { useFormContext } from "react-hook-form";

export default function Stock() {
  const { register, setValue, formState: {errors} } = useFormContext();

  return (
    <Card x-chunk="dashboard-07-chunk-1" className="h-full">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Estoque</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Estoque</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>
                <span>Desconto (%)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-card">
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
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
