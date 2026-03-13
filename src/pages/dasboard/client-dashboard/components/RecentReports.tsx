import { CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Report } from '../../types';


export const RecentReportsList = ({ reports }: { reports: Report[] }) => (
  <div className="bg-white p-6 rounded-2xl border border-[#f0f2f5] shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-base font-bold text-[#14184C]">تقاريري المالية الأخيرة</h3>
      <Link to="/dashboard/reports" className="text-xs font-medium text-[#10B981] hover:underline">عرض الكل ←</Link>
    </div>
    <div className="space-y-3">
      {reports.map((report) => (
        <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-mono">{report.id}</span>
            <span className="text-sm font-semibold">{report.title}</span>
          </div>
          <div className="flex items-center gap-4">
             <span className={`px-2 py-1 rounded-full text-[10px] flex items-center gap-1 ${report.status === 'مكتمل' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
               {report.status === 'مكتمل' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
               {report.status}
             </span>
             <span className="text-[11px] text-gray-400">{report.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);