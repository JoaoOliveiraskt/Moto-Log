"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  totalIncome: {
    label: "Receita Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  MonthlyRevenue: { month: string; totalIncome: number }[];
}

const MonthlyRevenueTestData = [
  { month: "Dad", totalIncome: 7000 },
  { month: "osF", totalIncome: 3000 },
  { month: "ake", totalIncome: 5000 },
  { month: "Dad", totalIncome: 4000 },
  { month: "osF", totalIncome: 7000 },
  { month: "ake", totalIncome: 6000 },
  { month: "Dad", totalIncome: 8000 },
  { month: "osF", totalIncome: 4000 },
  { month: "ake", totalIncome: 3000 },
  { month: "Dad", totalIncome: 6000 },
  { month: "osF", totalIncome: 2000 },
  { month: "ake", totalIncome: 11000 },
];

export default function MonthlyIncomeChart({ MonthlyRevenue }: Props) {
  if (MonthlyRevenue.length === 1) {
    MonthlyRevenue.push({ month: "", totalIncome: 0 });
  }

  const atualDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card className="xl:col-span-2 relative overflow-hidden border-2 border-border/25">
      <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/[0.04] to-transparent" />
      <CardHeader className="p-6 relative">
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>
          {MonthlyRevenue.length === 0
            ? " (Esses dados são fictícios enquanto não há dados reais)"
            : " Visão geral da receita mensal em reais (R$)"}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ChartContainer config={chartConfig} className="max-h-64 w-full">
          <AreaChart
            accessibilityLayer
            data={
              MonthlyRevenue.length === 0
                ? MonthlyRevenueTestData
                : MonthlyRevenue
            }
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <defs>
              <linearGradient id="fillTotalIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalIncome)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalIncome)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="totalIncome"
              type="natural"
              fill="url(#fillTotalIncome)"
              fillOpacity={1}
              stroke="var(--color-totalIncome)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="p-6">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Crescimento de 0% este mês{" "}
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {atualDate}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
