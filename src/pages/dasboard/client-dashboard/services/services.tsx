import { useFetch } from '@/hooks/useFetch';
import { API_BASE } from '@/api/api';
import { Link } from 'react-router-dom';
import { Plus, ClipboardList, Clock, CheckCircle2, XCircle, Calendar} from 'lucide-react';
import  type { ServiceRequestsResponse } from '../../types';



const statusMap: Record<string, { label: string; bg: string; color: string; icon: React.ReactNode }> = {
  pending:   { label: 'قيد الانتظار', bg: 'rgba(212,175,95,0.12)',  color: '#B8922A', icon: <Clock className="w-3 h-3" /> },
  approved:  { label: 'مقبول',        bg: 'rgba(16,185,129,0.12)',  color: '#059669', icon: <CheckCircle2 className="w-3 h-3" /> },
  rejected:  { label: 'مرفوض',        bg: 'rgba(239,68,68,0.12)',   color: '#DC2626', icon: <XCircle className="w-3 h-3" /> },
  completed: { label: 'مكتمل',        bg: 'rgba(16,185,129,0.12)',  color: '#059669', icon: <CheckCircle2 className="w-3 h-3" /> },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })

const Services = () => {


  const Token = localStorage.getItem('token') || '';
  const url = Token ? `${API_BASE}/service-requests` : '';
  const options = Token ? { headers: { Authorization: `Bearer ${Token}` } } : undefined;
  const { data, loading, error } = useFetch<ServiceRequestsResponse>(url, options);

  const requests = data?.service_requests || [];

  const pendingCount   = requests.filter(r => r?.status === 'pending').length;
  const completedCount = requests.filter(r => r?.status === 'completed' || r?.status === 'approved').length;

  return (
    <div className="p-2 md:p-6 space-y-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--primary)' }}>طلبات الخدمة</h2>
          <p className="text-gray-400 text-xs mt-0.5">إدارة ومتابعة طلباتك</p>
        </div>
        <Link
          to="/dashboard/add-services"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #252d8a 100%)' }}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">طلب جديد</span>
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-3">
        {/* الكل */}
        <div
          className="rounded-2xl p-4 bg-white"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(20,24,76,0.08)' }}>
              <ClipboardList className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            </div>
            <p className="text-gray-400 text-xs">إجمالي الطلبات</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
            {loading ? '—' : requests.length}
          </p>
        </div>

        {/* قيد الانتظار */}
        <div
          className="rounded-2xl p-4 bg-white"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(212,175,95,0.1)' }}>
              <Clock className="w-4 h-4" style={{ color: '#B8922A' }} />
            </div>
            <p className="text-gray-400 text-xs">قيد الانتظار</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#B8922A' }}>
            {loading ? '—' : pendingCount}
          </p>
        </div>

        {/* مكتملة */}
        <div
          className="rounded-2xl p-4 bg-white"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16,185,129,0.1)' }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: '#059669' }} />
            </div>
            <p className="text-gray-400 text-xs">مكتملة</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#059669' }}>
            {loading ? '—' : completedCount}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className="rounded-2xl bg-white overflow-hidden"
        style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
      >
        {/* Table Header */}
        {!loading && requests.length > 0 && (
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #f0f2f5' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>قائمة الطلبات</p>
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">
              {requests.length} طلب
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-transparent animate-spin" style={{ borderTopColor: 'var(--primary)' }} />
            {/* <p className="text-gray-400 text-sm">جاري التحميل...</p> */}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <XCircle className="w-10 h-10 text-red-300" />
            <p className="text-red-400 text-sm">حدث خطأ أثناء تحميل البيانات</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(20,24,76,0.06)' }}>
              <ClipboardList className="w-7 h-7" style={{ color: 'var(--primary)', opacity: 0.4 }} />
            </div>
            <p className="text-gray-400 text-sm">لا توجد طلبات خدمة حتى الآن</p>
            <Link
              to="/dashboard/add-services"
              className="text-xs font-semibold px-4 py-2 rounded-xl text-white mt-1"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              أضف طلبك الأول
            </Link>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && requests.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-center" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ backgroundColor: '#fafbfc' }}>
                  {[
                    { label: 'نوع الخدمة', icon: <ClipboardList className="w-3 h-3" /> },
                    { label: 'ملاحظات', icon: <span title="ملاحظات"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20.5A8.5 8.5 0 103.5 12a8.5 8.5 0 008.5 8.5z" /></svg></span> },
                    { label: 'الحالة', icon: <span title="الحالة"><CheckCircle2 className="w-3 h-3 text-green-400" /></span> },
                    { label: 'التاريخ', icon: <Calendar className="w-3 h-3" /> },
                  ].map(({ label, icon }) => (
                    <th key={label} className="px-5 py-3 text-xs font-semibold text-gray-400">
                      <div className="inline-flex items-center gap-1 justify-center">
                        {icon}
                        {label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => {
                  const st = statusMap[r.status] ?? { label: r.status, bg: 'rgba(0,0,0,0.05)', color: '#888', icon: null }
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50 transition-colors group"
                      style={{ borderBottom: '1px solid #f8fafc' }}
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>
                          {r.service_type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs max-w-55 truncate">
                        {r.notes || '—'}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: st.bg, color: st.color }}
                        >
                          {st.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{formatDate(r.created_at)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && requests.length > 0 && (
          <div className="md:hidden space-y-2 p-4">
            {requests.map((r) => {
              const st = statusMap[r.status] ?? { label: r.status, bg: 'rgba(0,0,0,0.05)', color: '#888', icon: null }
              return (
                <div
                  key={r.id}
                  className="rounded-xl p-4 transition-all hover:shadow-sm"
                  style={{ border: '1px solid #f0f2f5', backgroundColor: '#fafbfc' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>{r.service_type}</p>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0"
                      style={{ backgroundColor: st.bg, color: st.color }}
                    >
                      {st.icon}
                      {st.label}
                    </span>
                  </div>
                  {r.notes && (
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">{r.notes}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-gray-300 font-mono">#{r.id}</p>
                    <p className="text-[11px] text-gray-400">{formatDate(r.created_at)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Services