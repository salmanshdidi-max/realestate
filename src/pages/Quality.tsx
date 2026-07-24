import { ShieldCheck, AlertOctagon, ClipboardCheck, BadgeAlert } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { StatusBadge } from '@/components/ui/status-badge';

const mockQuality = [
  { id: 'Q-001', project: 'مشروع الواجهة البحرية', score: 92, defects: 12, audits: 4, status: 'ممتاز' },
  { id: 'Q-002', project: 'المدينة المتكاملة', score: 75, defects: 45, audits: 2, status: 'يتطلب تحسين' },
  { id: 'Q-003', project: 'برج الأعمال المركزي', score: 88, defects: 18, audits: 6, status: 'جيد جداً' },
  { id: 'Q-004', project: 'مجمع النخيل السكني', score: 95, defects: 3, audits: 8, status: 'ممتاز' },
];

export default function Quality() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">الجودة والالتزام</h1>
        <p className="text-muted-foreground">مراقبة معايير الجودة، التفتيش الميداني، والامتثال للمواصفات.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="مؤشر الجودة العام" value="88%" icon={ShieldCheck} trend="up" trendValue="+2%" className="border-emerald-500/30" />
        <KPICard title="مخالفات قيد المعالجة" value="78" icon={AlertOctagon} className="border-amber-500/30" />
        <KPICard title="زيارات تفتيشية" value="142" icon={ClipboardCheck} />
        <KPICard title="إنذارات مقاولين" value="5" icon={BadgeAlert} className="border-destructive/30" />
      </div>

      <div className="glass-panel rounded-xl overflow-hidden p-6">
        <h3 className="font-bold text-lg mb-6">سجل الجودة للمشاريع الرئيسية</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground bg-accent/50">
              <tr>
                <th className="px-6 py-4 font-medium">المشروع</th>
                <th className="px-6 py-4 font-medium">مؤشر الجودة</th>
                <th className="px-6 py-4 font-medium">ملاحظات العيوب (Defects)</th>
                <th className="px-6 py-4 font-medium">التفتيش (Audits)</th>
                <th className="px-6 py-4 font-medium">التقييم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockQuality.map((item) => (
                <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{item.project}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold ${item.score > 90 ? 'text-emerald-500' : item.score > 80 ? 'text-primary' : 'text-amber-500'}`}>{item.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-destructive">{item.defects}</td>
                  <td className="px-6 py-4 font-mono">{item.audits}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status === 'ممتاز' ? 'مكتمل' : item.status === 'جيد جداً' ? 'معتمد' : 'متوسط'} />
                    <span className="mr-2 text-xs">{item.status}</span>
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
