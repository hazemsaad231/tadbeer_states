import { TrendingUp, DollarSign, Target, Percent } from 'lucide-react';
import type { ClientStats } from '../../../../../types/types';

export const BestPerformingYear = ({ data }: { data: ClientStats | null }) => {
  if (!data?.best_performing_year) return null;

  console.log('Best Performing Year Data:', data);
  const profitMargin = (
    (Number(data.best_performing_year.net_profit) / Number(data.best_performing_year.revenues)) * 100
  ).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#14184C]/5 to-transparent rounded-full blur-3xl z-0" />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-linear-to-br from-[#14184C] via-[#1a1f5c] to-[#10B981] shadow-xl relative">
            <div className="absolute inset-0 bg-white/10 rounded-2xl" />
            <TrendingUp className="w-7 h-7 text-white relative z-10" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#14184C] mb-1">السنة الأفضل</h3>
            <p className="text-sm text-gray-500 font-medium">السنة الأكثر ربحية</p>
          </div>
        </div>
        <div className="text-center px-5 py-2 rounded-xl bg-linear-to-br from-[#14184C]/10 to-[#10B981]/10 border-2 border-[#14184C]/20">
          <p className="text-xs text-gray-500 font-semibold mb-1">السنة</p>
          <span className="text-4xl font-black bg-linear-to-r from-[#14184C] to-[#10B981] bg-clip-text text-transparent">
            {data.best_performing_year.year}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-5 relative z-10">
        {/* الإيرادات */}
        <div 
          className="p-5 rounded-2xl border-2 border-transparent hover:border-[#10B981]/30 hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden"
          style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#10B981]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-[#10B981] flex items-center justify-center shadow-md">
              <DollarSign className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-xs text-gray-600 font-bold">الإيرادات</p>
          </div>
          <p className="text-2xl font-black text-[#10B981] relative z-10">
            {Number(data.best_performing_year.revenues).toLocaleString('ar-SA', { maximumFractionDigits: 0 })}
          </p>
          <div className="mt-2 h-1 w-16 bg-[#10B981] rounded-full" />
        </div>

        {/* صافي الربح */}
        <div 
          className="p-5 rounded-2xl border-2 border-transparent hover:border-[#14184C]/30 hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden"
          style={{ backgroundColor: 'rgba(20,24,76,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#14184C]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-[#14184C] flex items-center justify-center shadow-md">
              <Target className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-xs text-gray-600 font-bold">صافي الربح</p>
          </div>
          <p className="text-2xl font-black text-[#14184C] relative z-10">
            {Number(data.best_performing_year.net_profit).toLocaleString('ar-SA', { maximumFractionDigits: 0 })}
          </p>
          <div className="mt-2 h-1 w-16 bg-[#14184C] rounded-full" />
        </div>

        {/* هامش الربح الصافي */}
        <div 
          className="p-5 rounded-2xl col-span-2 border-2 border-transparent hover:border-[#D4AF5F]/30 hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden"
          style={{ backgroundColor: 'rgba(212,175,95,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF5F]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#D4AF5F] to-[#B8935A] flex items-center justify-center shadow-md">
                  <Percent className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-xs text-gray-600 font-bold">هامش الربح الصافي</p>
              </div>
              <p className="text-3xl font-black text-[#D4AF5F]">
                {profitMargin}%
              </p>
              <div className="mt-3 h-1 w-24 bg-linear-to-r from-[#D4AF5F] to-[#FFD700] rounded-full" />
            </div>
            
            {/* Progress Circle */}
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="rgba(212,175,95,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - parseFloat(profitMargin) / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF5F" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-[#D4AF5F]">{profitMargin}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 relative z-10">
        <div className="w-2 h-2 rounded-full bg-[#10B981]" />
        <div className="w-2 h-2 rounded-full bg-[#14184C]" />
        <div className="w-2 h-2 rounded-full bg-[#D4AF5F]" />
      </div>
    </div>
  );
};