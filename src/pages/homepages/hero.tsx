import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div id="hero" className="bg-[var(--primary)] flex flex-col justify-center relative py-16 md:py-20 px-4 md:px-6 overflow-hidden">
            {/* Background decoration */}
         {/* <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
    <div className="absolute top-20 right-10 md:right-20 w-48 h-48 md:w-64 md:h-64 bg-blue-400 rounded-full blur-xl"></div>
    <div className="absolute bottom-20 left-10 md:left-20 w-48 h-48 md:w-64 md:h-64 bg-purple-400 rounded-full blur-xl"></div>
</div> */}

            <div className="relative max-w-6xl mx-auto">
          

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

           

                    {/* Right Side - Text Content */}
                    <motion.div
                        className="flex flex-col justify-center text-center lg:text-right"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                                       {/* Badge */}
                <div className="flex justify-center lg:justify-start mb-6 md:mb-8">
                    <div className="bg-white/10 backdrop-blur-md border border-yellow-400/30 rounded-full px-3 md:px-6 py-1.5 md:py-2.5 flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-yellow-200 text-xs md:text-sm">منصة تحليل مالي مجانية للمنشآت السعودية</span>
                    </div>
                </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-4 md:mb-6" style={{ lineHeight: '1.4' }}>

                            <span className="text-white">  حلّل  </span>
                            <span className="text-white">أداءك المالي،</span>
                            <span className="text-[var(--therery)]"> قارنه</span>
                            <br />
                            <span className="text-[var(--therery)]">بالسوق</span>
                            <span className="text-[var(--therery)]">، </span>
                            <span className="text-white">واتخذ قرارات</span>
                            <br />
                            <span className="text-white">ذكية</span>
                            <span className="text-white">.. </span>
                            <span className="text-[#10B981]">مجاناً</span>
           </h1>

                        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                           منصة تدبير تمنح المنشآت الصغيرة ومتناهية الصغر في السعودية تقييماً مالياً احترافياً ومقارنة معيارية بقطاعك، مدعومة بأحدث أدوات التحليل التقنية.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center lg:justify-start">
                            <Link to={'/register'}>
                            <button className="w-full sm:w-auto bg-[#10B981] hover:bg-[#0d9668] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-md transition-all duration-300 shadow-lg shadow-green-500/50 hover:shadow-green-500/70 flex items-center justify-center gap-2">
                                <span>←</span>
                                <span>ابدأ التقييم المجاني الآن</span>
                            </button>
                            </Link>
                          
                            {/* <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-md transition-all duration-300 flex items-center justify-center gap-2">
                                <span>▶</span>
                                <span className="">شاهد كيف نساعدك في دقيقتين</span>
                            </button> */}
                        </div>
                    </motion.div>

                    {/* Left Side - Dashboard Card */}
                    <motion.div
                        className="flex-shrink-0 w-full lg:w-auto"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    >
                        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8 w-full max-w-md lg:max-w-[480px] mx-auto transform hover:scale-105 transition-transform duration-300">
                            {/* Card Header */}
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">لوحة التحكم المالية</h3>
                                <span className="text-gray-500 text-xs md:text-sm">2024</span>
                            </div>

                            {/* KPI Cards */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-green-50 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-green-600 text-xl">📈</span>
                                        <span className="text-gray-600 text-sm">صافی الربح</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-800">23.5%+</div>
                                </div>
                                <div className="bg-yellow-50 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-yellow-600 text-xl">💰</span>
                                        <span className="text-gray-600 text-sm">معدل السيولة</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-800">1.8x</div>
                                </div>
                            </div>

                            {/* Chart Section */}
                            <div className="mb-4 md:mb-6">
                                <div className="flex justify-between items-center mb-3 md:mb-4">
                                    <h4 className="text-sm md:text-base text-gray-700 font-semibold">مقارنة السوق</h4>
                                </div>
                                <div className="flex items-end justify-center gap-3 md:gap-6 h-36 md:h-48">
                                    <div className="flex flex-col items-center gap-1 md:gap-2">
                                        <div className="bg-[var(--therery)] w-12 md:w-20 h-24 md:h-36 rounded-t-xl"></div>
                                        <span className="text-xs md:text-sm text-gray-600">الأفضل</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 md:gap-2">
                                        <div className="bg-gray-200 w-12 md:w-20 h-16 md:h-28 rounded-t-xl"></div>
                                        <span className="text-xs md:text-sm text-gray-600">متوسط القطاع</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 md:gap-2">
                                        <div className="bg-green-500 w-12 md:w-20 h-28 md:h-40 rounded-t-xl relative">
                                            <div className="hidden md:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-50 border-2 border-yellow-400 rounded-lg px-3 py-1 text-xs font-bold text-gray-800 whitespace-nowrap">
                                                💡 معدل دوران المخزون لديك أعلى من متوسط السوق بنسبة 15%
                                            </div>
                                        </div>
                                        <span className="text-xs md:text-sm text-gray-600">منشأتك</span>
                                    </div>
                                </div>
                                {/* Mobile tooltip */}
                                <div className="md:hidden mt-3 bg-yellow-50 border border-yellow-400 rounded-lg p-2 text-xs text-gray-800 text-center">
                                    💡 معدل دوران المخزون لديك أعلى من متوسط السوق بنسبة 15%
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>

    )
}

export default Hero
