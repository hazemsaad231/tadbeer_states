import { Bell, Menu } from 'lucide-react'
import { useAuthContext } from '../../context/AuthContext'

interface TopbarProps {
  onMenuOpen: () => void
}

const Topbar = ({ onMenuOpen }: TopbarProps) => {
  const { user, isAdmin } = useAuthContext()

  return (
    <header
      className="flex items-center justify-between px-4 sm:px-10 py-4.25 shrink-0 bg-zinc-50 border-b border-gray-200"
  
    >
      {/* Right side - breadcrumb + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="lg:hidden transition-colors p-1.5 rounded-lg hover:bg-gray-100"
          style={{ color: 'var(--primary)' }}
          aria-label="فتح القائمة"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-base" style={{ color: 'var(--primary)' }}>
            {isAdmin() ? 'لوحة تحكم المدير' : 'لوحة التحكم'}
          </h2>
          <p className="hidden sm:block text-xs text-gray-400">منصة تدبير للتحليل المالي</p>
        </div>
      </div>

      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Bell */}
        <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors relative hover:bg-gray-100"
          style={{ color: 'var(--primary)' }}>
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-red-400"></span>
        </button>

        {/* User info */}
        <div className="hidden sm:flex items-center  gap-2 pr-3" style={{ borderRight: '1px solid #e5e7eb' }}>
          <div className="text-center">
            <p className="text-sm font-semibold " style={{ color: 'var(--primary)' }}>{user?.name}</p>
              <p className="text-gray-400 text-xs">{isAdmin() ? 'مدير النظام' : 'عميل'}</p>
          </div>
          {/* <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ color: 'var(--primary)' }}
          >
            {user?.name?.charAt(0) || 'م'}
          </div> */}
        </div>
      </div>
    </header>
  )
}

export default Topbar
