

import { Link } from 'react-router-dom'
import AnimateOnScroll from '../../components/website/AnimateOnScroll'
import { Users, TrendingUp } from 'lucide-react'

const cards = [
    {
        title: 'المنشآت الصغيرة',
        icon: '🏢',
        iconBg: 'bg-[var(--primary)]',
        iconColor: 'text-[#D4AF5F]',
        badge: 'الأكثر شيوعاً',
        employees: 'من 6 إلى 49 موظف (دوام كامل)',
        revenue: 'من 3 إلى 40 مليون ريال سعودي سنوياً',
    },
    {
        title: 'المنشآت متناهية الصغر',
        icon: '🏪',
        iconBg: 'bg-[#D4AF5F]/10',
        iconColor: 'text-[#D4AF5F]',
        badge: null,
        employees: 'من 1 إلى 5 موظفين (دوام كامل)',
        revenue: 'من 0 إلى 3 مليون ريال سعودي سنوياً',
    },
]

const Category = () => {
    return (
        <section id="category" className="relative py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-gray-50 overflow-hidden">
            {/* Decorative Background Circles */}
            <div className="absolute top-10 left-20 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4AF5F]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative">

                {/* Header */}
                <AnimateOnScroll type="fadeUp">
                <div className="text-center mb-12">
                    <p className="text-[#D4AF5F] text-sm font-semibold mb-3 tracking-wide">الفئات المستهدفة</p>
                    <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[var(--primary)] leading-tight">
                        مصممة خصيصاً للمنشآت الوطنية{' '}
                        <span className="text-[#D4AF5F]">الطموحة</span>
                    </h2>
                </div>
                </AnimateOnScroll>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {cards.map((card, i) => (
                        <AnimateOnScroll key={i} type="fadeUp" delay={i * 0.15}>
                        <div className="relative bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg border-t-4 border-[#D4AF5F] transition-all duration-300 h-full">

                            {/* Badge */}
                            {card.badge && (
                                <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981]">
                                    {card.badge}
                                </span>
                            )}

                            {/* Icon */}
                            <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-5`}>
                                <span className={card.iconColor}>{card.icon}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-[var(--primary)] mb-6">{card.title}</h3>

                            {/* Divider */}
                            <div className="w-12 h-1 rounded-full bg-[#D4AF5F]/40 mb-6"></div>

                            {/* Details */}
                            <ul className="w-full space-y-4 text-center">
                                <li className="flex items-center justify-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-0.5">عدد الموظفين</p>
                                        <p className="text-gray-700 text-sm font-medium">{card.employees}</p>
                                    </div>
                                    <Users className="w-5 h-5 text-[#D4AF5F] flex-shrink-0" />
                                </li>
                                <li className="flex items-center justify-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-0.5">الإيرادات السنوية</p>
                                        <p className="text-gray-700 text-sm font-medium">{card.revenue}</p>
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                </li>
                            </ul>
                        </div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* زر واحد مشترك */}
                <AnimateOnScroll type="fadeUp" delay={0.3}>
                <div className="flex justify-center mb-8">
                    <Link to={'/register'} className="bg-[#10B981] hover:bg-[#0d9668] text-white shadow-lg shadow-[#10B981]/30 px-10 py-4 rounded-xl font-semibold text-base transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5">
                        <span>←</span>
                        <span>ابدأ تحليل منشأتك</span>
                    </Link>
                </div>
                </AnimateOnScroll>

                {/* Footer note */}
                <p className="text-center text-gray-400 text-sm">
                    يتم التصنيف بناءً على الإيرادات وعدد الموظفين، وفي حال الاختلاف يتم اعتماد التصنيف الأعلى (معايير منشآت).
                </p>

            </div>
        </section>
    )
}

export default Category