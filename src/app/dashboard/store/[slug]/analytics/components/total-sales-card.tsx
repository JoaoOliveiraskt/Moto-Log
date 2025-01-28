import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

interface Props {
  totalVendas: number;
}

export default function TotalSales({ totalVendas }: Props) {
  return (
    <Card className="relative overflow-hidden border-2 border-border/25">
      <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/[0.04] to-transparent" />
      <CardHeader className="flex flex-row items-center justify-between p-6 relative">
        <CardTitle className="text-sm ">Vendas</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold">{totalVendas}</div>
        <p className="text-xs text-muted-foreground">
          Total de vendas da sua loja
        </p>
      </CardContent>
    </Card>
  );
}
