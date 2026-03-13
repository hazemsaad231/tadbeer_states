import { useState, useEffect, useRef } from 'react';

export const AnimatedValue = ({
  target,
  isPercent = false,
  isCount = false,
  loading = false,
}: {
  target: number | null;
  isPercent?: boolean;
  isCount?: boolean;
  loading?: boolean;
}) => {
  const [display, setDisplay] = useState(isPercent ? '0.0%' : '0');
  const prevTarget = useRef<number | null>(null);

  useEffect(() => {
    if (loading) return;
    if (target == null || isNaN(Number(target))) {
      setDisplay('—');
      return;
    }
    if (prevTarget.current === target) return;
    prevTarget.current = target;

    const duration = 1200;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (step >= steps) {
        if (isPercent) setDisplay(`${(target * 100).toFixed(1)}%`);
        else if (isCount) setDisplay(String(Math.round(target)));
        else setDisplay(target.toLocaleString('ar-SA', { maximumFractionDigits: 2 }));
        clearInterval(timer);
      } else {
        if (isPercent) setDisplay(`${(current * 100).toFixed(1)}%`);
        else if (isCount) setDisplay(String(Math.round(current)));
        else setDisplay(Math.round(current).toLocaleString('ar-SA'));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, loading, isPercent, isCount]);

  return <>{display}</>;
};