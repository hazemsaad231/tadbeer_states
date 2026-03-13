
import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'كيف نعمل', href: '/#how-it-works' },
  { label: 'المزايا', href: '/#features' },
  { label: 'الفئات المستهدفة', href: '/#category' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => setIsMenuOpen(false)

  return (
    <header className="bg-(--primary) text-white z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={handleNavClick}>
          <img src="/logo.webp" alt="Logo" className="h-14 w-28 md:h-16 md:w-36 object-contain" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 font-medium hover:text-white transition-colors duration-200 relative after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-0.5 after:bg-(--therery) after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>


      <div className="flex items-center gap-4">
        <Link to={'/register'}>
        <button className="hidden md:block bg-[#10B981] text-white px-5 py-2.5 rounded-xl hover:bg-[#0d9668] transition-all duration-300 text-sm font-semibold shadow-lg shadow-(--secondary)/20">
        أنشئ حسابك الآن
        </button>
        </Link>
       
          {/* <Link to={'/login'}>
                            <button className="hidden bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-[var(--therery)]/50 text-white px-4 md:px-4 py-3 md:py-3 rounded-xl font-semibold text-sm md:text-md transition-all duration-300 md:flex items-center justify-center gap-2">
                                <span>تسجيل الدخول</span>
                                <span>→</span>
                            </button>
                            </Link> */}
      </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-5 pt-2 border-t border-white/10">
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-gray-300 hover:text-white hover:bg-white/10 font-medium py-3 px-4 rounded-xl transition-all duration-200 text-right"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Link to={'/register'}>
          <button className="w-full bg-[#10B981] text-white py-3 rounded-xl hover:bg-[#0d9668] transition-all duration-300 font-semibold text-sm">
            أنشئ حسابك الآن
          </button>
          </Link>
          {/* <Link to={'/login'}>
          <button className="w-full mt-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-[var(--therery)]/50 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2">
            <span>تسجيل الدخول</span>
            <span>→</span>
          </button>
          </Link> */}
        </div>
      </div>
    </header>
  )
}

export default Header