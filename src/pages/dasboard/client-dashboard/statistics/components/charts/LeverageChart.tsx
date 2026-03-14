import type { ClientStats } from '../../../../../../types/types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { RadialBar, RadialBarChart, PolarGrid } from "recharts";

export const LeverageChart = ({ data }: { data: ClientStats | null }) => {
  const chartConfig = {
    value: {
      label: "النسبة",
      color: "#F59E0B",
    },
  } satisfies ChartConfig;

  const leverageRatios = data?.financial_ratios?.leverage_ratios;
  const chartData = leverageRatios ? [
    {
      name: "دين/ملكية",
      value: (leverageRatios.debt_to_equity ?? 0) * 100,
      fill: "#F59E0B",
    },
    {
      name: "دين/أصول",
      value: (leverageRatios.debt_ratio ?? 0) * 100,
      fill: "#D97706",
    },
  ] : [];

  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <RadialBarChart 
        data={chartData} 
        innerRadius="30%" 
        outerRadius="100%"
        startAngle={90}
        endAngle={450}
      >
        <PolarGrid gridType="circle" />
        <RadialBar 
          dataKey="value" 
          cornerRadius={8}
          label={{ 
            position: 'insideStart', 
            fill: '#fff',
            fontSize: 11,
            formatter: (value: number) => `${value.toFixed(0)}%`
          }}
        />
        <ChartTooltip 
          content={<ChartTooltipContent formatter={(value) => `${Number(value).toFixed(1)}%`} />} 
        />
      </RadialBarChart>
    </ChartContainer>
  );
};