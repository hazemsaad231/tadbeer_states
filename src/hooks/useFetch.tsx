// src/hooks/useFetch.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = <T,>(url: string, options?: { headers: { Authorization: string; }; }) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // دالة مساعدة للتعامل مع الأخطاء
  const handleError = (err: any) => {
    const message = Array.isArray(err.response?.data?.message)
      ? err.response?.data?.message?.[0]
      : err.response?.data?.message;
    setError(message || 'فشل تحميل البيانات');
  };

  // جلب البيانات من الـ API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<T>(url, {
        headers: options?.headers || (token ? { Authorization: `Bearer ${token}` } : {}),
      });
      setData(response.data);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // حذف عنصر من الـ API
  const deleteItem = async (deleteUrl: string): Promise<boolean> => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(deleteUrl, {
        headers: options?.headers || (token ? { Authorization: `Bearer ${token}` } : {}),
      });
      return true;
    } catch (err: any) {
      const message = Array.isArray(err.response?.data?.message)
        ? err.response?.data?.message?.[0]
        : err.response?.data?.message;
      setDeleteError(message || 'فشل حذف العنصر');
      return false;
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData, deleteItem, deleteLoading, deleteError };
};

