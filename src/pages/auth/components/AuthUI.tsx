export const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const AuthLogo = () => (
  <a href="/" className="inline-flex items-center gap-2">
    {/* <div
      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
      style={{ backgroundColor: 'var(--therery)', color: 'var(--primary)' }}
    >
      ت
    </div>
    <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>تدبير</span> */}
              <img src="/logo2.jpeg" alt="Logo" className="h-26 w-36 md:h-24 md:w-40 object-contain" />

  </a>
);
