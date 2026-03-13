import { Users, UserPlus, Search } from 'lucide-react'
import { useFetch } from '@/hooks/useFetch';
import { API_BASE } from '@/api/api';

const usersData = [
  { id: 1, name: 'أحمد علي', email: 'client@tadbeer.com', role: 'عميل', status: 'نشط', reports: 15 },
  { id: 2, name: 'فاطمة محمد', email: 'fatima@company.com', role: 'عميل', status: 'نشط', reports: 8 },
  { id: 3, name: 'حازم محمد', email: 'admin@tadbeer.com', role: 'مدير', status: 'نشط', reports: 124 },
  { id: 4, name: 'سارة أحمد', email: 'sarah@business.com', role: 'عميل', status: 'موقوف', reports: 3 },
]

const UsersPage = () => {

   const { data} = useFetch(`${API_BASE}/statistics/admin`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    console.log('Admin Dashboard Data:', data);

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--therery)' }}>
            إدارة المستخدمين
          </h1>
          <p className="text-gray-400 mt-1 text-xs sm:text-sm">مراقبة وإدارة حسابات المستخدمين في النظام</p>
        </div>
        <button
          className="w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--scondary)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
        >
          <UserPlus className="w-4 h-4" />
          إضافة مستخدم
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-gray-400 text-xs mb-1">إجمالي المستخدمين</p>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--scondary)' }}>{usersData.length}</p>
            </div>
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--scondary)' + '22' }}
            >
              <Users className="w-5 h-5" style={{ color: 'var(--scondary)' }} />
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-gray-400 text-xs mb-1">المستخدمون النشطون</p>
              <p className="text-xl sm:text-2xl font-bold text-[#10B981]">3</p>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-gray-400 text-xs mb-1">العملاء</p>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--therery)' }}>3</p>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-gray-400 text-xs mb-1">المدراء</p>
              <p className="text-xl sm:text-2xl font-bold text-[#5f79ff]">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div
        className="rounded-2xl p-4 mb-5"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث عن مستخدم..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--scondary) transition-colors"
            />
          </div>
          <select
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-(--therery) transition-colors"
          >
            <option value="">جميع الأدوار</option>
            <option value="admin">مدير</option>
            <option value="client">عميل</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div
        className="rounded-2xl p-4 sm:p-6"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h3 className="text-sm sm:text-base font-semibold mb-4" style={{ color: 'var(--therery)' }}>قائمة المستخدمين</h3>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="py-3 font-medium">الاسم</th>
                <th className="py-3 font-medium">البريد الإلكتروني</th>
                <th className="py-3 font-medium">الدور</th>
                <th className="py-3 font-medium">الحالة</th>
                <th className="py-3 font-medium">عدد التقارير</th>
                <th className="py-3 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-white font-medium">{user.name}</td>
                  <td className="py-3 text-gray-300">{user.email}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${
                      user.role === 'مدير'
                        ? 'bg-[#5f79ff]/15 text-[#5f79ff]'
                        : 'bg-[#10B981]/15 text-[#10B981]'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${
                      user.status === 'نشط'
                        ? 'bg-[#10B981]/15 text-[#10B981]'
                        : 'bg-red-500/15 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">{user.reports}</td>
                  <td className="py-3">
                    <button className="text-xs text-[#10B981] hover:text-white transition-colors mr-3">
                      تعديل
                    </button>
                    <button className="text-xs text-red-400 hover:text-white transition-colors">
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {usersData.map((user) => (
            <div key={user.id} className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm text-white font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                  user.role === 'مدير'
                    ? 'bg-[#5f79ff]/15 text-[#5f79ff]'
                    : 'bg-[#10B981]/15 text-[#10B981]'
                }`}>
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                    user.status === 'نشط'
                      ? 'bg-[#10B981]/15 text-[#10B981]'
                      : 'bg-red-500/15 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                  <span className="text-xs text-gray-400">{user.reports} تقرير</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs text-[#10B981]">تعديل</button>
                  <button className="text-xs text-red-400">حذف</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UsersPage
