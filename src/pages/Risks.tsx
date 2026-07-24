import { mockRisks } from '@/data/risks';
import { StatusBadge } from '@/components/ui/status-badge';
import { ShieldAlert, Activity, Target } from 'lucide-react';

export default function Risks() {
  const openRisks = mockRisks.filter(r => r.status === 'مفتوح' || r.status === 'قيد المعالجة');
  const criticalRisks = openRisks.filter(r => r.severity === 'حرج');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إدارة المخاطر</h1>
        <p className="text-muted-foreground">سجل المخاطر المؤسسية واستراتيجيات التخفيف.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl flex items-center gap-4 bg-destructive/5 border-destructive/20">
          <div className="p-4 bg-destructive/20 text-destructive rounded-full">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-destructive">مخاطر حرجة نشطة</p>
            <h2 className="text-3xl font-bold text-destructive">{criticalRisks.length}</h2>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="p-4 bg-primary/20 text-primary rounded-full">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">إجمالي المخاطر المفتوحة</p>
            <h2 className="text-3xl font-bold text-foreground">{openRisks.length}</h2>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
          <div className="p-4 bg-emerald-500/20 text-emerald-500 rounded-full">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">مخاطر تمت معالجتها</p>
            <h2 className="text-3xl font-bold text-foreground">{mockRisks.filter(r => r.status === 'مغلق').length}</h2>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-card/50">
          <h3 className="font-bold text-lg">سجل المخاطر النشطة</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground bg-accent/50">
              <tr>
                <th className="px-6 py-4 font-medium">الرمز</th>
                <th className="px-6 py-4 font-medium">الوصف</th>
                <th className="px-6 py-4 font-medium">الفئة</th>
                <th className="px-6 py-4 font-medium">الاحتمالية x التأثير</th>
                <th className="px-6 py-4 font-medium">التصنيف</th>
                <th className="px-6 py-4 font-medium">المالك</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {openRisks.sort((a,b) => (b.impact * b.probability) - (a.impact * a.probability)).map((risk) => (
                <tr key={risk.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-muted-foreground">{risk.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground max-w-md">{risk.titleAr}</td>
                  <td className="px-6 py-4">{risk.category}</td>
                  <td className="px-6 py-4 font-mono text-center">{risk.probability} × {risk.impact} = {risk.probability * risk.impact}</td>
                  <td className="px-6 py-4"><StatusBadge status={risk.severity} /></td>
                  <td className="px-6 py-4">{risk.owner}</td>
                  <td className="px-6 py-4"><StatusBadge status={risk.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
