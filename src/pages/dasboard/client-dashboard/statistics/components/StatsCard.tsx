import type { LucideIcon } from 'lucide-react';
import { AnimatedValue } from './AnimatedValue';



interface StatsCardProps {
  label: string;
  raw: number | null;
  icon: LucideIcon;
  color: string;
  bg: string;
  isPercent?: boolean;
  isCount?: boolean;
  suffix?: string;
  loading?: boolean;
}

export const StatsCard = ({
  label,
  raw,
  icon: Icon,
  color,
  bg,
  isPercent,
  isCount,
  suffix,
  loading,
}: StatsCardProps) => {
  const isNegative = raw !== null && raw < 0;
  const displayColor = isNegative ? '#EF4444' : color;

  return (
    <div
      className="relative rounded-2xl p-5 bg-white overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
      style={{
        border: '1px solid #eef0f6',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {/* خلفية ديكورية */}
      <div
        className="absolute -top-6 -left-6 w-40 h-40 rounded-full opacity-100 pointer-events-none"
        style={{ backgroundColor: bg }}
      />
      <div
        className="absolute -bottom-8 -right-4 w-20 h-20 rounded-full opacity-20 pointer-events-none"
        style={{ backgroundColor: bg }}
      />

      <div className="relative flex items-start justify-between gap-3">
        {/* النص */}
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-xs font-medium truncate" style={{ color: '#94a3b8' }}>
            {label}
          </p>

          <p className="text-2xl sm:text-3xl font-bold tracking-tight leading-none mt-1" style={{ color: displayColor }}>
            <AnimatedValue
              target={raw}
              isPercent={isPercent}
              isCount={isCount}
              loading={loading}
            />
            {suffix && raw !== null && (
              <span className="text-base font-semibold mr-1" style={{ color: displayColor, opacity: 0.7 }}>
                {suffix}
              </span>
            )}
          </p>

          {/* شريط تحت الرقم */}
          {/* <div className="flex items-center gap-1.5 mt-2">
            <div
              className="h-1 w-8 rounded-full"
              style={{ backgroundColor: displayColor, opacity: 0.3 }}
            />
            <div
              className="h-1 w-4 rounded-full"
              style={{ backgroundColor: displayColor, opacity: 0.15 }}
            />
          </div> */}
        </div>

        {/* الأيقونة */}
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-125"
          style={{ backgroundColor: bg }}
        >
          <Icon className="w-5 h-5" style={{ color: displayColor }} />
        </div>
      </div>
    </div>
  );
};