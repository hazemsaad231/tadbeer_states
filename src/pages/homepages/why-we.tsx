
import { Users, ShieldCheck, BarChart2, Lightbulb } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

const Why_work = () => {
    const features = [
        {
            icon: BarChart2,
            iconBg: 'bg-[#10B981]/10',
            iconColor: 'text-[#10B981]',
            title: 'تحليل مالي احترافي',
            description: 'احصل على تقييم مالي شامل لمنشأتك يشمل المؤشرات الأساسية ومقارنتها بمعايير القطاع.',
        },
        {
            icon: ShieldCheck,
            iconBg: 'bg-[#D4AF5F]/10',
            iconColor: 'text-[#D4AF5F]',
            title: 'مجاني وآمن بالكامل',
            description: 'لا رسوم خفية ولا التزامات، بياناتك محمية بأعلى معايير الأمان والخصوصية.',
        },
        {
            icon: Users,
            iconBg: 'bg-[#4FD1C5]/10',
            iconColor: 'text-[#4FD1C5]',
            title: 'مقارنة معيارية بالسوق',
            description: 'قارن أداءك المالي بمنشآت مماثلة في قطاعك واكتشف فرص التحسين الحقيقية.',
        },
        {
            icon: Lightbulb,
            iconBg: 'bg-[#D4AF5F]/10',
            iconColor: 'text-[#D4AF5F]',
            title: 'قرارات ذكية ومدعومة',
            description: 'تقارير وتوصيات مبنية على بيانات حقيقية تساعدك على اتخاذ قرارات استراتيجية بثقة.',
        }
    ]

    return (
        <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-gray-50 overflow-hidden">
            {/* Decorative Background Circles */}
            <div className="absolute top-10 left-20 w-96 h-96 bg-[#10B981]/8 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4AF5F]/8 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 md:mb-16 gap-6">
                    {/* Right Side - Text Content */}
                    <div className="flex-1">
                        <p className="text-sm md:text-base font-semibold text-[#4FD1C5] mb-3 tracking-wider">
                            اكتشف المزيد
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary)] mb-4 leading-tight">
                            لماذا <span className="text-[#D4AF5F]">تدبير</span>؟
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
                            نوفر لك الأدوات المالية الاحترافية التي كانت حكراً على الشركات الكبرى — مجاناً وبلغة عربية واضحة.
                        </p>
                    </div>

                    {/* Left Side - Navigation Buttons */}
                    <div className="flex gap-3 lg:mt-2">
                        <button className="swiper-button-prev-custom w-14 h-14 bg-[var(--primary)] hover:bg-[#1a2060] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button className="swiper-button-next-custom w-14 h-14 bg-[var(--primary)] hover:bg-[#1a2060] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Swiper Container */}
                <div className="w-full h-full">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination-custom',
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        className="features-swiper"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <SwiperSlide key={index}>
                                    <div className="bg-white border border-gray-100 shadow rounded-2xl p-8 md:p-10 hover:shadow-lg hover:border-[#4FD1C5]/40 transition-all duration-500 h-full flex flex-col">
                                        {/* Icon */}
                                        <div className={`w-20 h-20 ${feature.iconBg} rounded-full flex items-center justify-center mb-8 transition-transform duration-300`}>
                                            <Icon className={`w-10 h-10 ${feature.iconColor}`} strokeWidth={1.5} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-4 leading-snug">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-500 text-base leading-relaxed mb-8 flex-1">
                                            {feature.description}
                                        </p>

                                        {/* Learn More Link */}
                                        <a href="#" className="inline-flex items-center gap-2 text-[#10B981] font-semibold text-base hover:gap-3 transition-all duration-300">
                                            <span>اعرف أكثر</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                            </svg>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination-custom flex justify-center gap-2 mt-10"></div>
                </div>
            </div>

            <style>{`
                .features-swiper .swiper-slide {
                    height: auto;
                }

                .swiper-pagination-custom {
                    margin-top: 40px;
                }

                .swiper-pagination-custom .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: #d1d5db;
                    opacity: 1;
                    transition: all 0.3s ease;
                    border-radius: 50%;
                }

                .swiper-pagination-custom .swiper-pagination-bullet-active {
                    background: var(--primary);
                    width: 12px;
                    height: 12px;
                }

                @media (max-width: 1024px) {
                    .swiper-button-prev-custom,
                    .swiper-button-next-custom {
                        display: none;
                    }
                }
            `}</style>
        </section>
    )
}

export default Why_work