
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react'

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-(--primary) text-white overflow-hidden">

            {/* زخارف خلفية */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-(--therery)/40 to-transparent" />
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-[0.04] pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--therery), transparent)' }} />
            <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full opacity-[0.04] pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--scondary), transparent)' }} />

          
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

                    {/* About Section */}
                    <div className="space-y-5 lg:col-span-1">
                        <div className="flex items-center gap-2.5">

                                      <img src="/logo.webp" alt="Logo" className="h-12 w-32 md:h-14 md:w-40 object-contain" />


                            {/* <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0"
                                style={{ backgroundColor: 'var(--therery)', color: 'var(--primary)' }}>
                                ت
                            </div>
                            <span className="text-white text-lg font-bold">تدبير</span> */}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            منصة مجانية لتحليل الأداء المالي للمنشآت الصغيرة والمتوسطة في المملكة العربية السعودية.
                        </p>
                        {/* Social Media */}
                        <div className="flex gap-2.5 pt-1">
                            {[
                                { Icon: Facebook, label: 'Facebook' },
                                { label: 'X', isX: true },
                                { Icon: Linkedin, label: 'LinkedIn' },
                                { Icon: Instagram, label: 'Instagram' },
                            ].map(({ Icon, label, isX }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--scondary)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)')}
                                    aria-label={label}
                                >
                                    {isX ? <XIcon /> : Icon && <Icon className="w-4 h-4" />}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 uppercase tracking-widest" style={{ color: 'var(--therery)' }}>روابط سريعة</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { label: 'الرئيسية', href: '#hero' },
                                { label: 'كيف نعمل', href: '#how-it-works' },
                                { label: 'المزايا', href: '#features' },
                                { label: 'الفئات المستهدفة', href: '#category' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-(--therery) opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 uppercase tracking-widest" style={{ color: 'var(--therery)' }}>الخدمات</h3>
                        <ul className="space-y-3 text-sm">
                            {['التحليل المالي', 'مقارنة الأداء', 'التقارير الاحترافية', 'الاستشارات المالية'].map((service) => (
                                <li key={service}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-(--therery) opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 uppercase tracking-widest" style={{ color: 'var(--therery)' }}>تواصل معنا</h3>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <a href="mailto:info@tadbeer.sa" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                                        style={{ backgroundColor: 'rgba(16,185,129,0.12)' }}>
                                        <Mail className="w-4 h-4 text-(--scondary)" />
                                    </span>
                                    info@tadbeer.sa
                                </a>
                            </li>
                               <li>
                                <a href="tel:+966123456789" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                                        style={{ backgroundColor: 'rgba(16,185,129,0.12)' }}>
                                        <Phone className="w-4 h-4 text-(--scondary)" />
                                    </span>
                                    +966 12 345 6789
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: 'rgba(16,185,129,0.12)' }}>
                                    <MapPin className="w-4 h-4 text-(--scondary)" />
                                </span>
                                جدة، المملكة العربية السعودية
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
                        <p>&copy; {currentYear} تدبير. جميع الحقوق محفوظة.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
                            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer

 
