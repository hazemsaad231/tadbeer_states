import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE } from '../../../../api/api';
import { FileText, DollarSign, BarChart2, TrendingUp, Plus } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { RatioSections } from './components/RatioSections';
import type { ClientStats } from '../../../../types/types';
import { BestPerformingYear } from './components/BestYear';
import { GrowthChart } from './components/charts/GrowthChart';
// import {ChartBar} from './components/charts/total';




const ClientDashboard = () => {
  const { user } = useAuthContext();
  const { data, loading, error } = useFetch<ClientStats>(`${API_BASE}/statistics/client`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  console.log('Client Dashboard Data:', data);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#14184C]">مرحباً، {user?.name || 'العميل'} 👋</h1>
          <p className="text-gray-400 text-sm">إدارة وتحليل التقارير المالية الخاصة بك</p>
        </div>
        <Link to="/dashboard/new-report" className="bg-[#14184C] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#1a1f5c] transition-all">
          <Plus size={18} /> تقرير جديد  
        </Link>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="إجمالي التقارير" raw={data?.records_count ?? null} icon={FileText} color="#14184C" bg="rgba(20,24,76,0.05)" isCount loading={loading} />
        <StatsCard label="متوسط الإيرادات" raw={data?.financial_averages?.avg_revenues ?? null} icon={DollarSign} color="#D4AF5F" bg="rgba(212,175,95,0.05)" loading={loading} />
        <StatsCard label="متوسط المصروفات" raw={data?.financial_averages?.avg_total_expenses ?? null} icon={BarChart2} color="#14184C" bg="rgba(20,24,76,0.05)" loading={loading} />
        <StatsCard label="النمو السنوي" raw={data?.yoy_growth?.revenues?.growth_rate ?? null} icon={TrendingUp} color="#10B981" bg="rgba(16,185,129,0.05)" suffix="%" loading={loading} />
      </div>


{/* <FinancialHealth data={data} /> */}
      <RatioSections data={data} />
      {/* <ChartBar data={data} /> */}
      <GrowthChart data={data} />
      <BestPerformingYear data={data} />


      
      
      {/* Reports List */}
      {/* <RecentReportsList reports={myReports} /> */}
      
    </div>
  );
};

export default ClientDashboard;