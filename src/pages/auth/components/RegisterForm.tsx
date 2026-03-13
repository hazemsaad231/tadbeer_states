
import { AuthLogo} from './AuthUI';
import { inputBase, inputStyle} from './authShared';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';

interface Props {
  onSwitchToLogin?: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: Props) => {



const {register,handleSubmit,formState:{errors}}=useForm(
  { defaultValues: {name:"" , email: "",phone:""} }
)

const {Register , loading }=useAuth();
const onSubmit=async(data:any)=>{
    const ok = await Register(data);
    setTimeout(() => {
      if(ok) onSwitchToLogin && onSwitchToLogin();
    }, 3000);
}
     



  return (
    <div className="w-full">
      <div className="flex justify-center mb-6"><AuthLogo /></div>
      <h2 className="text-2xl font-bold text-center mb-1" style={{ color: 'var(--primary)' }}>
        إنشاء حساب جديد
      </h2>
      <p className="text-gray-400 text-sm text-center mb-5">أنشئ حسابك وابدأ تحليل منشأتك مجاناً</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text" required placeholder="الاسم الكامل"
          className={inputBase} style={{ ...inputStyle }}
          {...register("name",{
            required:'name is required',
          })}
        />
        {!!errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
        {!!errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <input
          type="text" required placeholder="رقم الهاتف"
          className={inputBase} style={{ ...inputStyle }}
          {...register("phone",{
            required:'phone is required',
          })}
        />
        {!!errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        <button
          type="submit" disabled={loading}
          className="w-full py-3 bg-primary rounded-xl font-bold text-white tracking-widest transition-all duration-300 hover:-translate-y-0.5"
        >
          {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
        </button>
      </form>

      {onSwitchToLogin && (
        <p className="text-center text-gray-400 text-sm mt-5">
          لديك حساب بالفعل؟{' '}
          <button onClick={onSwitchToLogin} className="font-bold hover:underline" style={{ color: 'var(--primary)' }}>
            تسجيل الدخول
          </button>
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
