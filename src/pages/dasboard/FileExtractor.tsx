import { useState, useRef, useEffect } from 'react';
import { Sparkles, Upload, Loader2, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import toast from 'react-hot-toast';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface Year {
  id: number;
  year: number;
}

interface Props {
  setFormData: (data: any) => void;
  formData: any;
  years: Year[];
}

const FileExtractor = ({ setFormData, formData, years }: Props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // ✅ دايماً بيحمل آخر نسخة من formData — بيحل مشكلة الـ stale closure
  const formDataRef = useRef(formData);
  useEffect(() => { formDataRef.current = formData; }, [formData]);

  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const readExcelAsText = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = XLSX.read(e.target?.result, { type: 'binary' });
        let text = '';
        wb.SheetNames.forEach((name) => {
          text += XLSX.utils.sheet_to_csv(wb.Sheets[name]) + '\n';
        });
        res(text);
      };
      reader.onerror = rej;
      reader.readAsBinaryString(file);
    });

  const readFileAsText = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target?.result as string);
      reader.onerror = rej;
      reader.readAsText(file);
    });

  // تحويل صفحات الـ PDF لصور base64 (يشتغل مع الـ scanned PDFs)
  const renderPdfAsImages = async (file: File): Promise<string[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const images: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({
        canvasContext: canvas.getContext('2d')!,
        canvas,
        viewport,
      }).promise;
      images.push(canvas.toDataURL('image/png').split(',')[1]);
    }
    return images;
  };

  const extractData = async (file: File) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const isExcel = ['xlsx', 'xls'].includes(ext || '');
      const isCsv = ext === 'csv';
      const isPdf = ext === 'pdf';

      const jsonSchema = `{
  "year": "", "revenues": "", "direct_expenses": "", "cost_of_goods_sold": "",
  "gross_profit": "", "administrative_expenses": "", "marketing_expenses": "",
  "net_profit": "", "fixed_assets": "", "current_assets": "", "cash_and_equivalents": "",
  "receivables": "", "inventory": "", "current_liabilities": "", "creditors": "",
  "accrued_expenses": "", "long_term_liabilities": "", "loans": "",
  "end_of_service_provision": "", "equity": "", "capital": "", "retained_earnings": ""
}`;

      const promptText = `أنت محاسب خبير. استخلص البيانات المالية وأرجع JSON فقط بهذا الشكل بدون أي نص آخر:\n${jsonSchema}\nضع الأرقام فقط بدون رموز عملة أو فواصل. في حقل year ضع السنة الميلادية فقط (مثل 2023). إذا لم تجد قيمة اتركها فارغة "".`;

      let messages: any[];

      if (isPdf) {
        // PDF مسموح — نحوله لصور ونبعته لـ vision model
        const images = await renderPdfAsImages(file);
        messages = [{
          role: 'user',
          content: [
            ...images.map((b64) => ({
              type: 'image_url',
              image_url: { url: `data:image/png;base64,${b64}` },
            })),
            { type: 'text', text: promptText },
          ],
        }];
      } else {
        let fileText = '';
        if (isExcel) {
          fileText = await readExcelAsText(file);
        } else if (isCsv) {
          fileText = await readFileAsText(file);
        } else {
          setError('الملفات المدعومة: Excel, CSV, PDF فقط');
          setLoading(false);
          return;
        }
        messages = [{ role: 'user', content: `${promptText}\n\nبيانات الملف:\n${fileText}` }];
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          // vision model للـ PDF، text model للباقي
          model: isPdf ? 'meta-llama/llama-4-scout-17b-16e-instruct' : 'llama-3.1-8b-instant',
          messages,
          temperature: 0.1,
        }),
      });

      const data = await res.json();
      console.log('Groq Response:', data);

      const text = data.choices?.[0]?.message?.content || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const extracted = JSON.parse(clean);

      // مطابقة السنة مع الـ years array
      let yearId = formDataRef.current.yearId;
      if (extracted.year) {
        const matchedYear = years.find(
          (y) => String(y.year) === String(extracted.year)
        );
        if (matchedYear) yearId = String(matchedYear.id);
      }

      // حذف year من الـ extracted عشان ميتحطش في formData
      const { year, ...rest } = extracted;

      setFormData({ ...formDataRef.current, ...rest, yearId });
      setSuccess(true);
      toast.success('تم استخلاص البيانات بنجاح! تحقق من الحقول المعبأة.');
    } catch (e) {
      console.error(e);
      setError('فشل في استخلاص البيانات، تأكد من الملف وحاول مجدداً');
      toast.error('فشل في استخلاص البيانات، تأكد من الملف وحاول مجدداً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-xl p-4 mb-4 flex items-center justify-between gap-4"
      style={{ background: '#f0fdf4', border: '1.5px dashed #10B981' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: '#10B981' }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: '#065f46' }}>
            استخلاص تلقائي 
          </p>
          <p className="text-xs text-gray-500">
            ارفع ملف Excel أو CSV أو PDF وسنملأ الحقول تلقائياً
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {success && <CheckCircle className="w-5 h-5 text-green-500" />}
        {error && (
          <p className="text-xs text-red-500 max-w-xs text-right">{error}</p>
        )}

        {/* ✅ الإصلاح: e.target.value = '' بعد الاختيار علشان نفس الملف يشتغل تاني مرة */}
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept=".xlsx,.xls,.csv,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              extractData(file);
              e.target.value = '';
            }
          }}
        />

        <button
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all"
          style={{ background: loading ? '#9ca3af' : '#10B981' }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> جاري الاستخلاص...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> رفع ملف
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileExtractor;