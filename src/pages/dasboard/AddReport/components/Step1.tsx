import React from 'react';

interface Step4Props {
  formData: {
    revenues: string;
    direct_expenses: string;
    cost_of_goods_sold: string;
    gross_profit: string;
    administrative_expenses: string;
    marketing_expenses: string;
    net_profit: string;
  };
  setFormData: (data: any) => void;
}

const Step1: React.FC<Step4Props> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClass = "w-full px-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 text-right text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] transition-colors";
  const labelClass = "block text-right text-[#14184c] font-semibold text-sm mb-2";

  console.log('Rendering Step1 with formData:', formData);

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>الإيرادات</label>
        <input type="number" name="revenues" value={formData.revenues} onChange={handleInputChange} placeholder="أدخل قيمة الإيرادات..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>المصروفات المباشرة</label>
        <input type="number" name="direct_expenses" value={formData.direct_expenses} onChange={handleInputChange} placeholder="أدخل قيمة المصروفات المباشرة..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>تكلفة البضاعة المباعة</label>
        <input type="number" name="cost_of_goods_sold" value={formData.cost_of_goods_sold} onChange={handleInputChange} placeholder="أدخل تكلفة البضاعة المباعة..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>الربح الإجمالي</label>
        <input type="number" name="gross_profit" value={formData.gross_profit} onChange={handleInputChange} placeholder="أدخل قيمة الربح الإجمالي..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>المصروفات الإدارية</label>
        <input type="number" name="administrative_expenses" value={formData.administrative_expenses} onChange={handleInputChange} placeholder="أدخل قيمة المصروفات الإدارية..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>مصروفات التسويق</label>
        <input type="number" name="marketing_expenses" value={formData.marketing_expenses} onChange={handleInputChange} placeholder="أدخل قيمة مصروفات التسويق..." min="0" step="0.01" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>صافي الربح</label>
        <input type="number" name="net_profit" value={formData.net_profit} onChange={handleInputChange} placeholder="أدخل قيمة صافي الربح..." min="0" step="0.01" className={inputClass} />
      </div>
    </div>
  );
};

export default Step1;
