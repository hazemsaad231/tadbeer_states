import { TrendingUp, Droplets, Scale, Activity } from 'lucide-react';
import type { ClientStats } from '../../types';
import { fmt } from '../utils';
import { ProfitabilityChart } from './charts/ProfitabilityChart';
import { LiquidityChart } from './charts/LiquidityChart';
import { LeverageChart } from './charts/LeverageChart';
import { ActivityChart } from './charts/ActivityChart';

export const RatioSections = ({ data }: { data: ClientStats | null }) => {
  const groups = [
    {
      title: 'نسب الربحية',
      subtitle: 'Profitability Ratios',
      icon: TrendingUp,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      headline: fmt(data?.financial_ratios?.profitability_ratios?.gross_profit_margin ?? null, true),
      Component: ProfitabilityChart,
      kpis: [
        { label: 'هامش الربح الإجمالي', value: fmt(data?.financial_ratios?.profitability_ratios?.gross_profit_margin ?? null, true), progress: data?.financial_ratios?.profitability_ratios?.gross_profit_margin ?? 0 },
        { label: 'هامش صافي الربح', value: fmt(data?.financial_ratios?.profitability_ratios?.net_profit_margin ?? null, true), progress: data?.financial_ratios?.profitability_ratios?.net_profit_margin ?? 0 },
        { label: 'العائد على الأصول', value: fmt(data?.financial_ratios?.profitability_ratios?.return_on_assets ?? null, true), progress: data?.financial_ratios?.profitability_ratios?.return_on_assets ?? 0 },
        { label: 'العائد على حقوق الملكية', value: fmt(data?.financial_ratios?.profitability_ratios?.return_on_equity ?? null, true), progress: data?.financial_ratios?.profitability_ratios?.return_on_equity ?? 0 },
      ],
    },
    {
      title: 'نسب الرفع المالي',
      subtitle: 'Leverage Ratios',
      icon: Scale,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      headline: fmt(data?.financial_ratios?.leverage_ratios?.debt_to_equity ?? null, true),
      Component: LeverageChart,
      kpis: [
        { label: 'الدين إلى حقوق الملكية', value: fmt(data?.financial_ratios?.leverage_ratios?.debt_to_equity ?? null, true), progress: data?.financial_ratios?.leverage_ratios?.debt_to_equity ?? 0 },
        { label: 'الدين إلى الأصول', value: fmt(data?.financial_ratios?.leverage_ratios?.debt_ratio ?? null, true), progress: data?.financial_ratios?.leverage_ratios?.debt_ratio ?? 0 },
      ],
    },
    {
      title: 'نسب النشاط',
      subtitle: 'Activity Ratios',
      icon: Activity,
      color: '#3B82F6',
      bg: 'rgba(59,130,246,0.1)',
      headline: fmt(data?.financial_ratios?.activity_ratios?.asset_turnover ?? null, true),
      Component: ActivityChart,
      kpis: [
        { label: 'دوران الأصول', value: fmt(data?.financial_ratios?.activity_ratios?.asset_turnover ?? null, true), progress: data?.financial_ratios?.activity_ratios?.asset_turnover ?? 0 },
        { label: 'دوران المخزون', value: fmt(data?.financial_ratios?.activity_ratios?.inventory_turnover ?? null, true), progress: data?.financial_ratios?.activity_ratios?.inventory_turnover ?? 0 },
      ],
    },
    {
      title: 'نسب السيولة',
      subtitle: 'Liquidity Ratios',
      icon: Droplets,
      color: '#D4AF5F',
      bg: 'rgba(212,175,95,0.1)',
      headline: fmt(data?.financial_ratios?.liquidity_ratios?.current_ratio ?? null, true),
      Component: LiquidityChart,
      kpis: [
        { label: 'نسبة النقدية', value: fmt(data?.financial_ratios?.liquidity_ratios?.cash_ratio ?? null, true), progress: data?.financial_ratios?.liquidity_ratios?.cash_ratio ?? 0 },
        { label: 'نسبة التداول', value: fmt(data?.financial_ratios?.liquidity_ratios?.current_ratio ?? null, true), progress: data?.financial_ratios?.liquidity_ratios?.current_ratio ?? 0 },
        { label: 'نسبة السيولة السريعة', value: fmt(data?.financial_ratios?.liquidity_ratios?.quick_ratio ?? null, true), progress: data?.financial_ratios?.liquidity_ratios?.quick_ratio ?? 0 },
      ],
    },
  ];

  return (
    <div className="space-y-5 mb-8">
      {groups.map((group) => (
        <div
          key={group.title}
          className="bg-white rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex flex-col md:flex-row">

            {/* ══ يمين: Chart ══ */}
            <div
              className="md:w-2/3 p-6"
              style={{ borderLeft: '1px solid rgba(0,0,0,0.06)' }}
            >
              {/* Title + headline number */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 font-medium mb-0.5">{group.subtitle}</p>
                <p className="text-lg font-bold text-gray-800">{group.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-black" style={{ color: group.color }}>
                    {group.headline}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: group.bg, color: group.color }}
                  >
                    {group.kpis.length} مؤشرات
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div>
                {group.Component && data
                  ? <group.Component data={data} />
                  : <div className="h-32 rounded-xl animate-pulse" style={{ background: group.bg }} />
                }
              </div>
            </div>

            {/* ══ يسار: KPI Cards مع Progress Bars ══ */}
            <div className="md:w-1/3 p-6 flex flex-col justify-center gap-3">
              {group.kpis.map((kpi) => {
                const progress = Math.min(Math.abs(Number(kpi.progress) * 100), 100);
                return (
                  <div
                    key={kpi.label}
                    className="rounded-xl p-4 transition-all duration-200 hover:scale-[1.01]"
                    style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      {/* Icon + Label */}
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: group.bg }}
                        >
                          <group.icon className="w-3.5 h-3.5" style={{ color: group.color }} />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{kpi.label}</span>
                      </div>
                      {/* Value */}
                      <span className="text-sm font-black" style={{ color: group.color }}>
                        {kpi.value}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}88)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};





