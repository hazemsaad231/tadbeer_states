import { useState } from 'react';
import toast from 'react-hot-toast';
import { API_BASE } from '../../../../api/api';

const serviceTypes = [
  { value: 'اعداد قوائم', label: 'إعداد قوائم مالية', icon: '📊' },
  { value: 'مراجعة حسابات',       label: 'مراجعة حسابات',    icon: '🔍' },
  { value: 'استشارات ضريبية',         label: 'استشارات ضريبية',   icon: '📋' },
  { value: 'استشارات مالية',  label: 'استشارات مالية',    icon: '💼' },
];

const Add_Services = () => {
  const [serviceType, setServiceType] = useState('');
  const [notes, setNotes]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);
  const [error, setError]             = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceType || !notes.trim()) {
      setError('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }
    setLoading(true); setError(''); setSuccess(false);
    try {
      const res = await fetch(`${API_BASE}/service-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ service_type: serviceType, notes }),
      });
      console.log('Service Request Response:', res);
      if (!res.ok) throw new Error();
      setSuccess(true);
      toast.success('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
      setServiceType(''); setNotes('');
      
    } catch {
      setError('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.');
      console.error('Service Request Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  p-2 md:p-5">
      <div className="max-w-6xl">

        {/* Page Header */}
        <div className="mb-8 text-right">
          <h1 className="text-xl md:text-2xl font-bold text-[#1e2d5e]">طلب خدمة جديدة</h1>
          <p className="text-gray-400 mt-1 text-sm">أرسل طلبك وسيتم التواصل معك في أقرب وقت</p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl px-5 py-4 text-sm font-medium">
            <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.
          </div>
        )}
        {error && (
          <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 text-sm font-medium">
            <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
            {error}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-gray-50 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Card Header */}
          <div className="bg-[#1e2d5e] px-4 py-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">تقديم طلب خدمة</h2>
              <p className="text-blue-200 text-xs mt-0.5">اختر الخدمة المطلوبة وأضف التفاصيل</p>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-2 space-y-6">

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-[#1e2d5e] mb-3">
                نوع الخدمة <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {serviceTypes.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setServiceType(t.value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-sm font-medium transition-all text-right
                      ${serviceType === t.value
                        ? 'border-[#1e2d5e] bg-[#1e2d5e] text-white shadow-md'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-[#1e2d5e]/40 hover:bg-gray-100'
                      }`}
                  >
                    <span className="text-xl">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-[#1e2d5e] mb-3">
                تفاصيل الطلب <span className="text-red-500">*</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="اكتب تفاصيل طلبك هنا بوضوح لنتمكن من خدمتك بشكل أفضل..."
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800
                  placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-[#1e2d5e] focus:bg-white
                  transition-all resize-none"
              />
              <p className="text-xs text-gray-400 mt-1.5 text-left">{notes.length} حرف</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e2d5e] hover:bg-[#2540b0] active:bg-[#1e2d5e]
                disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold
                rounded-2xl py-3.5 text-sm transition-all shadow-lg shadow-blue-200
                flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  إرسال الطلب
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Services;