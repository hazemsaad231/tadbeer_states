import { TrendingUp, Droplets, Scale, Activity } from 'lucide-react';
import type { ClientStats } from '../../types';
import { fmt } from '../utils';
import { ProfitabilityChart } from './charts/ProfitabilityChart';
import { LiquidityChart } from './charts/LiquidityChart';
import { LeverageChart } from './charts/LeverageChart';
import { ActivityChart } from './charts/ActivityChart';

export const RatioSections = ({ data }: { data: ClientStats | null }) => {
  const sections = [


          {
      title: 'نسب الرفع المالي',
      icon: Scale,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.08)',
      ratios: [
        { label: 'نسبة الدين إلى حقوق الملكية', value: fmt(data?.financial_ratios?.leverage_ratios?.debt_to_equity ?? null, true) },
        { label: 'نسبة الدين إلى الأصول', value: fmt(data?.financial_ratios?.leverage_ratios?.debt_ratio ?? null, true) },
      ],
      Component: LeverageChart,
    },

      {
      title: 'نسب النشاط',
      icon: Activity,
      color: '#3B82F6',
      bg: 'rgba(59,130,246,0.08)',
      ratios: [
        { label: 'دوران الأصول', value: fmt(data?.financial_ratios?.activity_ratios?.asset_turnover ?? null, true) },
        { label: 'دوران المخزون', value: fmt(data?.financial_ratios?.activity_ratios?.inventory_turnover ?? null, true) },
      ],
      Component: ActivityChart,
    },
    {
      title: 'نسب الربحية',
      icon: TrendingUp,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.08)',
      ratios: [
        { label: 'هامش الربح الإجمالي', value: fmt(data?.financial_ratios?.profitability_ratios?.gross_profit_margin ?? null, true) },
        { label: 'هامش صافي الربح', value: fmt(data?.financial_ratios?.profitability_ratios?.net_profit_margin ?? null, true) },
        { label: 'العائد على الأصول', value: fmt(data?.financial_ratios?.profitability_ratios?.return_on_assets ?? null, true) },
        { label: 'العائد على حقوق الملكية', value: fmt(data?.financial_ratios?.profitability_ratios?.return_on_equity ?? null, true) },
      ],
      Component: ProfitabilityChart,
    },
  

    {
      title: 'نسب السيولة',
      icon: Droplets,
      color: '#D4AF5F',
      bg: 'rgba(212,175,95,0.08)',
      ratios: [
        { label: 'نسبة النقدية', value: fmt(data?.financial_ratios?.liquidity_ratios?.cash_ratio ?? null, true) },
        { label: 'نسبة التداول', value: fmt(data?.financial_ratios?.liquidity_ratios?.current_ratio ?? null, true) },
        { label: 'نسبة السيولة السريعة', value: fmt(data?.financial_ratios?.liquidity_ratios?.quick_ratio ?? null, true) },
      ],
      Component: LiquidityChart,
    },

  
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {sections.map((sec) => (
        <div 
          key={sec.title} 
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm" 
              style={{ backgroundColor: sec.bg }}
            >
              <sec.icon className="w-6 h-6" style={{ color: sec.color }} />
            </div>
            <h4 className="text-lg font-bold" style={{ color: sec.color }}>
              {sec.title}
            </h4>
          </div>
          
          {/* Chart */}
          {sec.Component && data && (
            <div className="mb-5">
              <sec.Component data={data} />
            </div>
          )}

          {/* Ratios List */}
          <div className="space-y-2.5">
            {sec.ratios.map((r, idx) => (
              <div 
                key={r.label} 
                className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                style={{
                  borderRight: `3px solid ${idx === 0 ? sec.color : 'transparent'}`,
                }}
              >
                <span className="text-sm text-gray-700 font-medium">{r.label}</span>
                <span 
                  className="text-sm font-bold px-3 py-1 rounded-md" 
                  style={{ 
                    color: sec.color,
                    backgroundColor: sec.bg,
                  }}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};