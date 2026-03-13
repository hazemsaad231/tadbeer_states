import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, X, ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { useAuthContext } from '../../context/AuthContext'
import { House, FilePlus2, FileChartColumnIncreasing, Wrench } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const adminNavItems = [
  { label: 'الرئيسية', icon: House, path: '/dashboard' },
  { label: 'إنشاء تقرير', icon: FilePlus2, path: '/dashboard/new-report' },
  { label: 'التقارير', icon: FileChartColumnIncreasing, path: '/dashboard/reports' },
 
  // { label: 'المستخدمون', icon: Users, path: '/dashboard/users' },
]

const clientNavItems = [
  { label: 'الاحصائيات', icon: House, path: '/dashboard' },
  { label: 'تقاريري', icon: FileChartColumnIncreasing, path: '/dashboard/reports' },
  { label: 'خدماتي', icon: Wrench, path: '/dashboard/services' },
  { label: 'إنشاء تقرير', icon: FilePlus2, path: '/dashboard/new-report' },
  { label: 'طلب خدمة', icon: FilePlus2, path: '/dashboard/add-services' },
  
]

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) => {
  const navigate = useNavigate()
  const { logout, user, isAdmin } = useAuthContext()
  const [showConfirm, setShowConfirm] = useState(false)

  const navItems = isAdmin() ? adminNavItems : clientNavItems

  const handleLogout = () => {
    logout()
    navigate('/login')
    sessionStorage.removeItem('onboarding_skipped')

  }

  return (
    <>
      <aside
      className={`bg-zinc-50 fixed top-0 right-0 z-40 h-screen flex flex-col transition-all duration-300 ${
        mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}
      style={{ width: collapsed ? '80px' : '250px'}}
   
    >
      {/* Logo */}
      <div className="shrink-0">
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: '1px solid #e8ecf0' }}
        >
          {!collapsed && (
           <h1 className="text-xl md:text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>
              تــدبــير
            </h1>
            // <img src="/logo2.jpeg" alt="Logo" className="h-14 w-28 md:h-16 md:w-32 object-contain" />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="relative right-10 rounded-full hidden md:block bg-(--primary) shadow-2xl backdrop-blur-xl border border-white/20 hover:border-(--therery)/50 text-white p-3 transition-all duration-300"
            title={collapsed ? 'توسيع' : 'طي'}
          >
            {collapsed ? <ArrowBigLeft className="w-4 h-4" /> : <ArrowBigRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto mt-3 flex flex-col gap-0.5 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-indigo-900 hover:text-indigo-700 hover:bg-indigo-50'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: 'var(--primary)', boxShadow: '0 4px 12px rgba(20,24,76,0.3)' }
                : {}
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User info + Logout */}
      <div className="shrink-0 px-2 pb-4" style={{ borderTop: '1px solid #e8ecf0' }}>
        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-3 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {user?.name?.charAt(0) || 'م'}
            </div>
            <div className="min-w-0">
              <p className="text-gray-800 text-sm font-semibold truncate">{user?.name}</p>
              {/* <p className="text-gray-400 text-xs">{isAdmin() ? 'مدير النظام' : 'عميل'}</p> */}
            </div>
          </div>
        )}
        <button
          onClick={() => setShowConfirm(true)}
          className="w-max flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-800 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </aside>

    {/* Confirmation Dialog */}
    {showConfirm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">تسجيل الخروج</h3>
          <p className="text-sm text-gray-500 mb-6">هل أنت متأكد من أنك تريد تسجيل الخروج؟</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default Sidebar
