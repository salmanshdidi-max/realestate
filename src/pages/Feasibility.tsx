import { StatusBadge } from '@/components/ui/status-badge';

const mockStudies = [
  { id: 'FS-001', project: 'مشروع الواجهة البحرية', date: '2023-11-15', irr: 18.5, payback: 5.2, npv: 28, status: 'مُوصى به' },
  { id: 'FS-002', project: 'برج الأعمال المركزي', date: '2026-01-20', irr: 14.2, payback: 7.5, npv: 14, status: 'تحت المراجعة' },
  { id: 'FS-003', project: 'مجمع النخيل السكني', date: '2023-09-05', irr: 11.5, payback: 8.5, npv: 5, status: 'مرفوض' },
  { id: 'FS-004', project: 'مول الرياض الجديد', date: '2026-02-10', irr: 21.4, payback: 4.8, npv: 35, status: 'مُوصى به' },
  { id: 'FS-005', project: 'مشروع المدينة المتكاملة', date: '2023-12-01', irr: 16.8, payback: 6.5, npv: 22, status: 'تحت المراجعة' },
];

export default function Feasibility() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">دراسات الجدوى</h1>
        <p className="text-muted-foreground">تحليل العوائد الاستثمارية للفرص والمشاريع المقترحة.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground bg-accent/50">
              <tr>
                <th className="px-6 py-4 font-medium">الرمز</th>
                <th className="px-6 py-4 font-medium">المشروع</th>
                <th className="px-6 py-4 font-medium">تاريخ الدراسة</th>
                <th className="px-6 py-4 font-medium">العائد الداخلي (IRR)</th>
                <th className="px-6 py-4 font-medium">مدة الاسترداد (سنوات)</th>
                <th className="px-6 py-4 font-medium">القيمة الحالية (NPV) - مليون</th>
                <th className="px-6 py-4 font-medium">التوصية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockStudies.map((study) => (
                <tr key={study.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-muted-foreground">{study.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{study.project}</td>
                  <td className="px-6 py-4">{study.date}</td>
                  <td className="px-6 py-4 font-mono text-primary font-bold">{study.irr}%</td>
                  <td className="px-6 py-4 font-mono">{study.payback}</td>
                  <td className="px-6 py-4 font-mono">{study.npv}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={study.status === 'مُوصى به' ? 'مكتمل' : study.status === 'تحت المراجعة' ? 'قيد الانتظار' : 'مرفوض'} />
                    <span className="mr-2 text-xs">{study.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
