import { StatusBadge } from '@/components/ui/status-badge';

const mockLicenses = [
  { id: 'LIC-001', type: 'رخصة بناء', project: 'مشروع الواجهة البحرية', authority: 'أمانة جدة', submitDate: '2023-10-01', status: 'معتمد', expiry: '2026-10-01' },
  { id: 'LIC-002', type: 'تصريح بيئي', project: 'المدينة المتكاملة', authority: 'وزارة البيئة', submitDate: '2026-01-15', status: 'قيد الانتظار', expiry: '-' },
  { id: 'LIC-003', type: 'موافقة دفاع مدني', project: 'مول الرياض الجديد', authority: 'الدفاع المدني', submitDate: '2026-02-01', status: 'قيد الانتظار', expiry: '-' },
  { id: 'LIC-004', type: 'رخصة حفر', project: 'برج الأعمال المركزي', authority: 'أمانة الرياض', submitDate: '2024-01-10', status: 'منتهي', expiry: '2026-01-10' },
  { id: 'LIC-005', type: 'تصريح مرور', project: 'مجمع النخيل السكني', authority: 'إدارة المرور', submitDate: '2023-05-20', status: 'مرفوض', expiry: '-' },
];

export default function Licenses() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">التراخيص والموافقات الحكومية</h1>
        <p className="text-muted-foreground">تتبع حالة التراخيص والموافقات المطلوبة لكل مشروع لتفادي التوقفات.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground bg-accent/50">
              <tr>
                <th className="px-6 py-4 font-medium">رقم الطلب</th>
                <th className="px-6 py-4 font-medium">نوع الترخيص</th>
                <th className="px-6 py-4 font-medium">المشروع</th>
                <th className="px-6 py-4 font-medium">الجهة الحكومية</th>
                <th className="px-6 py-4 font-medium">تاريخ التقديم</th>
                <th className="px-6 py-4 font-medium">تاريخ الانتهاء</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLicenses.map((lic) => (
                <tr key={lic.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-muted-foreground">{lic.id}</td>
                  <td className="px-6 py-4 font-bold text-foreground">{lic.type}</td>
                  <td className="px-6 py-4">{lic.project}</td>
                  <td className="px-6 py-4">{lic.authority}</td>
                  <td className="px-6 py-4 font-mono">{lic.submitDate}</td>
                  <td className="px-6 py-4 font-mono">{lic.expiry}</td>
                  <td className="px-6 py-4"><StatusBadge status={lic.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
