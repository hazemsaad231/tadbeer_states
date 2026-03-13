import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import OverlayPanel from './components/OverlayPanel';

interface Props {
  initialMode?: 'login' | 'register';
}

const AuthPage = ({ initialMode = 'login' }: Props) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
    
    >
      {/* ══ MOBILE LAYOUT (shown below md) ══ */}
      <div className="md:hidden w-full max-w-sm">
        {/* Colored header */}
        <div
          className="rounded-t-3xl px-8 py-8 text-center text-white bg-(--primary)"
        >
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? 'مرحباً بعودتك!' : 'مرحباً بصديقنا!'}
          </h2>
          <p className="text-sm opacity-75">
            {isLogin ? 'نسعد بتسجيل دخولك إلى تدبير' : 'ابدأ رحلتك مع تدبير الآن'}
          </p>
        </div>

        {/* White form card */}
        <div className="rounded-b-3xl bg-white shadow-2xl px-8 py-8">
          {isLogin
            ? <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            : <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          }
        </div>
      </div>

      {/* ══ DESKTOP LAYOUT (hidden below md) ══ */}
      <div
        className="hidden md:block relative overflow-hidden rounded-3xl shadow-2xl bg-white w-full"
        style={{ maxWidth: '900px', minHeight: '580px' }}
      >
        {/* Login Form (left half) */}
        <div
          className="absolute inset-y-0 left-0 flex items-center justify-center p-10 lg:p-14 transition-opacity duration-500"
          style={{ width: '50%', opacity: isLogin ? 1 : 0, zIndex: isLogin ? 5 : 1, pointerEvents: isLogin ? 'auto' : 'none' }}
        >
          <LoginForm />
        </div>

        {/* Register Form (right half) */}
        <div
          className="absolute inset-y-0 right-0 flex items-center justify-center p-10 lg:p-14 transition-opacity duration-500"
          style={{ width: '50%', opacity: isLogin ? 0 : 1, zIndex: isLogin ? 1 : 5, pointerEvents: isLogin ? 'none' : 'auto' }}
        >
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        </div>

        <OverlayPanel
          isLogin={isLogin}
          onSwitchToRegister={() => setIsLogin(false)}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      </div>
    </div>
  );
};

export default AuthPage;
