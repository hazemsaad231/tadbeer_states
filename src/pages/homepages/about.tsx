
import AnimateOnScroll from '../../components/website/AnimateOnScroll'

const features = [
    {
        icon: '📊',
        iconBg: 'bg-[#10B981]/20',
        title: 'تحليل الأداء المالي',
        subtitle: '15 مؤشر مالي احترافي',
    },
    {
        icon: '⚖️',
        iconBg: 'bg-[#D4AF5F]/20',
        title: 'مقارنة معيارية',
        subtitle: 'مقارنة بمعايير القطاع السعودي',
    },
    {
        icon: '🎯',
        iconBg: 'bg-[#4FD1C5]/20',
        title: 'توصيات ذكية',
        subtitle: 'خطوات عملية لتحسين الأداء',
    },
]

const stats = [
    { value: '+500', label: 'منشأة مستفيدة', color: 'text-[var(--primary)]' },
    { value: '95%', label: 'رضا العملاء', color: 'text-[#10B981]' },
    { value: '24/7', label: 'دعم متواصل', color: 'text-[#D4AF5F]' },
]

const About = () => {
    return (
        <section className="relative py-16 md:py-40 px-4 md:px-12 lg:px-20 bg-white overflow-hidden">
            {/* Decorative blurs */}
            <div className="absolute top-10 right-20 w-80 h-80 bg-[#D4AF5F]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                  

                    {/* Right side — Text Content */}
                    <AnimateOnScroll type="fadeRight" className="flex-1 text-right">
                        <p className="text-[#D4AF5F] text-sm font-semibold mb-3 tracking-wide">القيمة المضافة</p>

                        <h2 className="text-[1.7rem] md:text-4xl lg:text-[2.3rem] font-bold leading-tight mb-6">
                            <span className="text-[var(--primary)]">أكثر من مجرد أرقام.. </span>
                            <span className="text-[#D4AF5F]">إنها رؤية للمستقبل</span>
                        </h2>

                        <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-5 max-w-xl">
                           منصة تدبير لا تكتفي بعرض الأرقام، بل تحولها إلى رؤى استراتيجية. عبر أدواتنا المتقدمة، نساعدك على رفع كفاءة أدائك المالي.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-row-reverse gap-10 justify-end">
                            {stats.map((s, i) => (
                                <div key={i} className="text-right">
                                    <p className={`text-3xl md:text-4xl font-bold ${s.color}`}>{s.value}</p>
                                    <p className="text-gray-500 text-sm mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>

                      {/* Left side — Feature Card */}
                    <AnimateOnScroll type="fadeLeft" delay={0.15} className="w-full lg:w-[45%] flex-shrink-0">
                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-12 space-y-4">
                            {features.map((f, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 transition-all duration-300 cursor-default shadow-sm"
                                >
                                    <div className="text-right">
                                        <p className="text-[var(--primary)] font-bold text-base">{f.title}</p>
                                        <p className="text-gray-500 text-sm mt-0.5">{f.subtitle}</p>
                                    </div>
                                    <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-xl flex-shrink-0 ms-4`}>
                                        {f.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>

                </div>
            </div>
        </section>
    )
}

export default About