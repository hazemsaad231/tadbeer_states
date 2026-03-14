import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { ClientStats } from '../../../types';
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Cell } from "recharts";

export const GrowthChart = ({ data }: { data: ClientStats | null }) => {
  if (!data?.yoy_growth) return null;

  const chartConfig = {
    current: {
      label: `${data.yoy_growth.current_year}`,
      color: "#10b981",
    },
    previous: {
      label: `${data.yoy_growth.previous_year}`,
      color: "#94a3b8",
    },
  } satisfies ChartConfig;

  // تحضير البيانات للرسم البياني
  const chartData = [
    {
      metric: "الإيرادات",
      [`${data.yoy_growth.current_year}`]: Number(data.yoy_growth.revenues.current),
      [`${data.yoy_growth.previous_year}`]: Number(data.yoy_growth.revenues.previous),
      growth: data.yoy_growth.revenues.growth_rate,
      color1: "#10B981",
      color2: "#94a3b8",
    },
    {
      metric: "صافي الربح",
      [`${data.yoy_growth.current_year}`]: Number(data.yoy_growth.net_profit.current),
      [`${data.yoy_growth.previous_year}`]: Number(data.yoy_growth.net_profit.previous),
      growth: data.yoy_growth.net_profit.growth_rate,
      color1: "#14184C",
      color2: "#64748b",
    },
  ];

  const revenuesGrowth = data.yoy_growth.revenues.growth_rate;
  const profitGrowth = data.yoy_growth.net_profit.growth_rate;

  return (
    <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-br from-[#10B981]/5 to-transparent rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-linear-to-br from-[#10B981] to-[#059669] shadow-xl">
            <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#14184C] mb-1">مقارنة النمو السنوي</h3>
            <p className="text-sm text-gray-500 font-medium">
              {data.yoy_growth.previous_year} مقابل {data.yoy_growth.current_year}
            </p>
          </div>
        </div>
      </div>

      {/* Growth Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        {/* نمو الإيرادات */}
        <div 
          className={`p-5 rounded-2xl border-2 ${revenuesGrowth >= 0 ? 'border-[#10B981]/20 bg-[#10B981]/5' : 'border-red-500/20 bg-red-50'}`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-600">نمو الإيرادات</p>
            {revenuesGrowth >= 0 ? (
              <ArrowUpRight className="w-5 h-5 text-[#10B981]" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p className={`text-3xl font-black ${revenuesGrowth >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
            {revenuesGrowth > 0 ? '+' : ''}{revenuesGrowth.toFixed(1)}%
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
            <span className="font-semibold">{data.yoy_growth.previous_year}:</span>
            <span>{Number(data.yoy_growth.revenues.previous).toLocaleString('ar-SA')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="font-semibold">{data.yoy_growth.current_year}:</span>
            <span className="font-bold">{Number(data.yoy_growth.revenues.current).toLocaleString('ar-SA')}</span>
          </div>
        </div>

        {/* نمو صافي الربح */}
        <div 
          className={`p-5 rounded-2xl border-2 ${profitGrowth >= 0 ? 'border-[#14184C]/20 bg-[#14184C]/5' : 'border-red-500/20 bg-red-50'}`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-600">نمو صافي الربح</p>
            {profitGrowth >= 0 ? (
              <ArrowUpRight className="w-5 h-5 text-[#14184C]" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p className={`text-3xl font-black ${profitGrowth >= 0 ? 'text-[#14184C]' : 'text-red-500'}`}>
            {profitGrowth > 0 ? '+' : ''}{profitGrowth.toFixed(2)}%
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
            <span className="font-semibold">{data.yoy_growth.previous_year}:</span>
            <span>{Number(data.yoy_growth.net_profit.previous).toLocaleString('ar-SA')}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="font-semibold">{data.yoy_growth.current_year}:</span>
            <span className="font-bold">{Number(data.yoy_growth.net_profit.current).toLocaleString('ar-SA')}</span>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="relative z-10">
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="metric"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              fontSize={13}
              fontWeight={600}
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}م`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}ك`;
                return value;
              }}
              axisLine={false}
              tickLine={false}
              fontSize={11}
              width={60}
            />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                
                return (
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-lg">
                    <p className="font-bold text-sm mb-2">{payload[0]?.payload?.metric}</p>
                    {payload.map((entry: any, index: number) => (
                      <div key={index} className="flex items-center justify-between gap-4 mb-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-xs font-medium">{entry.name}:</span>
                        </div>
                        <span className="text-xs font-bold">
                          {Number(entry.value).toLocaleString('ar-SA')}
                        </span>
                      </div>
                    ))}
                    {payload[0]?.payload?.growth !== undefined && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <span className="text-xs font-semibold">النمو: </span>
                        <span className={`text-xs font-bold ${payload[0].payload.growth >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                          {payload[0].payload.growth > 0 ? '+' : ''}{payload[0].payload.growth.toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                );
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              dataKey={`${data.yoy_growth.previous_year}`} 
              fill="#94a3b8" 
              radius={[6, 6, 0, 0]} 
              barSize={50}
            />
            <Bar 
              dataKey={`${data.yoy_growth.current_year}`} 
              radius={[6, 6, 0, 0]} 
              barSize={50}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color1} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 pt-6 border-t border-gray-100 relative z-10">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-gray-600">النمو الإيجابي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-gray-600">النمو السلبي</span>
          </div>
        </div>
      </div>
    </div>
  );
};