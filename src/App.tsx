
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/website/Layout'
import DashboardLayout from './components/dashboard/DashboardLayout'
import Home from './pages/homepages/Home'
import './App.css'
import RegisterPage from './pages/auth/register'
import Login from './pages/auth/login'
import Dashboard from './pages/dasboard/admin-dashboard/Dashboard'
import ClientDashboard from './pages/dasboard/client-dashboard/statistics/statistics'
import NewReport from './pages/dasboard/AddReport/Add_Update_Report'
import Onboarding from './pages/dasboard/Onboarding'
import { Toaster } from 'react-hot-toast';
import Reports from './pages/dasboard/client-dashboard/reborts/reborts'
import UsersPage from './pages/dasboard/admin-dashboard/Users'
import CompaniesPage from './pages/dasboard/admin-dashboard/Companies'
import { AuthProvider, useAuthContext } from './context/AuthContext'
import Add_Services from './pages/dasboard/client-dashboard/services/add-services'
import Services from './pages/dasboard/client-dashboard/services/services'
// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

// Admin Only Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuthContext()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>
}

// Dashboard Home Route
const DashboardHome = () => {
  const { isAdmin } = useAuthContext()
  return isAdmin() ? <Dashboard /> : <ClientDashboard />
}


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>

          {/* ── مسارات الموقع الرئيسي ── */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/register" element={<RegisterPage />} />

          {/* ── صفحة تسجيل الدخول ── */}
          <Route path="/login" element={<Login />} />

          {/* ── صفحة الـ Onboarding ── */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } 
          />

          {/* ── مسارات الداشبورد (محمية) ── */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="new-report" element={<NewReport />} />
            <Route path='new-report/:id' element={<NewReport />} />
            <Route path="reports" element={<Reports/>} />
            <Route path="add-services" element={<Add_Services />} />
            <Route path="services" element={<Services />} />
            <Route path="users" element={<AdminRoute><UsersPage /></AdminRoute>} />
            <Route path="companies" element={<AdminRoute><CompaniesPage /></AdminRoute>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
