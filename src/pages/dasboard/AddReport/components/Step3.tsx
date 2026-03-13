import React from 'react';

interface Step3Props {
  formData: {
    yearId: string;
    revenues: string;
    direct_expenses: string;
    cost_of_goods_sold: string;
    gross_profit: string;
    administrative_expenses: string;
    marketing_expenses: string;
    net_profit: string;
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
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  years: Array<{ id: number; year: number }>;
}

const Step3: React.FC<Step3Props> = ({ formData, years }) => {
  const getYearValue = (yearId: string): string => {
    if (!yearId) return 'لم يتم الاختيار';
    const year = years.find(y => y.id === Number(yearId));
    return year ? String(year.year) : 'لم يتم الاختيار';
  };

  const Row = ({ label, value }: { label: string; value: string }) => (
    <p className="mb-1">
      <span className="text-gray-500 font-semibold text-xs sm:text-sm">{label}:</span>{' '}
      {value || 'لم يتم الإدخال'}
    </p>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
        <h3 className="text-[#14184c] font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-right">ملخص البيانات</h3>
        <div className="space-y-3 sm:space-y-4 text-right text-gray-700 text-sm sm:text-base">

          <div className="border-b pb-3">
            <h4 className="font-bold text-base mb-2">السنة المالية</h4>
            <Row label="السنة المالية" value={getYearValue(formData.yearId)} />
          </div>


          <div className="border-b pb-3">
            <h4 className="font-bold text-base mb-2">قائمة الدخل</h4>
            <Row label="الإيرادات" value={formData.revenues} />
            <Row label="المصروفات المباشرة" value={formData.direct_expenses} />
            <Row label="تكلفة البضاعة المباعة" value={formData.cost_of_goods_sold} />
            <Row label="الربح الإجمالي" value={formData.gross_profit} />
            <Row label="المصروفات الإدارية" value={formData.administrative_expenses} />
            <Row label="مصروفات التسويق" value={formData.marketing_expenses} />
            <Row label="صافي الربح" value={formData.net_profit} />
          </div>

          <div>
            <h4 className="font-bold text-base mb-2">الميزانية</h4>
            <Row label="الأصول الثابتة" value={formData.fixed_assets} />
            <Row label="الأصول المتداولة" value={formData.current_assets} />
            <Row label="النقدية وما يعادلها" value={formData.cash_and_equivalents} />
            <Row label="الذمم المدينة" value={formData.receivables} />
            <Row label="المخزون" value={formData.inventory} />
            <Row label="الالتزامات المتداولة" value={formData.current_liabilities} />
            <Row label="الدائنون" value={formData.creditors} />
            <Row label="المصروفات المستحقة" value={formData.accrued_expenses} />
            <Row label="الالتزامات طويلة الأجل" value={formData.long_term_liabilities} />
            <Row label="القروض" value={formData.loans} />
            <Row label="مخصص نهاية الخدمة" value={formData.end_of_service_provision} />
            <Row label="حقوق الملكية" value={formData.equity} />
            <Row label="رأس المال" value={formData.capital} />
            <Row label="الأرباح المحتجزة" value={formData.retained_earnings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
