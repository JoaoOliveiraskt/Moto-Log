import formatCurrency from "@/app/helpers/format-currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface Props {
  totalRevenue: number;
}

export default function TotalRevenue({ totalRevenue }: Props) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[0px] bg-gradient-to-b from-white/[0.04] to-transparent" />

      <CardHeader className="flex flex-row items-center justify-between p-6 relative">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm">Receita Total</CardTitle>
        </div>
        <DollarSign className="h-4 w-4 text-muted-foreground " />
      </CardHeader>

      <CardContent className="relative">
        <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Receita total da sua loja
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
