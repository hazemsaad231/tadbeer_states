interface Props {
  isLogin: boolean;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

const overlayBtn =
  'px-10 py-3 rounded-full border-2 border-white text-white font-bold text-sm tracking-widest transition-all duration-300';

const OverlayPanel = ({ isLogin, onSwitchToRegister, onSwitchToLogin }: Props) => (
  <div
    className="absolute inset-y-0 w-1/2 z-20 transition-all duration-700 ease-in-out"
    style={{
      left: isLogin ? '50%' : '0%',
      background: 'var(--primary)',
    }}
  >
    {/* Decorative circles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full" style={{ background: 'rgba(212,175,95,0.18)' }} />
      <div className="absolute top-1/3 -left-10 w-32 h-32 rounded-full" style={{ background: 'rgba(16,185,129,0.18)' }} />
      <div className="absolute -bottom-12 right-1/3 w-44 h-44 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="absolute top-1/4 right-1/4 w-5 h-5 rounded-full" style={{ background: 'rgba(212,175,95,0.5)' }} />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.35)' }} />
      <div className="absolute top-2/3 right-1/2 w-4 h-4 rounded-full" style={{ background: 'rgba(16,185,129,0.4)' }} />
    </div>

    {/* دعوة للتسجيل (تظهر وقت login) */}
    <div className={`absolute inset-0 flex flex-col items-center justify-center px-10 text-white transition-opacity duration-300 ${isLogin ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative z-10 text-center">
        {/* <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'rgba(212,175,95,0.25)', border: '2px solid rgba(212,175,95,0.5)' }}>
          <span className="text-2xl font-bold" style={{ color: 'var(--therery)' }}>ت</span>
        </div> */}
        <h2 className="text-3xl font-bold mb-3">مرحباً !</h2>
        <p className="text-sm opacity-75 mb-8 leading-relaxed">أدخل بياناتك الشخصية<br />وابدأ رحلتك معنا</p>
        <button
          onClick={onSwitchToRegister}
          className={overlayBtn}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#14184c'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
        >
          إنشاء حساب
        </button>
      </div>
    </div>

    {/* دعوة لتسجيل الدخول (تظهر وقت register) */}
    <div className={`absolute inset-0 flex flex-col items-center justify-center px-10 text-white transition-opacity duration-300 ${!isLogin ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative z-10 text-center">
        {/* <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'rgba(212,175,95,0.25)', border: '2px solid rgba(212,175,95,0.5)' }}>
          <span className="text-2xl font-bold" style={{ color: 'var(--therery)' }}>ت</span>
        </div> */}
        <h2 className="text-3xl font-bold mb-3">مرحباً بعودتك!</h2>
        <p className="text-sm opacity-75 mb-8 leading-relaxed">للبقاء على تواصل معنا<br />يرجى تسجيل الدخول ببياناتك</p>
        <button
          onClick={onSwitchToLogin}
          className={overlayBtn}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#14184c'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  </div>
);

export default OverlayPanel;
