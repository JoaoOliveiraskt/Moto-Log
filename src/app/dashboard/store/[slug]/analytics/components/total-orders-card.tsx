import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface Props {
  totalOrders: number;
}

export default function TotalOrders({ totalOrders }: Props) {
  return (
    <Card className="relative overflow-hidden border-2 border-border/25">
      <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/[0.04] to-transparent" />
      <CardHeader className="flex flex-row items-center justify-between p-6 relative">
        <CardTitle className="text-sm ">Pedidos</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold">{totalOrders}</div>
        <p className="text-xs text-muted-foreground">
          Total de pedidos da sua loja
        </p>
      </CardContent>
    </Card>
  );
}
