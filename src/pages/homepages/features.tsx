
import { AlertCircle, TrendingUp, BarChart3 } from 'lucide-react'
import AnimateOnScroll from '../../components/website/AnimateOnScroll'

const Features = () => {
    return (
        <section id="features" className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <AnimateOnScroll type="fadeUp">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-sm md:text-base font-semibold text-(--therery) mb-2 block">
                        لمحة عن المنتج
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        نظرة شاملة على سلامة منشأتك <span className="text-[var(--therery)]">المالية</span>
                    </h2>
                </div>
                </AnimateOnScroll>

                {/* Cards Grid */}
                <AnimateOnScroll type="fadeUp" delay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    
                    {/* Revenue Card - Small */}
                    <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl md:text-3xl">💲</span>
                            </div>
                            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                                <span className="text-xs md:text-sm font-bold text-green-600">12%+</span>
                            </div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mb-1">الإيرادات</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">2.4M</h3>
                        <p className="text-xs text-gray-400 mb-3 md:mb-4">ريال سعودي</p>
                        
                        {/* Mini bar chart */}
                        <div className="flex items-end gap-1 h-12 md:h-16">
                            {[60, 70, 55, 80, 65, 75, 85].map((height, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-green-400 rounded-t"
                                    style={{ height: `${height}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Cost Structure Card */}
                    <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                            <h3 className="text-base md:text-lg font-bold text-gray-800">هيكل التكاليف</h3>
                        </div>
                        
                        {/* Donut Chart */}
                        <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-4 md:mb-6">
                            <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e3a8a" strokeWidth="20" strokeDasharray="75.4 251.2" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="20" 
                                    strokeDasharray="62.8 251.2" strokeDashoffset="-75.4" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#D9A05B" strokeWidth="20" 
                                    strokeDasharray="50.24 251.2" strokeDashoffset="-138.2" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white rounded-full w-16 h-16 md:w-20 md:h-20"></div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-2 text-xs md:text-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-gray-600">تسويق</span>
                                </div>
                                <span className="font-semibold text-gray-800">20%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#D9A05B]"></div>
                                    <span className="text-gray-600">تشغيل</span>
                                </div>
                                <span className="font-semibold text-gray-800">25%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#1e3a8a]"></div>
                                    <span className="text-gray-600">رواتب</span>
                                </div>
                                <span className="font-semibold text-gray-800">40%</span>
                            </div>
                        </div>
                    </div>

                    {/* Market Position Card */}
                    <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                            <h3 className="text-base md:text-lg font-bold text-gray-800">موقفك في السوق</h3>
                        </div>
                        
                        {/* Bar Chart */}
                        <div className="flex items-end justify-center gap-4 md:gap-6 h-32 md:h-40 mb-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-green-500 w-12 h-20 lg:w-12 xl:w-16 lg:h-24 rounded-t-xl"></div>
                                <span className="text-xs text-gray-600">الأفضل</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-gray-300 w-12 h-20 lg:w-12 xl:w-16 lg:h-24  rounded-t-xl"></div>
                                <span className="text-xs text-gray-600">المتوسط</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="bg-[#1e3a8a] w-12 h-20 lg:w-12 xl:w-16 lg:h-24 rounded-t-xl"></div>
                                <span className="text-xs text-gray-600">منشأتك</span>
                            </div>
                        </div>
                    </div>

                    {/* Smart Alert Card */}
                    <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-[var(--therery)]" />
                            <h3 className="text-base md:text-lg font-bold text-gray-800">تنبيه ذكي</h3>
                        </div>
                        
                        {/* Alert Box */}
                        <div className="bg-amber-50 rounded-xl p-3 md:p-4 mb-4 border-r-4 border-[var(--therery)]">
                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                                معدل دوران المخزون لديك أقل من متوسط السوق، تفرّع مراجعة سياسية البيع والتوزيع.
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="bg-green-50 rounded-xl p-3 md:p-4 flex items-start gap-2">
                            <div className="text-xl">🏆</div>
                            <div>
                                <p className="text-xs md:text-sm font-semibold text-gray-800 mb-1">
                                    هامش الربح: ممتاز
                                </p>
                                <p className="text-xs text-gray-600">
                                    أعلى من المتوسط بنسبة 15%
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                </AnimateOnScroll>
            </div>
        </section>
    )
}

export default Features
