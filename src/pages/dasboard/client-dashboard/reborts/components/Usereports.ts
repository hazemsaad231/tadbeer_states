import { useState, useMemo, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useFetch } from '../../../../../hooks/useFetch'
import { API_BASE } from '../../../../../api/api'
import { success as toastSuccess, Error as toastError } from '../../../../../ui/toasts'
import type { FinancialRecord } from '../../../../../types/types'

export const fmt = (v: number | null) =>
  v == null ? '—' : v.toLocaleString('ar-SA', { maximumFractionDigits: 2 })

export const useReports = () => {
  const [selectedRecord, setSelectedRecord]   = useState<FinancialRecord | null>(null)
  const [deletingId, setDeletingId]           = useState<number | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)
  const [pdfRecord, setPdfRecord]             = useState<FinancialRecord | null>(null)
  const pdfRef = useRef<HTMLDivElement>(null)

  const { data, loading, error, refetch, deleteItem, deleteLoading } =
    useFetch<FinancialRecord[]>(`${API_BASE}/financial-records`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

  const records = useMemo<FinancialRecord[]>(() => {
    if (!data) return []
    if (Array.isArray(data)) return data
    if (typeof data === 'object' && 'financial_records' in data) {
      const list = (data as any).financial_records
      if (Array.isArray(list)) return list
    }
    return []
  }, [data])

  const downloadReportPDF = async (record: FinancialRecord) => {
    try {
      setPdfRecord(record)
      await new Promise((resolve) => setTimeout(resolve, 300))
      if (!pdfRef.current) return

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          clonedDoc.querySelectorAll<HTMLElement>('*').forEach((el) => {
            const s = window.getComputedStyle(el)
            if (s.backgroundColor?.includes('oklch')) el.style.backgroundColor = '#ffffff'
            if (s.color?.includes('oklch'))           el.style.color            = '#333333'
            if (s.borderColor?.includes('oklch'))     el.style.borderColor      = '#e5e7eb'
          })
        },
      })

      const imgData    = canvas.toDataURL('image/png')
      const pdf        = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW      = pdf.internal.pageSize.getWidth()
      const pageH      = pdf.internal.pageSize.getHeight()
      const imgH       = (canvas.height * pageW) / canvas.width
      let   heightLeft = imgH
      let   position   = 0

      pdf.addImage(imgData, 'PNG', 0, position, pageW, imgH)
      heightLeft -= pageH
      while (heightLeft > 0) {
        position -= pageH
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, pageW, imgH)
        heightLeft -= pageH
      }

      pdf.save(`Tadbeer_Report_${record.year?.year || 'FY'}_${record.id}.pdf`)
      toastSuccess('تم تحميل التقرير بنجاح')
    } catch (err) {
      console.error('PDF Error:', err)
      toastError('فشل في إنشاء ملف PDF')
    } finally {
      setPdfRecord(null)
    }
  }

  const handleConfirmDelete = async () => {
    if (confirmDeleteId === null) return
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
  }

  return {
    records, loading, error,
    selectedRecord, setSelectedRecord,
    deletingId, deleteLoading,
    confirmDeleteId, setConfirmDeleteId,
    pdfRecord, pdfRef,
    downloadReportPDF,
    handleConfirmDelete,
  }
}