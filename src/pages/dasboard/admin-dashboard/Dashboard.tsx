import { Link } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch';
import { API_BASE } from '../../../api/api';
import type { AdminStats } from '../types';
import { Plus, Building2, ChartNoAxesCombined, Users, CircleCheckBig, ArrowUpRight , Download, Sparkles } from 'lucide-react'



const recentReports = [
  { id: 'RPT-2026-001', company: 'مؤسسة السهم التجاري', status: 'مكتمل', date: '08/03/2026' },
  { id: 'RPT-2026-002', company: 'شركة الصفوة للحلول', status: 'قيد المراجعة', date: '07/03/2026' },
  { id: 'RPT-2026-003', company: 'مخابز الأندلس', status: 'مكتمل', date: '06/03/2026' },
  { id: 'RPT-2026-004', company: 'متجر النخبة الرقمي', status: 'قيد المراجعة', date: '05/03/2026' },
]

const barData = [30, 65, 45, 80, 55, 20, 90, 60, 75, 40, 95, 50]
const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']

// const lineData = [40, 55, 35, 70, 50, 85, 60, 75, 45, 90, 65, 95]
// const lineMax = Math.max(...lineData)
// const lineMin = Math.min(...lineData)
// const toY = (v: number, h: number) => h - ((v - lineMin) / (lineMax - lineMin)) * (h - 20) - 10

const Dashboard = () => {

  const { data, loading} = useFetch<AdminStats>(`${API_BASE}/statistics/admin`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  return (
    <div className="space-y-5 p-2 md:p-5">

      {/* ── Promo Banner ── */}
      <div
        className="rounded-2xl px-6 py-5 flex items-center justify-between gap-4 overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #252d8a 100%)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-10 bg-white" />
          <div className="absolute -bottom-10 left-1/3 w-52 h-52 rounded-full opacity-5 bg-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-yellow-300 text-xs font-semibold">ميزات مميزة</span>
          </div>
          <p className="text-white font-bold text-base sm:text-lg">
            احصل على تحليل مالي متقدم وتقارير فورية لمنشأتك
          </p>
        </div>
        <Link
          to="/dashboard/new-report"
          className="relative z-10 shrink-0 flex items-center gap-2 bg-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ color: 'var(--primary)' }}
        >
          <Plus className="w-4 h-4" />
          تقرير جديد
        </Link>
      </div>

      {/* ── Overview Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>نظرة عامة</h1>
          <p className="text-gray-400 text-xs mt-0.5">إحصائيات الأداء المحدثة</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="bg-white border border-gray-200 rounded-lg px-3 py-1.5">مارس 2026</span>
          <span className="bg-white border border-gray-200 rounded-lg px-3 py-1.5">آخر 30 يوم</span>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium"
            style={{ color: 'var(--primary)' }}
          >
            <Download className="w-3.5 h-3.5" />
            تصدير
          </button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* إجمالي المستخدمين */}
        <div
          className="rounded-2xl p-5 bg-white transition-shadow hover:shadow-md"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <p className="text-gray-400 text-xs font-medium">إجمالي المستخدمين</p>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(20,24,76,0.08)' }}>
              <Users className="w-4 h-4" style={{ color: '#14184c' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            {loading ? '...' : (data?.user_metrics.total_users ?? 0)}
          </p>
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-emerald-500">{data?.user_metrics.new_users_this_month ?? 0} جديد</span>
            <span className="text-gray-400">هذا الشهر</span>
          </div>
        </div>

        {/* السجلات المالية */}
        <div
          className="rounded-2xl p-5 bg-white transition-shadow hover:shadow-md"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <p className="text-gray-400 text-xs font-medium">التقارير المالية</p>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}>
              <ChartNoAxesCombined className="w-4 h-4" style={{ color: '#10B981' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            {loading ? '...' : (data?.record_metrics.total_financial_records ?? 0)}
          </p>
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-gray-400">إجمالي التقارير</span>
          </div>
        </div>

        {/* طلبات الخدمة */}
        <div
          className="rounded-2xl p-5 bg-white transition-shadow hover:shadow-md"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <p className="text-gray-400 text-xs font-medium">طلبات الخدمة</p>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}>
              <CircleCheckBig className="w-4 h-4" style={{ color: '#10B981' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            {loading ? '...' : (data?.service_requests_analytics.total_service_requests ?? 0)}
          </p>
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-gray-400">إجمالي الطلبات</span>
          </div>
        </div>

        {/* مستخدمون جدد */}
        <div
          className="rounded-2xl p-5 bg-white transition-shadow hover:shadow-md"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <p className="text-gray-400 text-xs font-medium">مستخدمون جدد</p>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(212,175,95,0.08)' }}>
              <Building2 className="w-4 h-4" style={{ color: '#D4AF5F' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            {loading ? '...' : (data?.user_metrics.new_users_this_month ?? 0)}
          </p>
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-gray-400">هذا الشهر</span>
          </div>
        </div>

      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Bar Chart */}
        <div
          className="xl:col-span-2 rounded-2xl p-5 bg-white"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-xs text-gray-400">إجمالي التقارير</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: 'var(--primary)' }}>
                {loading ? '...' : (data?.record_metrics.total_financial_records ?? 0)}
              </p>
           
            </div>
            <span className="text-[11px] text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg mt-1">آخر 12 شهر</span>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-1.5 h-36 mt-5">
            {barData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-75 cursor-pointer"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 10 ? 'var(--primary)' : 'rgba(20,24,76,0.15)',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-3 text-gray-400 text-[9px] sm:text-[10px] mt-2">
            {months.map((m) => (
              <span key={m} className="text-center px-2">{m.slice(0, 4)}</span>
            ))}
          </div>
        </div>        
        </div>

      {/* ── Recent Reports ── */}
      <div
        className="rounded-2xl p-5 bg-white"
        style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-sm" style={{ color: 'var(--primary)' }}>أحدث التقارير</h3>
          <button className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--scondary)' }}>
            عرض الكل ←
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f2f5' }}>
                {['رقم التقرير', 'المنشأة', 'الحالة', 'التاريخ'].map((h) => (
                  <th key={h} className="pb-3 text-xs font-semibold text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentReports.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td className="py-3.5 text-gray-400 font-mono text-xs">{r.id}</td>
                  <td className="py-3.5 font-medium" style={{ color: 'var(--primary)' }}>{r.company}</td>
                  <td className="py-3.5">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={r.status === 'مكتمل'
                        ? { backgroundColor: 'rgba(16,185,129,0.1)', color: '#10B981' }
                        : { backgroundColor: 'rgba(212,175,95,0.1)', color: '#D4AF5F' }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-gray-400 text-xs">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-2">
          {recentReports.map((r) => (
            <div key={r.id} className="rounded-xl p-3 bg-gray-50 border border-gray-100">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gray-400 font-mono">{r.id}</p>
                <span
                  className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                  style={r.status === 'مكتمل'
                    ? { backgroundColor: 'rgba(16,185,129,0.1)', color: '#10B981' }
                    : { backgroundColor: 'rgba(212,175,95,0.1)', color: '#D4AF5F' }}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-sm font-medium mt-1" style={{ color: 'var(--primary)' }}>{r.company}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{r.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard