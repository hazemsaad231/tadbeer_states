import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE } from '@/api/api';
import NewReport from './AddReport/Add_Update_Report';
import { ArrowRight } from 'lucide-react';


type ClientStatistics = {
  records_count: number;
  // أضف خصائص أخرى إذا لزم الأمر
};

const Onboarding = () => {

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { data } = useFetch<ClientStatistics>(`${API_BASE}/statistics/client`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  // If user already has reports, redirect to dashboard
  if (data && data.records_count > 0 ) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#14184C] mb-3">
            مرحباً {user?.name || 'بك'} 👋
          </h1>
          <p className="text-gray-600 text-lg">
            لننشئ تقريرك المالي الأول
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-zinc-50 rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Sidebar Info */}
            <div className="bg-linear-to-b from-[#14184C] to-[#1a1f5c] text-white p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-6">ابدأ رحلتك</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-sm font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">أنشئ تقريرك الأول</p>
                      <p className="text-sm text-blue-100">املأ البيانات المالية الخاصة بك</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-sm font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">احصل على التحليلات</p>
                      <p className="text-sm text-blue-100">شاهد الإحصائيات والمؤشرات</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <span className="text-sm font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">اتخذ القرارات</p>
                      <p className="text-sm text-blue-100">استخدم البيانات لتطوير عملك</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skip Button */}
              <button
                onClick={() =>{
                 sessionStorage.setItem('onboarding_skipped', 'true')
                 navigate('/dashboard')
                }
                }
                 
                className="mt-8 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white border border-white/30"
              >
                <span>تخطي هذه الخطوة</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2 p-1">
              <NewReport isOnboarding={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
