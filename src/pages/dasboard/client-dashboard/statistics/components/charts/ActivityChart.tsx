import type { ClientStats } from '../../../types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const ActivityChart = ({ data }: { data: ClientStats | null }) => {
  const chartConfig = {
    value: {
      label: "معدل الدوران",
      color: "#3B82F6",
    },
  } satisfies ChartConfig;

  const activity = data?.financial_ratios?.activity_ratios;
  const chartData = activity ? [
    {
      ratio: "دوران أصول",
      value: (activity.asset_turnover ?? 0),
    },
    {
      ratio: "دوران مخزون",
      value: (activity.inventory_turnover ?? 0),
    },
  ] : [];

  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
        <Line 
          type="monotone"
          dataKey="value" 
          stroke="#3B82F6"
          strokeWidth={3}
          dot={{ fill: "#3B82F6", r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ChartContainer>
  );
};