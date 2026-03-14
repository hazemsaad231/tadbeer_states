"use client"

import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import type { ClientStats } from '../../../../../../types/types';
const CATEGORY_COLORS = {
  الربحية: "#10B981",
  السيولة: "#3B82F6",
  الرافعة: "#F97316",
  النشاط:  "#8B5CF6",
}

function buildChartData(data: ClientStats) {
  const { profitability_ratios, liquidity_ratios, leverage_ratios, activity_ratios } =
    data.financial_ratios

  const profitScore = Math.round(
    (Math.min(1, (profitability_ratios.gross_profit_margin ?? 0) / 0.5))  * 25 +
    (Math.min(1, (profitability_ratios.net_profit_margin   ?? 0) / 0.25)) * 25 +
    (Math.min(1, (profitability_ratios.return_on_assets    ?? 0) / 0.15)) * 25 +
    (Math.min(1, (profitability_ratios.return_on_equity    ?? 0) / 0.2))  * 25
  )
  const liquidScore = Math.min(100, Math.round(
    (Math.min(1, (liquidity_ratios.current_ratio ?? 0) / 2.0)) * 50 +
    (Math.min(1, (liquidity_ratios.quick_ratio   ?? 0) / 1.0)) * 30 +
    (Math.min(1, (liquidity_ratios.cash_ratio    ?? 0) / 0.5)) * 20
  ))
  const leverageScore = Math.min(100, Math.max(0, Math.round(
    ((1 - Math.min((leverage_ratios.debt_ratio     ?? 0), 2)) / 1) * 50 +
     (1 - Math.min((leverage_ratios.debt_to_equity ?? 0) / 5, 1)) * 50
  )))
  const activityScore = Math.min(100, Math.round(
    (Math.min(1, (activity_ratios.asset_turnover     ?? 0) / 2))  * 50 +
    (Math.min(1, (activity_ratios.inventory_turnover ?? 0) / 10)) * 50
  ))

  return [
    { category: "الربحية", score: profitScore   },
    { category: "السيولة", score: liquidScore   },
    { category: "الرافعة", score: leverageScore },
    { category: "النشاط",  score: activityScore },
  ]
}

function DonutChart({ chartData, overall }: {
  chartData: { category: string; score: number }[]
  overall: number
}) {
  const R = 40
  const CIRCUMFERENCE = 2 * Math.PI * R
  const GAP_ARC = (4 / 360) * CIRCUMFERENCE
  const SLOT = CIRCUMFERENCE / chartData.length

  let offset = 0

  return (
    <div className="relative w-36 h-36 lg:w-44 lg:h-44 mx-auto">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
        {chartData.map((item) => {
          const color = CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS]
          const filledArc  = Math.max(0, (item.score / 100) * SLOT - GAP_ARC)
          const currentOffset = offset
          offset += SLOT

          return (
            <g key={item.category}>
              {/* track */}
              <circle cx="50" cy="50" r={R} fill="none"
                stroke="#e5e7eb" strokeWidth="14"
                strokeDasharray={`${SLOT - GAP_ARC} ${CIRCUMFERENCE}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="round"
              />
              {/* filled */}
              <circle cx="50" cy="50" r={R} fill="none"
                stroke={color} strokeWidth="14"
                strokeDasharray={`${filledArc} ${CIRCUMFERENCE}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="round"
              />
            </g>
          )
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white dark:bg-card rounded-full w-18 h-18 md:w-22 md:h-22 flex flex-col items-center justify-center shadow-sm">
          <span className="text-xl md:text-2xl font-bold leading-none">{overall}%</span>
          <span className="text-[10px] text-muted-foreground mt-1">إجمالي</span>
        </div>
      </div>
    </div>
  )
}

export function ChartBar({ data }: { data: ClientStats | null }) {
  const chartData = React.useMemo(
    () => (data ? buildChartData(data) : []),
    [data]
  )

  const overall = chartData.length
    ? Math.round(chartData.reduce((a, d) => a + d.score, 0) / chartData.length)
    : 0

  const isHealthy = overall >= 60

  return (
    <Card>
      <CardHeader>
        <CardTitle>الصحة المالية الإجمالية</CardTitle>
        <CardDescription>مقارنة الأداء الفعلي بالمعايير المثالية</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6 pb-4">
        {chartData.length > 0
          ? <DonutChart chartData={chartData} overall={overall} />
          : <div className="w-36 h-36 rounded-full bg-muted animate-pulse" />
        }

        {/* Legend */}
        <div className="flex flex-col gap-3 w-full">
          {chartData.map((item) => {
            const color = CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS]
            return (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.score}%`, background: color }} />
                  </div>
                  <span className="text-sm font-semibold w-10 text-right" style={{ color }}>
                    {item.score}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm border-t pt-4">
        <div className={`flex items-center gap-2 font-medium leading-none ${isHealthy ? "text-emerald-600" : "text-red-500"}`}>
          {isHealthy ? `صحة مالية جيدة — ${overall}%` : `تحتاج تحسين — ${overall}%`}
          {isHealthy ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </div>
        <div className="leading-none text-muted-foreground">
          مقارنة بالمعايير المثالية لكل محور مالي
        </div>
      </CardFooter>
    </Card>
  )
}