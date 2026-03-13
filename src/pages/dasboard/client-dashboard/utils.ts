export const fmt = (v: number | null, isPercent = false) =>
  v == null || !isFinite(v)
    ? '—'
    : isPercent
    ? `${(v * 100).toFixed(1)}%`
    : v.toLocaleString('ar-SA', { maximumFractionDigits: 2 });