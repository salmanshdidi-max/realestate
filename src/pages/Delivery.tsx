import { StatusBadge } from '@/components/ui/status-badge';

const mockDelivery = [
  { id: 'PRJ-001', name: 'مشروع الواجهة البحرية', readiness: 92, targetDate: '2026-08-30', defects: 14, status: 'تجهيز للتسليم' },
  { id: 'PRJ-003', name: 'مجمع النخيل السكني', readiness: 98, targetDate: '2026-09-30', defects: 3, status: 'تسليم ابتدائي' },
  { id: 'PRJ-010', name: 'مشروع الفيلات الذكية', readiness: 100, targetDate: '2026-05-15', defects: 0, status: 'مكتمل' },
  { id: 'PRJ-015', name: 'مبنى المقر الرئيسي', readiness: 85, targetDate: '2026-11-01', defects: 45, status: 'اختبار وتشغيل' },
];

export default function Delivery() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">التسليم والتشغيل</h1>
        <p className="text-muted-foreground">متابعة المشاريع في مراحلها النهائية وجاهزيتها للتشغيل.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground bg-accent/50">
              <tr>
                <th className="px-6 py-4 font-medium">المشروع</th>
                <th className="px-6 py-4 font-medium">نسبة الجاهزية للتشغيل</th>
                <th className="px-6 py-4 font-medium">تاريخ التسليم المستهدف</th>
                <th className="px-6 py-4 font-medium">الملاحظات (Punch List)</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockDelivery.map((proj) => (
                <tr key={proj.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{proj.name}</td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${proj.readiness}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono w-8">{proj.readiness}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">{proj.targetDate}</td>
                  <td className="px-6 py-4 font-mono text-destructive">{proj.defects > 0 ? `${proj.defects} ملاحظة` : 'خالي من الملاحظات'}</td>
                  <td className="px-6 py-4"><StatusBadge status={proj.status} /></td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:underline font-medium text-xs">عرض القائمة</button>
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
