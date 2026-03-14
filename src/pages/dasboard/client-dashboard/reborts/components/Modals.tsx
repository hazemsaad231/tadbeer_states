import { X, AlertTriangle, TrendingUp, BarChart2, DollarSign, Calendar } from 'lucide-react'
import { fmt } from './Usereports'
import type { FinancialRecord } from '../../../../../types/types'

// ─── Shared TableSection ─────────────────────────────────────────────────────

export const TableSection = ({
  title, icon: Icon, iconColor, rows, valueColor = '#14184C',
}: {
  title: string
  icon: any
  iconColor: string
  rows: { label: string; value: string }[]
  valueColor?: string
}) => (
  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #f0f2f5' }}>
    <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: 'rgba(20,24,76,0.04)', borderBottom: '1px solid #f0f2f5' }}>
      <Icon className="w-4 h-4" style={{ color: iconColor }} />
      <h3 className="text-sm font-bold" style={{ color: '#14184C' }}>{title}</h3>
    </div>
    <table className="w-full text-sm text-right">
      <thead>
        <tr style={{ borderBottom: '1px solid #f0f2f5', backgroundColor: '#fafafa' }}>
          <th className="py-2.5 px-4 text-xs font-semibold text-gray-400">البند</th>
          <th className="py-2.5 px-4 text-xs font-semibold text-gray-400 text-left">القيمة</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.label} style={{ borderBottom: i < rows.length - 1 ? '1px solid #f8fafc' : 'none', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
            <td className="py-2.5 px-4 text-xs text-gray-500">{row.label}</td>
            <td className="py-2.5 px-4 text-xs font-semibold text-left" style={{ color: valueColor }}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

export const DeleteConfirmDialog = ({
  onCancel, onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    onClick={onCancel}
  >
    <div
      className="bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col items-center gap-4"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef2f2' }}>
        <AlertTriangle className="w-7 h-7" style={{ color: '#ef4444' }} />
      </div>
      <div className="text-center">
        <h3 className="text-base font-bold mb-1" style={{ color: '#14184C' }}>تأكيد الحذف</h3>
        <p className="text-sm text-gray-400">هل أنت متأكد من حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.</p>
      </div>
      <div className="flex gap-3 w-full">
        <button onClick={onCancel} className="flex-1 py-2 rounded-xl text-sm font-bold border transition-all hover:bg-gray-50" style={{ color: '#14184C', borderColor: '#e5e7eb' }}>
          إلغاء
        </button>
        <button onClick={onConfirm} className="flex-1 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-80" style={{ backgroundColor: '#ef4444' }}>
          حذف
        </button>
      </div>
    </div>
  </div>
)

// ─── Details Modal ────────────────────────────────────────────────────────────

export const DetailsModal = ({
  record, onClose,
}: {
  record: FinancialRecord
  onClose: () => void
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 sticky top-0 bg-white z-10" style={{ borderBottom: '1px solid #f0f2f5' }}>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
        <div className="text-right">
          <h2 className="text-base font-bold" style={{ color: '#14184C' }}>تفاصيل السجل #{record.id}</h2>
          <p className="text-xs text-gray-400">السنة المالية: {record.year?.year}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-5">
        <TableSection
          title="السنة المالية" icon={Calendar} iconColor="#10B981" valueColor="#14184C"
          rows={[{ label: 'السنة المالية', value: record.year?.year ? String(record.year.year) : 'لم يتم الاختيار' }]}
        />
        <TableSection
          title="قائمة الدخل" icon={TrendingUp} iconColor="#10B981" valueColor="#10B981"
          rows={[
            { label: 'الإيرادات',             value: fmt(Number(record.income_statement.revenues)) },
            { label: 'المصروفات المباشرة',    value: fmt(Number(record.income_statement.direct_expenses)) },
            { label: 'تكلفة البضاعة المباعة', value: fmt(Number(record.income_statement.cost_of_goods_sold)) },
            { label: 'الربح الإجمالي',        value: fmt(Number(record.income_statement.gross_profit)) },
            { label: 'المصروفات الإدارية',    value: fmt(Number(record.income_statement.administrative_expenses)) },
            { label: 'مصروفات التسويق',       value: fmt(Number(record.income_statement.marketing_expenses)) },
            { label: 'صافي الربح',            value: fmt(Number(record.income_statement.net_profit)) },
          ]}
        />
        <TableSection
          title="الميزانية العمومية" icon={BarChart2} iconColor="#10B981" valueColor="#14184C"
          rows={[
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
          ]}
        />
        <TableSection
          title="المؤشرات المالية" icon={DollarSign} iconColor="#10B981" valueColor="#10B981"
          rows={[
            { label: 'نسبة الربحية',    value: `${(record.financial_indicators.profitability_ratio * 100).toFixed(2)}%` },
            { label: 'نسبة السيولة',    value: `${(record.financial_indicators.liquidity_ratio * 100).toFixed(4)}%` },
            { label: 'نسبة الديون',     value: `${(record.financial_indicators.debt_ratio * 100).toFixed(2)}%` },
            { label: 'هامش المساهمة',  value: `${record.financial_indicators.contribution_margin?.toFixed(2)}` },
            { label: 'رأس المال العامل', value: fmt(record.financial_indicators.working_capital) },
          ]}
        />
      </div>
    </div>
  </div>
)