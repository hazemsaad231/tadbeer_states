import type { ClientStats } from '../../../../../../types/types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const LiquidityChart = ({ data }: { data: ClientStats | null }) => {
  const chartConfig = {
    value: {
      label: "النسبة",
      color: "#D4AF5F",
    },
  } satisfies ChartConfig;

  const liquidity = data?.financial_ratios?.liquidity_ratios;
  const chartData = liquidity ? [
    {
      ratio: "نقدية",
      value: (liquidity.cash_ratio ?? 0),
    },
    {
      ratio: "تداول",
      value: (liquidity.current_ratio ?? 0),
    },
    {
      ratio: "سريعة",
      value: (liquidity.quick_ratio ?? 0),
    },
  ] : [];

  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#D4AF5F" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#D4AF5F" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="ratio"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          fontSize={11}
        />
        <YAxis 
          tickFormatter={(value) => value.toFixed(1)} 
          axisLine={false}
          tickLine={false}
          fontSize={10}
          width={35}
        />
        <ChartTooltip 
          content={<ChartTooltipContent formatter={(value) => Number(value).toFixed(2)} />} 
        />
        <Area 
          type="monotone"
          dataKey="value" 
          stroke="#D4AF5F"
          strokeWidth={2}
          fill="url(#colorLiquidity)"
        />
      </AreaChart>
    </ChartContainer>
  );
};