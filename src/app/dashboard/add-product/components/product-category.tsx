import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductCategory() {
  return (
    <Card x-chunk="dashboard-07-chunk-2">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Categoria do Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="category">Categoria</Label>
            <Select>
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Selecionar categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clothing">Roupas</SelectItem>
                <SelectItem value="electronics">Eletrônicos</SelectItem>
                <SelectItem value="accessories">Accessórios</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
