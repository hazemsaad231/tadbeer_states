
import { FileSpreadsheet, BarChart3, FileCheck, Download,GitPullRequestCreate } from 'lucide-react';
import AnimateOnScroll from '../../components/website/AnimateOnScroll';

const HowItWorks = () => {
  const steps = [
   {    number: '01',
      title: 'تسجيل حسابك',
      subtitle: 'ابدأ بإنشاء حساب مجاني للوصول إلى أدواتنا التحليلية المتقدمة.',
      icon: GitPullRequestCreate,
      illustration: '/register.svg' // أو استخدم صورة
    },
   
    {
      number: '02',
      title:'إدخال البيانات المالية',
      subtitle: 'ارفع قوائمك المالية بأمان أو ادخل البيانات الأساسية عبر نموذجنا السهل.',
      icon: FileSpreadsheet,
      illustration: '/entry.svg' // أو استخدم صورة
    },
    {
      number: '03',
      title: 'تحليل ذكي وفوري',
      subtitle: 'تقوم خوارزمياتنا بتحليل بياناتك لأكثر من فترة زمنية بدقة متناهية.',
      icon: BarChart3,
      illustration: '/analysis.svg' // أو استخدم صورة
    },
    {
        number: '04',
        title: 'مقارنة بالسوق',
        subtitle: 'نقارن أداءك تلقائياً بمثيلاتها في نفس قطاعك ونشاطك التجاري.',
        icon: FileCheck,
        illustration: '/compare.svg' // أو استخدم صورة
    },
    {
      number: '05',
      title: 'إصدار التقرير',
      subtitle: 'احصل على تقرير تحليلي واضح وشامل يدعم قراراتك الاستراتيجية.',
      icon: Download,
      illustration: '/results.svg' // أو استخدم صورة
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 lg:px-20 bg-linear-to-b from-gray-50 to-white" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <AnimateOnScroll type="fadeUp">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm md:text-base font-semibold text-secondary mb-2 block">العملية</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            كيف <span className="text-tertiary">نعمل</span> ؟
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            خمس خطوات بسيطة للحصول على تحليل مالي احترافي لمنشأتك
          </p>
        </div>
        </AnimateOnScroll>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-15 left-[12%] right-[12%] h-1 bg-linear-to-r from-primary via-secondary to-secondary rounded-full opacity-30">
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-6">
            {steps.map((step, index) => {
              
              const Icon = step.icon;
              
              // استخدام ألوان الموقع فقط
              const bgColors = [
                'bg-primary', 
                'bg-secondary', 
                'bg-primary', 
                'bg-secondary',
                'bg-primary'
              ];
              const lightBgs = [
                'from-[#14184c]/10 to-[#14184c]/20',
                'from-[#10B981]/10 to-[#10B981]/20',
                'from-[#D4AF5F]/10 to-[#D4AF5F]/20',
                'from-[#10B981]/10 to-[#10B981]/20',
                'from-[#14184c]/10 to-[#14184c]/20'
              ];
              const overlayBgs = [
                'bg-primary/5', 
                'bg-secondary/5', 
                'bg-primary/5', 
                'bg-secondary/5',
                'bg-primary/5'
              ];
              
              return (
                <AnimateOnScroll key={index} type="fadeUp" delay={index * 0.12}>
                <div className="relative flex flex-col items-center">
                  
                  {/* Number Badge */}
                  <div className={`text-xs md:text-sm font-bold text-white ${bgColors[index]} rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-3 md:mb-4 shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Circle on Line */}
                      <div className={`relative z-10 w-4 h-4 md:w-5 md:h-5 ${bgColors[index]} rounded-full mb-6 md:mb-8 shadow-lg border-4 border-white`}>
                        <div className={`absolute inset-0 ${bgColors[index]}/30 rounded-full animate-ping opacity-75`}></div>
                      </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-4 md:p-6 lg:p-8 w-full group hover:-translate-y-2 border border-gray-100">
                    
                    {/* Illustration/Icon */}
                    <div className={`w-full h-28 md:h-32 mb-4 md:mb-6 flex items-center justify-center bg-linear-to-br ${lightBgs[index]} rounded-xl md:rounded-2xl relative overflow-hidden`}>
                      <div className={`absolute inset-0 ${overlayBgs[index]} group-hover:scale-110 transition-transform duration-500`}></div>
                      <img src={step.illustration} alt={step.title} className="w-28 h-28 md:w-32 md:h-32 object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 text-center mb-2">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs md:text-sm text-gray-500 text-center mb-4 md:mb-6">
                      {step.subtitle}
                    </p>

                    {/* Icon Button */}
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${bgColors[index]} rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all transform hover:scale-110 group-hover:rotate-12`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                  </div>
                </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;