import { useState } from 'react';
// import { useAuthContext } from '../../../context/AuthContext';
import { AuthLogo} from './AuthUI';
import { inputBase, inputStyle } from './authShared';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';

interface Props {
  /** عرض رابط "إنشاء حساب" (للموبايل) */
  onSwitchToRegister?: () => void;
}

const LoginForm = ({ onSwitchToRegister }: Props) => {

  const {register,handleSubmit}=useForm<{email:string,password:string}>() 
  // const navigate = useNavigate()
  const [showPwd, setShowPwd] = useState(false);
  
  const {login,loading}=useAuth();
  // {تسجيل الدخول}
  const onSubmit=(data:any)=>{
     login(data);
  }
  
  
  // const { login } = useAuthContext();


  return (
    <div className="w-full">
      <div className="flex justify-center mb-6"><AuthLogo /></div>
      <h2 className="text-2xl font-bold text-center mb-1" style={{ color: 'var(--primary)' }}>
        تسجيل الدخول
      </h2>
      <p className="text-gray-400 text-sm text-center mb-5">أدخل بياناتك للوصول إلى حسابك</p>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email" required placeholder="البريد الإلكتروني"
          className={inputBase} style={{ ...inputStyle }}
          {...register("email",{
            required:'email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'invalid email address'
            }
          })}
        />
        <div className="relative">
          <input
            type={showPwd ? 'text' : 'password'} required placeholder="كلمة المرور"
            className={inputBase} style={{ ...inputStyle }}
            {...register("password",{
              required:'password is required',
              minLength: {
                value: 6,
                message: 'password must be at least 6 characters'
              }
            })}
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPwd ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full py-3 bg-primary rounded-xl font-bold text-white tracking-widest transition-all duration-300 hover:-translate-y-0.5"
          style={{ boxShadow: '0 4px 20px rgba(20,24,76,0.25)' }}
        >
          {loading ? 'جارٍ التحقق...' : 'دخول'}
        </button>
      </form>

      {onSwitchToRegister && (
        <p className="text-center text-gray-400 text-sm mt-5">
          ليس لديك حساب؟{' '}
          <button onClick={onSwitchToRegister} className="font-bold hover:underline" style={{ color: 'var(--scondary)' }}>
            إنشاء حساب
          </button>
        </p>
      )}
    </div>
  );
};

export default LoginForm;
