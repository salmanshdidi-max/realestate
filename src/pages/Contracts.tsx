import { ClipboardList, CheckCircle2, Clock, AlertCircle, CircleDollarSign } from 'lucide-react';

// Contract values in Million SAR
const contracts = [
  { id: 'CNT-001', title: 'عقد إنشاء الهيكل الإنشائي', project: 'برج الأعمال المركزي', contractor: 'شركة البناء المتطور', value: 18.0, type: 'إنشاء', status: 'نشط', startDate: '2025-03-01', endDate: '2026-09-30', completion: 45 },
  { id: 'CNT-002', title: 'عقد الإشراف الهندسي', project: 'مشروع الواجهة البحرية', contractor: 'مكتب الاستشارات الدولية', value: 3.2, type: 'استشاري', status: 'نشط', startDate: '2024-11-01', endDate: '2026-11-01', completion: 62 },
  { id: 'CNT-003', title: 'عقد أعمال التشطيبات', project: 'مجمع النخيل السكني', contractor: 'مجموعة الإعمار للتشطيبات', value: 12.0, type: 'تشطيبات', status: 'معلق', startDate: '2026-05-01', endDate: '2027-02-28', completion: 0 },
  { id: 'CNT-004', title: 'عقد الأنظمة الكهربائية', project: 'مول الرياض الجديد', contractor: 'الشركة السعودية للكهرباء المقاولات', value: 6.5, type: 'كهرباء وميكانيكا', status: 'نشط', startDate: '2025-06-15', endDate: '2026-08-15', completion: 71 },
  { id: 'CNT-005', title: 'عقد التصميم المعماري', project: 'المدينة المتكاملة', contractor: 'استوديو التصميم الإبداعي', value: 4.0, type: 'تصميم', status: 'مكتمل', startDate: '2024-01-10', endDate: '2025-12-31', completion: 100 },
  { id: 'CNT-006', title: 'عقد توريد مواد البناء', project: 'برج الأعمال المركزي', contractor: 'مصنع الخرسانة الوطني', value: 5.5, type: 'توريد', status: 'نشط', startDate: '2025-04-01', endDate: '2026-06-30', completion: 55 },
  { id: 'CNT-007', title: 'عقد أعمال الطرق والبنية التحتية', project: 'مجمع النخيل السكني', contractor: 'شركة الطرق والأعمال الإنشائية', value: 9.8, type: 'بنية تحتية', status: 'متأخر', startDate: '2025-01-01', endDate: '2026-03-31', completion: 38 },
];

const statusColor: Record<string, string> = {
  'نشط': 'bg-primary/10 text-primary',
  'مكتمل': 'bg-emerald-500/10 text-emerald-500',
  'معلق': 'bg-amber-500/10 text-amber-500',
  'متأخر': 'bg-destructive/10 text-destructive',
};

export default function Contracts() {
  const totalValue = contracts.reduce((s, c) => s + c.value, 0);
  const active = contracts.filter(c => c.status === 'نشط').length;
  const delayed = contracts.filter(c => c.status === 'متأخر').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إدارة العقود</h1>
        <p className="text-muted-foreground">متابعة العقود مع المقاولين والاستشاريين وتحليل الأداء التعاقدي.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي العقود', value: contracts.length, icon: ClipboardList, color: 'text-primary' },
          { label: 'القيمة الإجمالية (مليون ر.س)', value: `${totalValue.toFixed(1)}M`, icon: CircleDollarSign, color: 'text-emerald-500' },
          { label: 'عقود نشطة', value: active, icon: Clock, color: 'text-primary' },
          { label: 'عقود متأخرة', value: delayed, icon: AlertCircle, color: 'text-destructive' },
        ].map((k, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl">
            <div className={`mb-2 ${k.color}`}><k.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold font-mono">{k.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-lg">سجل العقود</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {['الرمز', 'العقد', 'المشروع', 'الجهة المتعاقدة', 'القيمة (مليون ر.س)', 'الإنجاز', 'تاريخ الانتهاء', 'الحالة'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contracts.map(c => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                  <td className="px-4 py-3 font-medium max-w-[180px] truncate">{c.title}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.project}</td>
                  <td className="px-4 py-3 text-xs">{c.contractor}</td>
                  <td className="px-4 py-3 font-mono">{c.value.toFixed(1)}</td>
                  <td className="px-4 py-3 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${c.completion}%` }} />
                      </div>
                      <span className="text-xs font-mono w-8">{c.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{c.endDate}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor[c.status]}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
