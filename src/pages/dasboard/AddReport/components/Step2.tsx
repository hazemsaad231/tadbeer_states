import React from 'react';

interface Step5Props {
  formData: {
    fixed_assets: string;
    current_assets: string;
    cash_and_equivalents: string;
    receivables: string;
    inventory: string;
    current_liabilities: string;
    creditors: string;
    accrued_expenses: string;
    long_term_liabilities: string;
    loans: string;
    end_of_service_provision: string;
    equity: string;
    capital: string;
    retained_earnings: string;
  };
  setFormData: (data: any) => void;
}

const Step2: React.FC<Step5Props> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 text-right text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] transition-colors";
  const labelClass = "block text-right text-[#14184c] font-semibold text-sm mb-2";
  const sectionClass = "text-xs font-bold text-gray-400 uppercase tracking-wide pt-2";

  return (
    <div className="space-y-4">
      <p className={sectionClass}>الأصول</p>
      <div>
        <label className={labelClass}>الأصول الثابتة</label>
        <input type="number" name="fixed_assets" value={formData.fixed_assets} onChange={handleInputChange} placeholder="أدخل قيمة الأصول الثابتة..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>الأصول المتداولة</label>
        <input type="number" name="current_assets" value={formData.current_assets} onChange={handleInputChange} placeholder="أدخل قيمة الأصول المتداولة..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>النقدية وما يعادلها</label>
        <input type="number" name="cash_and_equivalents" value={formData.cash_and_equivalents} onChange={handleInputChange} placeholder="أدخل قيمة النقدية..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>الذمم المدينة (عملاء)</label>
        <input type="number" name="receivables" value={formData.receivables} onChange={handleInputChange} placeholder="أدخل قيمة الذمم المدينة..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>المخزون</label>
        <input type="number" name="inventory" value={formData.inventory} onChange={handleInputChange} placeholder="أدخل قيمة المخزون..." min="0" step="0.01" className={inputClass} />
      </div>

      <p className={sectionClass}>الالتزامات</p>
      <div>
        <label className={labelClass}>الالتزامات المتداولة</label>
        <input type="number" name="current_liabilities" value={formData.current_liabilities} onChange={handleInputChange} placeholder="أدخل قيمة الالتزامات المتداولة..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>الدائنون (موردون)</label>
        <input type="number" name="creditors" value={formData.creditors} onChange={handleInputChange} placeholder="أدخل قيمة الدائنين..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>المصروفات المستحقة</label>
        <input type="number" name="accrued_expenses" value={formData.accrued_expenses} onChange={handleInputChange} placeholder="أدخل قيمة المصروفات المستحقة..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>الالتزامات طويلة الأجل</label>
        <input type="number" name="long_term_liabilities" value={formData.long_term_liabilities} onChange={handleInputChange} placeholder="أدخل قيمة الالتزامات طويلة الأجل..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>القروض</label>
        <input type="number" name="loans" value={formData.loans} onChange={handleInputChange} placeholder="أدخل قيمة القروض..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>مخصص نهاية الخدمة</label>
        <input type="number" name="end_of_service_provision" value={formData.end_of_service_provision} onChange={handleInputChange} placeholder="أدخل قيمة مخصص نهاية الخدمة..." min="0" step="0.01" className={inputClass} />
      </div>

      <p className={sectionClass}>حقوق الملكية</p>
      <div>
        <label className={labelClass}>حقوق الملكية (إجمالي)</label>
        <input type="number" name="equity" value={formData.equity} onChange={handleInputChange} placeholder="أدخل إجمالي حقوق الملكية..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>رأس المال</label>
        <input type="number" name="capital" value={formData.capital} onChange={handleInputChange} placeholder="أدخل قيمة رأس المال..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>الأرباح المحتجزة</label>
        <input type="number" name="retained_earnings" value={formData.retained_earnings} onChange={handleInputChange} placeholder="أدخل قيمة الأرباح المحتجزة..." min="0" step="0.01" className={inputClass} />
      </div>
    </div>
  );
};

export default Step2;


