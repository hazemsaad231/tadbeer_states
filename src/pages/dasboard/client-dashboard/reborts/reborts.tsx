import { Link } from 'react-router-dom'
import { FileText, Plus, Eye, Edit2, Download, Trash2 } from 'lucide-react'
import { useReports, fmt } from './components/Usereports'
import { DeleteConfirmDialog, DetailsModal } from './components/Modals'
import PdfTemplate from './components/Pdftemplate'

const HEADERS = ['السنة','الإيرادات','الربح الإجمالي','صافي الربح','حقوق الملكية','نسبة الربحية','نسبة السيولة','التاريخ','إجراء']

const Reports = () => {
  const {
    records, loading, error,
    selectedRecord, setSelectedRecord,
    deletingId, deleteLoading,
    confirmDeleteId, setConfirmDeleteId,
    pdfRecord, pdfRef,
    downloadReportPDF,
    handleConfirmDelete,
  } = useReports()

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
          <Plus className="w-4 h-4" /> تقرير جديد
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="w-8 h-8 rounded-full border-4 border-gray-200 animate-spin" style={{ borderTopColor: '#14184C' }} />
        </div>
      )}

      {/* Error */}
      {error && <div className="mb-4 p-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-100">{error}</div>}

      {/* Empty */}
      {!loading && !error && records.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(20,24,76,0.06)' }}>
            <FileText className="w-8 h-8" style={{ color: '#14184C' }} />
          </div>
          <p className="text-gray-400 text-sm">لا توجد تقارير حتى الآن</p>
          <Link to="/dashboard/new-report" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: 'var(--scondary)' }}>
            <Plus className="w-4 h-4" /> أنشئ تقريرك الأول
          </Link>
        </div>
      )}

      {/* Table */}
      {!loading && records.length > 0 && (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #f0f2f5' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr style={{ backgroundColor: 'rgba(20,24,76,0.04)', borderBottom: '2px solid #f0f2f5' }}>
                  {HEADERS.map((h) => (
                    <th key={h} className={`py-3 px-4 text-xs font-bold${h === 'إجراء' ? ' text-center' : ''}`} style={{ color: '#14184C' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: i < records.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(20,24,76,0.08)', color: '#14184C' }}>
                        {record.year?.year || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>{fmt(Number(record.income_statement?.revenues || 0))}</td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#14184C' }}>{fmt(Number(record.income_statement?.gross_profit || 0))}</td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>{fmt(Number(record.income_statement?.net_profit || 0))}</td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#14184C' }}>{fmt(Number(record.balance_sheet?.equity || 0))}</td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>{record.financial_indicators?.profitability_ratio?.toFixed(2) || '0.00'}%</td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: '#10B981' }}>{record.financial_indicators?.liquidity_ratio?.toFixed(4) || '0.0000'}</td>
                    <td className="py-3 px-4 text-xs text-gray-400">{new Date(record.created_at).toLocaleDateString('ar-SA')}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setSelectedRecord(record)} className="p-1.5 rounded-lg text-white hover:opacity-80" style={{ backgroundColor: '#10B981' }} title="عرض التفاصيل">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <Link to={`/dashboard/new-report/${record.id}`} className="p-1.5 rounded-lg text-white hover:opacity-80" style={{ backgroundColor: '#3b82f6' }} title="تعديل التقرير">
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button onClick={() => downloadReportPDF(record)} className="p-1.5 rounded-lg text-white hover:opacity-80" style={{ backgroundColor: '#d4af5f' }} title="تحميل كملف">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(record.id)}
                          disabled={deleteLoading && deletingId === record.id}
                          className="p-1.5 rounded-lg text-white hover:opacity-80 disabled:opacity-50"
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

      {/* PDF Template (hidden) */}
      {pdfRecord && <PdfTemplate ref={pdfRef} record={pdfRecord} />}

      {/* Modals */}
      {confirmDeleteId !== null && (
        <DeleteConfirmDialog onCancel={() => setConfirmDeleteId(null)} onConfirm={handleConfirmDelete} />
      )}
      {selectedRecord && (
        <DetailsModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </div>
  )
}

export default Reports