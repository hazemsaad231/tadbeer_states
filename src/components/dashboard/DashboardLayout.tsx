import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useFetch } from '../../hooks/useFetch'
import { API_BASE } from '../../api/api'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin } = useAuthContext()
  const fetchUrl = isAdmin() ? '' : `${API_BASE}/statistics/client`
  const { data}: { data: any } = useFetch(fetchUrl, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })

  // Redirect new clients to onboarding
  useEffect(() => {
      const skipped = sessionStorage.getItem('onboarding_skipped')
    if (!isAdmin() && data && data.records_count === 0 && !skipped && location.pathname === '/dashboard') {
      navigate('/onboarding', { replace: true })
    }
  }, [data, isAdmin, navigate, location.pathname])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen">

      {/* Overlay للموبايل */}
      {mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          aria-label="إغلاق القائمة"
        />
      )}

      {/* ── Sidebar Component ── */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Spacer to offset fixed sidebar on desktop */}
      <div
        className="hidden lg:block shrink-0 transition-all duration-300"
        style={{ width: collapsed ? '72px' : '240px' }}
      />

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Topbar Component ── */}
        <Topbar onMenuOpen={() => setMobileMenuOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
