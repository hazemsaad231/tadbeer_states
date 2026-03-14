// src/hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Login_api, Register_api} from '../api/api';
import { success, Error as toastError } from '../ui/toasts';
import { useAuthContext } from '../context/AuthContext';

const ADMIN_EMAIL = 'hazemmahisin325@gmail.com'

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  // دالة مساعدة للتعامل مع الأخطاء (DRY Principle)
  const handleError = (error: any) => {
    console.log("Error Response:", error);
    const message = Array.isArray(error.response.data.message)
      ? error.response.data.message[0]
      : error.response.data.message;
    toastError(message || "حدث خطأ ما، حاول مرة أخرى");
  };

  // 1. تسجيل الدخول
  const login = async (data: any) => {
  setLoading(true);
  try {
    const response = await axios.post(Login_api, data);
    const Data = response?.data;

    // ✅ تأكد إن الـ response فيه user و token
    if (!Data || !Data.user || !Data.token) {
      throw new Error("استجابة غير متوقعة من الخادم");
    }

    const userData = {
      id: Data.user.id,
      name: Data.user.name || 'مستخدم',
      email: Data.user.email,
      phone: Data.user.phone,
      role: data.email === ADMIN_EMAIL ? 'admin' as const : 'client' as const,
    }

    setUser(userData);
    localStorage.setItem('token', Data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    success("تم تسجيل الدخول بنجاح");
    setTimeout(() => navigate("/dashboard"), 500);

  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
};

  // 2. إنشاء حساب جديد
  const Register = async (data: any): Promise<boolean> => {
    setLoading(true);
    try {
      await axios.post(Register_api, data);
      success("تم إنشاء الحساب بنجاح! تم إرسال بيانات حسابك إلى بريدك الإلكتروني 📧" );
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 3. نسيان كلمة المرور
  // const forgotPassword = async (email: string) => {
  //   setLoading(true);
  //   try {
  //     await axios.post(Forgot_api, { email });
  //     success("تم إرسال رابط استعادة كلمة المرور");
  //     navigate("/login/reset");
  //   } catch (error) {
  //     handleError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 4. تعيين كلمة مرور جديدة
  // const resetPassword = async (data: any) => {
  //   setLoading(true);
  //   try {
  //     await axios.post(Reset_api, data);
  //     success("تم تغيير كلمة المرور بنجاح");
  //     navigate("/login");
  //   } catch (error) {
  //     handleError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    login,
    Register,
    loading
  };
};