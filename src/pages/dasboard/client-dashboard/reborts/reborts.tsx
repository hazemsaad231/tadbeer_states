import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Plus, X, TrendingUp, BarChart2, DollarSign, Trash2, AlertTriangle, Edit2, Eye, Download, Calendar } from 'lucide-react'
import { useFetch } from '../../../../hooks/useFetch'
import { API_BASE } from '../../../../api/api'
import { success as toastSuccess, Error as toastError } from '../../../../ui/toasts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface FinancialRecord {
  id: number
  user_id: number
  created_at: string
  updated_at: string
  year: { id: number; year: number; created_at: string }
  income_statement: {
    revenues: string
    direct_expenses: string
    cost_of_goods_sold: string
    gross_profit: string
    administrative_expenses: string
    marketing_expenses: string
    net_profit: string
  }
  balance_sheet: {
    fixed_assets: string
    current_assets: string
    cash_and_equivalents: string
    receivables: string
    inventory: string
    current_liabilities: string
    creditors: string
    accrued_expenses: string
    long_term_liabilities: string
    loans: string
    end_of_service_provision: string
    equity: string
    capital: string
    retained_earnings: string
  }
  financial_indicators: {
    contribution_margin: number
    debt_ratio: number
    liquidity_ratio: number
    profitability_ratio: number
    working_capital: number
  }
}

const fmt = (v: number | null) =>
  v == null ? '—' : v.toLocaleString('ar-SA', { maximumFractionDigits: 2 })

const TableSection = ({
  title,
  icon: Icon,
  iconColor,
  rows,
  valueColor = '#14184C',
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

const Reports = () => {

  const [selectedRecord, setSelectedRecord] = useState<FinancialRecord | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)
  const [pdfRecord, setPdfRecord] = useState<FinancialRecord | null>(null)
  const pdfRef = useRef<HTMLDivElement>(null)

  const { data, loading, error, refetch, deleteItem, deleteLoading } = useFetch<FinancialRecord[]>(`${API_BASE}/financial-records`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })

  const records = useMemo(() => {
    if (!data) return []
    if (Array.isArray(data)) return data
    if (typeof data === 'object' && 'financial_records' in data) {
      const financialRecords = (data as any).financial_records
      if (Array.isArray(financialRecords)) return financialRecords
    }
    return []
  }, [data])

  const downloadReportPDF = async (record: FinancialRecord) => {
  try {
    // 1. ضع البيانات في الـ hidden div
    setPdfRecord(record)

    // 2. انتظر الـ render
    await new Promise(resolve => setTimeout(resolve, 300))

    if (!pdfRef.current) return

    // 3. صوّر الـ div
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll<HTMLElement>('*').forEach((el) => {
          const style = window.getComputedStyle(el)
          if (style.backgroundColor?.includes('oklch')) el.style.backgroundColor = '#ffffff'
          if (style.color?.includes('oklch')) el.style.color = '#333333'
          if (style.borderColor?.includes('oklch')) el.style.borderColor = '#e5e7eb'
        })
      },
    })

    // 4. احسب الأبعاد
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // 5. لو الصورة أطول من صفحة واحدة، قسّمها
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position -= pageHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // 6. حمّل
    pdf.save(`Tadbeer_Report_${record.year?.year || 'FY'}_${record.id}.pdf`)
    toastSuccess('تم تحميل التقرير بنجاح')
  } catch (error) {
    console.error('PDF Error:', error)
    toastError('فشل في إنشاء ملف PDF')
  } finally {
    setPdfRecord(null)
  }
}

  return (
    <div className="bg-white p-2 md:p-5 rounded-2xl" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #f0f2f5' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: '#14184C' }}>التقارير المالية</h1>
          <p className="text-gray-400 mt-1 text-xs sm:text-sm">جميع السجلات المالية الخاصة بك</p>
        </div>
        <Link
          to="/dashboard/new-report"
          className="w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: '#14184C', boxShadow: '0 4px 20px rgba(20,24,76,0.25)' }}
        >
          <Plus className="w-4 h-4" />
          تقرير جديد
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="w-8 h-8 rounded-full border-4 border-gray-200 animate-spin" style={{ borderTopColor: '#14184C' }} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-100">{error}</div>
      )}

      {/* Empty */}
      {!loading && !error && records.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(20,24,76,0.06)' }}>
            <FileText className="w-8 h-8" style={{ color: '#14184C' }} />
          </div>
          <p className="text-gray-400 text-sm">لا توجد تقارير حتى الآن</p>
          <Link
            to="/dashboard/new-report"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm"
            style={{ backgroundColor: 'var(--scondary)' }}
          >
            <Plus className="w-4 h-4" />
            أنشئ تقريرك الأول
          </Link>
        </div>
      )}

      {/* Records Table */}
      {!loading && records.length > 0 && (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #f0f2f5' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr style={{ backgroundColor: 'rgba(20,24,76,0.04)', borderBottom: '2px solid #f0f2f5' }}>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>السنة</th>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>الإيرادات</th>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>الربح الإجمالي</th>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>صافي الربح</th>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>حقوق الملكية</th>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>نسبة الربحية</th>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>نسبة السيولة</th>
                  <th className="py-3 px-4 text-xs font-bold" style={{ color: '#14184C' }}>التاريخ</th>
                  <th className="py-3 px-4 text-xs font-bold text-center" style={{ color: '#14184C' }}>إجراء</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors"
                    style={{ borderBottom: i < records.length - 1 ? '1px solid #f0f2f5' : 'none' }}
                  >
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(20,24,76,0.08)', color: '#14184C' }}>
                        {record.year?.year || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>
                      {fmt(Number(record.income_statement?.revenues || 0))}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#14184C' }}>
                      {fmt(Number(record.income_statement?.gross_profit || 0))}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>
                      {fmt(Number(record.income_statement?.net_profit || 0))}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#14184C' }}>
                      {fmt(Number(record.balance_sheet?.equity || 0))}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>
                      {record.financial_indicators?.profitability_ratio?.toFixed(2) || '0.00'}%
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>
                      {record.financial_indicators?.liquidity_ratio?.toFixed(4) || '0.0000'}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {new Date(record.created_at).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="p-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-80"
                          style={{ backgroundColor: '#10B981' }}
                          title="عرض التفاصيل"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          to={`/dashboard/new-report/${record.id}`}
                          className="p-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-80"
                          style={{ backgroundColor: '#3b82f6' }}
                          title="تعديل التقرير"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => downloadReportPDF(record)}
                          className="p-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-80"
                          style={{ backgroundColor: '#d4af5f' }}
                          title="تحميل كملف"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(record.id)}
                          disabled={deleteLoading && deletingId === record.id}
                          className="p-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-80 disabled:opacity-50"
                          style={{ backgroundColor: '#ef4444' }}
                          title="حذف التقرير"
                        >
                          {deleteLoading && deletingId === record.id
                            ? <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======= Hidden PDF Template ======= */}
      {pdfRecord && (
        <div
          ref={pdfRef}
          dir="rtl"
          style={{
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            width: '794px',
            backgroundColor: '#ffffff',
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {/* PDF Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '2px solid #14184C', paddingBottom: '20px' }}>
            <h1 style={{ color: '#14184C', fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>تقرير المؤشرات المالية</h1>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
              رقم التقرير: #{pdfRecord.id} &nbsp;|&nbsp; السنة المالية: {pdfRecord.year?.year} &nbsp;|&nbsp; تاريخ الإصدار: {new Date().toLocaleDateString('ar-SA')}
            </p>
          </div>

          {/* قائمة الدخل */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#14184C', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', padding: '8px 12px', backgroundColor: 'rgba(20,24,76,0.06)', borderRadius: '8px' }}>قائمة الدخل</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>البند</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>القيمة</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'الإيرادات', value: fmt(Number(pdfRecord.income_statement.revenues)) },
                  { label: 'المصروفات المباشرة', value: fmt(Number(pdfRecord.income_statement.direct_expenses)) },
                  { label: 'تكلفة البضاعة المباعة', value: fmt(Number(pdfRecord.income_statement.cost_of_goods_sold)) },
                  { label: 'الربح الإجمالي', value: fmt(Number(pdfRecord.income_statement.gross_profit)) },
                  { label: 'المصروفات الإدارية', value: fmt(Number(pdfRecord.income_statement.administrative_expenses)) },
                  { label: 'مصروفات التسويق', value: fmt(Number(pdfRecord.income_statement.marketing_expenses)) },
                  { label: 'صافي الربح', value: fmt(Number(pdfRecord.income_statement.net_profit)) },
                ].map((row, i) => (
                  <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', color: '#374151' }}>{row.label}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', textAlign: 'left', color: '#10B981', fontWeight: 'bold' }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* الميزانية العمومية */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#14184C', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', padding: '8px 12px', backgroundColor: 'rgba(20,24,76,0.06)', borderRadius: '8px' }}>الميزانية العمومية</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>البند</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>القيمة</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'الأصول الثابتة', value: fmt(Number(pdfRecord.balance_sheet.fixed_assets)) },
                  { label: 'الأصول المتداولة', value: fmt(Number(pdfRecord.balance_sheet.current_assets)) },
                  { label: 'النقدية وما يعادلها', value: fmt(Number(pdfRecord.balance_sheet.cash_and_equivalents)) },
                  { label: 'الذمم المدينة', value: fmt(Number(pdfRecord.balance_sheet.receivables)) },
                  { label: 'المخزون', value: fmt(Number(pdfRecord.balance_sheet.inventory)) },
                  { label: 'الالتزامات المتداولة', value: fmt(Number(pdfRecord.balance_sheet.current_liabilities)) },
                  { label: 'الدائنون', value: fmt(Number(pdfRecord.balance_sheet.creditors)) },
                  { label: 'المصروفات المستحقة', value: fmt(Number(pdfRecord.balance_sheet.accrued_expenses)) },
                  { label: 'الالتزامات طويلة الأجل', value: fmt(Number(pdfRecord.balance_sheet.long_term_liabilities)) },
                  { label: 'القروض', value: fmt(Number(pdfRecord.balance_sheet.loans)) },
                  { label: 'مخصص نهاية الخدمة', value: fmt(Number(pdfRecord.balance_sheet.end_of_service_provision)) },
                  { label: 'حقوق الملكية', value: fmt(Number(pdfRecord.balance_sheet.equity)) },
                  { label: 'رأس المال', value: fmt(Number(pdfRecord.balance_sheet.capital)) },
                  { label: 'الأرباح المحتجزة', value: fmt(Number(pdfRecord.balance_sheet.retained_earnings)) },
                ].map((row, i) => (
                  <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', color: '#374151' }}>{row.label}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', textAlign: 'left', color: '#14184C', fontWeight: 'bold' }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* المؤشرات المالية */}
          <div>
            <h2 style={{ color: '#14184C', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', padding: '8px 12px', backgroundColor: 'rgba(20,24,76,0.06)', borderRadius: '8px' }}>المؤشرات المالية</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>البند</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>القيمة</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'نسبة الربحية', value: `${(pdfRecord.financial_indicators.profitability_ratio * 100).toFixed(2)}%` },
                  { label: 'نسبة السيولة', value: `${(pdfRecord.financial_indicators.liquidity_ratio * 100).toFixed(4)}%` },
                  { label: 'نسبة الديون', value: `${(pdfRecord.financial_indicators.debt_ratio * 100).toFixed(2)}%` },
                  { label: 'هامش المساهمة', value: `${pdfRecord.financial_indicators.contribution_margin?.toFixed(2)}` },
                  { label: 'رأس المال العامل', value: fmt(pdfRecord.financial_indicators.working_capital) },
                ].map((row, i) => (
                  <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', color: '#374151' }}>{row.label}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f0f2f5', textAlign: 'left', color: '#10B981', fontWeight: 'bold' }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmDeleteId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setConfirmDeleteId(null)}
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
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2 rounded-xl text-sm font-bold border transition-all hover:bg-gray-50"
                style={{ color: '#14184C', borderColor: '#e5e7eb' }}
              >
                إلغاء
              </button>
              <button
                onClick={async () => {
                  const id = confirmDeleteId
                  setConfirmDeleteId(null)
                  setDeletingId(id)
                  const ok = await deleteItem(`${API_BASE}/financial-records/${id}`)
                  setDeletingId(null)
                  if (ok) {
                    toastSuccess('تم حذف السجل بنجاح')
                    refetch()
                  } else {
                    toastError('فشل حذف السجل، حاول مرة أخرى')
                  }
                }}
                className="flex-1 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-80"
                style={{ backgroundColor: '#ef4444' }}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sticky top-0 bg-white z-10" style={{ borderBottom: '1px solid #f0f2f5' }}>
              <button onClick={() => setSelectedRecord(null)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
              <div className="text-right">
                <h2 className="text-base font-bold" style={{ color: '#14184C' }}>تفاصيل السجل #{selectedRecord.id}</h2>
                <p className="text-xs text-gray-400">السنة المالية: {selectedRecord.year?.year}</p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <TableSection
                title="السنة المالية"
                icon={Calendar}
                iconColor="#10B981"
                valueColor="#14184C"
                rows={[
                  { label: 'السنة المالية', value: selectedRecord.year?.year ? String(selectedRecord.year.year) : 'لم يتم الاختيار' },
                ]}
              />
              <TableSection
                title="قائمة الدخل"
                icon={TrendingUp}
                iconColor="#10B981"
                valueColor="#10B981"
                rows={[
                  { label: 'الإيرادات', value: fmt(Number(selectedRecord.income_statement.revenues)) },
                  { label: 'المصروفات المباشرة', value: fmt(Number(selectedRecord.income_statement.direct_expenses)) },
                  { label: 'تكلفة البضاعة المباعة', value: fmt(Number(selectedRecord.income_statement.cost_of_goods_sold)) },
                  { label: 'الربح الإجمالي', value: fmt(Number(selectedRecord.income_statement.gross_profit)) },
                  { label: 'المصروفات الإدارية', value: fmt(Number(selectedRecord.income_statement.administrative_expenses)) },
                  { label: 'مصروفات التسويق', value: fmt(Number(selectedRecord.income_statement.marketing_expenses)) },
                  { label: 'صافي الربح', value: fmt(Number(selectedRecord.income_statement.net_profit)) },
                ]}
              />
              <TableSection
                title="الميزانية العمومية"
                icon={BarChart2}
                iconColor="#10B981"
                valueColor="#14184C"
                rows={[
                  { label: 'الأصول الثابتة', value: fmt(Number(selectedRecord.balance_sheet.fixed_assets)) },
                  { label: 'الأصول المتداولة', value: fmt(Number(selectedRecord.balance_sheet.current_assets)) },
                  { label: 'النقدية وما يعادلها', value: fmt(Number(selectedRecord.balance_sheet.cash_and_equivalents)) },
                  { label: 'الذمم المدينة', value: fmt(Number(selectedRecord.balance_sheet.receivables)) },
                  { label: 'المخزون', value: fmt(Number(selectedRecord.balance_sheet.inventory)) },
                  { label: 'الالتزامات المتداولة', value: fmt(Number(selectedRecord.balance_sheet.current_liabilities)) },
                  { label: 'الدائنون', value: fmt(Number(selectedRecord.balance_sheet.creditors)) },
                  { label: 'المصروفات المستحقة', value: fmt(Number(selectedRecord.balance_sheet.accrued_expenses)) },
                  { label: 'الالتزامات طويلة الأجل', value: fmt(Number(selectedRecord.balance_sheet.long_term_liabilities)) },
                  { label: 'القروض', value: fmt(Number(selectedRecord.balance_sheet.loans)) },
                  { label: 'مخصص نهاية الخدمة', value: fmt(Number(selectedRecord.balance_sheet.end_of_service_provision)) },
                  { label: 'حقوق الملكية', value: fmt(Number(selectedRecord.balance_sheet.equity)) },
                  { label: 'رأس المال', value: fmt(Number(selectedRecord.balance_sheet.capital)) },
                  { label: 'الأرباح المحتجزة', value: fmt(Number(selectedRecord.balance_sheet.retained_earnings)) },
                ]}
              />
              <TableSection
                title="المؤشرات المالية"
                icon={DollarSign}
                iconColor="#10B981"
                valueColor="#10B981"
                rows={[
                  { label: 'نسبة الربحية', value: `${(selectedRecord.financial_indicators.profitability_ratio * 100).toFixed(2)}%` },
                  { label: 'نسبة السيولة', value: `${(selectedRecord.financial_indicators.liquidity_ratio * 100).toFixed(4)}%` },
                  { label: 'نسبة الديون', value: `${(selectedRecord.financial_indicators.debt_ratio * 100).toFixed(2)}%` },
                  { label: 'هامش المساهمة', value: `${selectedRecord.financial_indicators.contribution_margin?.toFixed(2)}` },
                  { label: 'رأس المال العامل', value: fmt(selectedRecord.financial_indicators.working_capital) },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
