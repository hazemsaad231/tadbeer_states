import { forwardRef } from 'react'
import { fmt } from './Usereports'
import type { FinancialRecord } from '../../../../../types/types'

const PdfTemplate = forwardRef<HTMLDivElement, { record: FinancialRecord }>(({ record }, ref) => (
  <div
    ref={ref}
    dir="rtl"
    style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '794px', backgroundColor: '#ffffff', padding: '40px', fontFamily: 'Arial, sans-serif' }}
  >
    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '2px solid #14184C', paddingBottom: '20px' }}>
      <h1 style={{ color: '#14184C', fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>تقرير المؤشرات المالية</h1>
      <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
        رقم التقرير: #{record.id} &nbsp;|&nbsp; السنة المالية: {record.year?.year} &nbsp;|&nbsp; تاريخ الإصدار: {new Date().toLocaleDateString('ar-SA')}
      </p>
    </div>

    <PdfSection title="قائمة الدخل" valueColor="#10B981" rows={[
      { label: 'الإيرادات',             value: fmt(Number(record.income_statement.revenues)) },
      { label: 'المصروفات المباشرة',    value: fmt(Number(record.income_statement.direct_expenses)) },
      { label: 'تكلفة البضاعة المباعة', value: fmt(Number(record.income_statement.cost_of_goods_sold)) },
      { label: 'الربح الإجمالي',        value: fmt(Number(record.income_statement.gross_profit)) },
      { label: 'المصروفات الإدارية',    value: fmt(Number(record.income_statement.administrative_expenses)) },
      { label: 'مصروفات التسويق',       value: fmt(Number(record.income_statement.marketing_expenses)) },
      { label: 'صافي الربح',            value: fmt(Number(record.income_statement.net_profit)) },
    ]} />

    <PdfSection title="الميزانية العمومية" valueColor="#14184C" rows={[
      { label: 'الأصول الثابتة',         value: fmt(Number(record.balance_sheet.fixed_assets)) },
      { label: 'الأصول المتداولة',       value: fmt(Number(record.balance_sheet.current_assets)) },
      { label: 'النقدية وما يعادلها',    value: fmt(Number(record.balance_sheet.cash_and_equivalents)) },
      { label: 'الذمم المدينة',          value: fmt(Number(record.balance_sheet.receivables)) },
      { label: 'المخزون',                value: fmt(Number(record.balance_sheet.inventory)) },
      { label: 'الالتزامات المتداولة',   value: fmt(Number(record.balance_sheet.current_liabilities)) },
      { label: 'الدائنون',               value: fmt(Number(record.balance_sheet.creditors)) },
      { label: 'المصروفات المستحقة',     value: fmt(Number(record.balance_sheet.accrued_expenses)) },
      { label: 'الالتزامات طويلة الأجل', value: fmt(Number(record.balance_sheet.long_term_liabilities)) },
      { label: 'القروض',                 value: fmt(Number(record.balance_sheet.loans)) },
      { label: 'مخصص نهاية الخدمة',     value: fmt(Number(record.balance_sheet.end_of_service_provision)) },
      { label: 'حقوق الملكية',           value: fmt(Number(record.balance_sheet.equity)) },
      { label: 'رأس المال',              value: fmt(Number(record.balance_sheet.capital)) },
      { label: 'الأرباح المحتجزة',       value: fmt(Number(record.balance_sheet.retained_earnings)) },
    ]} />

    <PdfSection title="المؤشرات المالية" valueColor="#10B981" rows={[
      { label: 'نسبة الربحية',    value: `${(record.financial_indicators.profitability_ratio * 100).toFixed(2)}%` },
      { label: 'نسبة السيولة',    value: `${(record.financial_indicators.liquidity_ratio * 100).toFixed(4)}%` },
      { label: 'نسبة الديون',     value: `${(record.financial_indicators.debt_ratio * 100).toFixed(2)}%` },
      { label: 'هامش المساهمة',  value: `${record.financial_indicators.contribution_margin?.toFixed(2)}` },
      { label: 'رأس المال العامل', value: fmt(record.financial_indicators.working_capital) },
    ]} />
  </div>
))

PdfTemplate.displayName = 'PdfTemplate'
export default PdfTemplate

// ─── Internal helper ─────────────────────────────────────────────────────────

const PdfSection = ({ title, rows, valueColor }: { title: string; rows: { label: string; value: string }[]; valueColor: string }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2 style={{ color: '#14184C', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', padding: '8px 12px', backgroundColor: 'rgba(20,24,76,0.06)', borderRadius: '8px' }}>
      {title}
    </h2>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f9fafb' }}>
          <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>البند</th>
          <th style={{ padding: '8px 12px', textAlign: 'left',  borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>القيمة</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f9fafb' }}>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', color: '#374151' }}>{row.label}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', textAlign: 'left', color: valueColor, fontWeight: 'bold' }}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)