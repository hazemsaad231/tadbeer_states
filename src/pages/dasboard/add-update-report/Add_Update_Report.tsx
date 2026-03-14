import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, TrendingUp, BarChart2, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Step1 from '../add-update-report/components/Step1';
import Step2 from '../add-update-report/components/Step2';
import Step3 from '../add-update-report/components/Step3';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE } from '../../../api/api';
import { success as toastSuccess, Error as toastError } from '../../../ui/toasts';
// في الاستيرادات
import FileExtractor from '../FileExtractor';

interface Year {
  id: number;
  year: number;
  created_at: string;
}

interface NewReportProps {
  isOnboarding?: boolean;
}

const NewReport = ({ isOnboarding = false }: NewReportProps) => {


  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [years, setYears] = useState<Year[]>([]);
  const [loadingYears, setLoadingYears] = useState(false);
  const [formData, setFormData] = useState({

    yearId: '',
    revenues: '',
    direct_expenses: '',
    cost_of_goods_sold: '',
    gross_profit: '',
    administrative_expenses: '',
    marketing_expenses: '',
    net_profit: '',
    fixed_assets: '',
    current_assets: '',
    cash_and_equivalents: '',
    receivables: '',
    inventory: '',
    current_liabilities: '',
    creditors: '',
    accrued_expenses: '',
    long_term_liabilities: '',
    loans: '',
    end_of_service_provision: '',
    equity: '',
    capital: '',
    retained_earnings: '',
  });

  // جلب بيانات التقرير إذا كان id موجود
  useEffect(() => {
    if (id) {
      const fetchReport = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_BASE}/financial-records/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error('فشل في جلب بيانات التقرير');
          const responseData = await res.json();
          const data = responseData.financial_record;
          console.log('Raw fetched report data:', data);
          setFormData({
            yearId: data.year?.id || '',
            revenues: data.income_statement?.revenues || '',
            direct_expenses: data.income_statement?.direct_expenses || '',
            cost_of_goods_sold: data.income_statement?.cost_of_goods_sold || '',
            gross_profit: data.income_statement?.gross_profit || '',
            administrative_expenses: data.income_statement?.administrative_expenses || '',
            marketing_expenses: data.income_statement?.marketing_expenses || '',
            net_profit: data.income_statement?.net_profit || '',
            fixed_assets: data.balance_sheet?.fixed_assets || '',
            current_assets: data.balance_sheet?.current_assets || '',
            cash_and_equivalents: data.balance_sheet?.cash_and_equivalents || '',
            receivables: data.balance_sheet?.receivables || '',
            inventory: data.balance_sheet?.inventory || '',
            current_liabilities: data.balance_sheet?.current_liabilities || '',
            creditors: data.balance_sheet?.creditors || '',
            accrued_expenses: data.balance_sheet?.accrued_expenses || '',
            long_term_liabilities: data.balance_sheet?.long_term_liabilities || '',
            loans: data.balance_sheet?.loans || '',
            end_of_service_provision: data.balance_sheet?.end_of_service_provision || '',
            equity: data.balance_sheet?.equity || '',
            capital: data.balance_sheet?.capital || '',
            retained_earnings: data.balance_sheet?.retained_earnings || '',
          });
          console.log('Fetched report data:', data);
        } catch (err) {
          toastError('فشل في جلب بيانات التقرير');
        }
      };
      fetchReport();
    }
  }, [id]);

  const steps = [
    { id: 1, title: 'السنة المالية', icon: Calendar },
    { id: 2, title: 'قائمة الدخل', icon: TrendingUp },
    { id: 3, title: 'أرصدة ختامية', icon: BarChart2 },
    { id: 4, title: 'المراجعة', icon: CheckCircle },
  ];

  // جلب السنوات المالية من API
  useEffect(() => {
    const fetchYears = async () => {
      setLoadingYears(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/years`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('فشل في جلب السنوات');
        const data = await response.json();
        const yearsList = Array.isArray(data.years) ? data.years : [];
        // ترتيب السنوات تنازلياً
        setYears(yearsList.sort((a: Year, b: Year) => b.year - a.year));
      } catch (err) {
        console.error('Error fetching years:', err);
        setYears([]);
      } finally {
        setLoadingYears(false);
      }
    };
    fetchYears();
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      // إذا كان id موجود: تعديل (PUT)، إذا لم يوجد: إضافة (POST)
      const url = id ? `${API_BASE}/financial-records/${id}` : `${API_BASE}/financial-records`;
      const method = id ? 'PUT' : 'POST';
      const recordRes = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          year_id: Number(formData.yearId),
          fixed_assets: Number(formData.fixed_assets),
          current_assets: Number(formData.current_assets),
          cash_and_equivalents: Number(formData.cash_and_equivalents),
          receivables: Number(formData.receivables),
          inventory: Number(formData.inventory),
          current_liabilities: Number(formData.current_liabilities),
          creditors: Number(formData.creditors),
          accrued_expenses: Number(formData.accrued_expenses),
          long_term_liabilities: Number(formData.long_term_liabilities),
          loans: Number(formData.loans),
          end_of_service_provision: Number(formData.end_of_service_provision),
          equity: Number(formData.equity),
          capital: Number(formData.capital),
          retained_earnings: Number(formData.retained_earnings),
          revenues: Number(formData.revenues),
          direct_expenses: Number(formData.direct_expenses),
          cost_of_goods_sold: Number(formData.cost_of_goods_sold),
          gross_profit: Number(formData.gross_profit),
          administrative_expenses: Number(formData.administrative_expenses),
          marketing_expenses: Number(formData.marketing_expenses),
          net_profit: Number(formData.net_profit),
        }),
      });
      if (!recordRes.ok) {
        const errBody = await recordRes.json().catch(() => null);
        console.error("Financial Record Error Body:", errBody);
        throw new Error(errBody?.message || JSON.stringify(errBody) || 'فشل في حفظ السجل المالي');
      }

      toastSuccess(id ? 'تم تعديل التقرير بنجاح' : 'تم إنشاء التقرير بنجاح');
      navigate(isOnboarding ? '/dashboard' : '/dashboard/reports');
       sessionStorage.removeItem('onboarding_skipped')
    } catch (err: any) {
      const errMsg = err.message || 'حدث خطأ غير متوقع';
      setSubmitError(errMsg);
      toastError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="max-w-8xl p-2 md:p-5 mx-auto space-y-5">

        {/* ── Header ── */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: '#14184C' }}>
            {id ? 'تعديل التقرير' : 'إنشاء تقرير جديد'}
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">
            {id ? 'قم بتعديل بيانات التقرير أدناه' : 'أدخل بيانات المنشأة لإصدار التقرير التحليلي'}
          </p>
        </div>

        {/* ── Steps Indicator ── */}
        <div
          className="rounded-2xl p-5 bg-white"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <div className="absolute top-5 right-0 left-0 h-px z-0" style={{ backgroundColor: '#e5e7eb' }}></div>
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex flex-col items-center z-10 flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? '#14184C'
                        : isCompleted
                        ? '#10B981'
                        : '#f0f2f5',
                      color: isActive || isCompleted ? 'white' : '#9ca3af',
                      boxShadow: isActive ? '0 4px 14px rgba(20,24,76,0.25)' : 'none',
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span
                    className="text-[10px] sm:text-xs text-center leading-tight px-0.5"
                    style={{
                      color: isActive ? '#14184C' : isCompleted ? '#10B981' : '#9ca3af',
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`, backgroundColor: '#10B981' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5 text-center">
            الخطوة {currentStep} من {steps.length}
          </p>
        </div>

        {/* ── Form Card ── */}
        <div
          className="rounded-2xl p-6 md:p-8 bg-white"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f5' }}
        >
          <FileExtractor formData={formData} setFormData={setFormData} years={years} />
          <div className="mb-6">
            <h2 className="text-lg font-bold" style={{ color: '#14184C' }}>
              {steps[currentStep - 1].title}
            </h2>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -60, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="block text-sm font-semibold mb-3" style={{ color: '#14184C' }}>السنة المالية</span>
                      <select
                        value={formData.yearId}
                        onChange={(e) => setFormData({ ...formData, yearId: e.target.value })}
                        disabled={loadingYears || years.length === 0}
                        className="w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all appearance-none bg-no-repeat cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          borderColor: '#e5e7eb',
                          backgroundColor: formData.yearId ? 'white' : '#fafafa',
                          color: formData.yearId ? '#14184C' : '#9ca3af',
                          '--tw-ring-color': 'rgba(20,24,76,0.2)',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6 8L10 12L14 8' stroke='%2314184c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundPosition: 'left 12px center',
                          backgroundRepeat: 'no-repeat',
                          paddingRight: '2.5rem',
                          paddingLeft: '2.5rem',
                        } as any}
                      >
                        <option value="">{loadingYears ? 'جاري التحميل...' : 'اختر السنة المالية'}</option>
                        {years.map((year) => (
                          <option key={year.id} value={year.id}>
                            {year.year}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
                {currentStep === 2 && <Step1 formData={formData} setFormData={setFormData} />}
                {currentStep === 3 && <Step2 formData={formData} setFormData={setFormData} />}
                {currentStep === 4 && <Step3 formData={formData} setFormData={setFormData} years={years}/>}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-100 gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all duration-200 hover:bg-gray-50 disabled:hover:bg-gray-50"
              style={{
                borderColor: currentStep === 1 ? '#d1d5db' : '#d1d5db',
                color: currentStep === 1 ? '#d1d5db' : '#14184C',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                backgroundColor: currentStep === 1 ? '#f9fafb' : 'white',
              }}
            >
              <ArrowRight className="w-4 h-4" />
              السابق
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: '#14184C', boxShadow: '0 2px 8px rgba(20,24,76,0.15)' }}
              >
                التالي
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <>
                {submitError && (
                  <p className="text-xs text-red-500 text-center">{submitError}</p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  style={{ backgroundColor: '#10B981', boxShadow: '0 2px 8px rgba(16,185,129,0.15)' }}
                >
                  {submitting ? 'جاري الإرسال...' : id ? 'تعديل التقرير' : 'إصدار التقرير'}
                  {!submitting && <ArrowLeft className="w-4 h-4" />}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewReport;

