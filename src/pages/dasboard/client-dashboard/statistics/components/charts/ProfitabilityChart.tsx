import type { ClientStats } from '../../../../../../types/types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

export const ProfitabilityChart = ({ data }: { data: ClientStats | null }) => {
  const chartConfig = {
    value: {
      label: "النسبة المئوية",
      color: "#10b981",
    },
  } satisfies ChartConfig;

  const profitability = data?.financial_ratios?.profitability_ratios;
  const chartData = profitability ? [
    {
      ratio: "هامش إجمالي",
      value: (profitability.gross_profit_margin ?? 0) * 100,
    },
    {
      ratio: "هامش صافي",
      value: (profitability.net_profit_margin ?? 0) * 100,
    },
    {
      ratio: "عائد أصول",
      value: (profitability.return_on_assets ?? 0) * 100,
    },
    {
      ratio: "عائد ملكية",
      value: (profitability.return_on_equity ?? 0) * 100,
    }
  ] : [];

  const colors = ["#10b981", "#059669", "#047857", "#065f46"];

  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="ratio"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          fontSize={11}
        />
        <YAxis 
          tickFormatter={(value) => `${value}%`} 
          axisLine={false}
          tickLine={false}
          fontSize={10}
          width={35}
        />
        <ChartTooltip 
          content={<ChartTooltipContent formatter={(value) => `${Number(value).toFixed(1)}%`} />} 
        />
        <Bar 
          dataKey="value" 
          radius={[6, 6, 0, 0]} 
          barSize={35}
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};