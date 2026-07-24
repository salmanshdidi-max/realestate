import { GitBranch, CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

const changes = [
  { id: 'CR-001', title: 'تعديل مساحة الطابق العاشر', project: 'برج الأعمال المركزي', type: 'تصميمي', impact: 'تكلفة', costDelta: +850000, scheduleDelta: 14, status: 'معتمد', requestedBy: 'العميل', date: '2026-01-15' },
  { id: 'CR-002', title: 'إضافة طابق وقوف سيارات', project: 'مجمع النخيل السكني', type: 'نطاق', impact: 'تكلفة وجدول', costDelta: +2400000, scheduleDelta: 30, status: 'معلق', requestedBy: 'المطور', date: '2026-02-10' },
  { id: 'CR-003', title: 'تغيير نوع الواجهة الزجاجية', project: 'مشروع الواجهة البحرية', type: 'مواد', impact: 'تكلفة', costDelta: -320000, scheduleDelta: 0, status: 'معتمد', requestedBy: 'المقاول', date: '2026-03-01' },
  { id: 'CR-004', title: 'تسريع جدول التسليم', project: 'مول الرياض الجديد', type: 'جدول', impact: 'تكلفة', costDelta: +1100000, scheduleDelta: -21, status: 'مرفوض', requestedBy: 'العميل', date: '2026-03-20' },
  { id: 'CR-005', title: 'مراجعة مواصفات أنظمة الإطفاء', project: 'المدينة المتكاملة', type: 'تقني', impact: 'جودة', costDelta: +450000, scheduleDelta: 7, status: 'قيد المراجعة', requestedBy: 'الاستشاري', date: '2026-04-05' },
  { id: 'CR-006', title: 'إضافة نظام طاقة شمسية', project: 'مجمع النخيل السكني', type: 'إضافة', impact: 'تكلفة', costDelta: +700000, scheduleDelta: 10, status: 'معتمد', requestedBy: 'المطور', date: '2026-04-18' },
];

const statusColor: Record<string, string> = {
  'معتمد': 'bg-emerald-500/10 text-emerald-500',
  'مرفوض': 'bg-destructive/10 text-destructive',
  'معلق': 'bg-amber-500/10 text-amber-500',
  'قيد المراجعة': 'bg-primary/10 text-primary',
};
const typeColor: Record<string, string> = {
  'تصميمي': 'bg-blue-500/10 text-blue-500',
  'نطاق': 'bg-purple-500/10 text-purple-500',
  'مواد': 'bg-orange-500/10 text-orange-500',
  'جدول': 'bg-amber-500/10 text-amber-500',
  'تقني': 'bg-primary/10 text-primary',
  'إضافة': 'bg-emerald-500/10 text-emerald-500',
};

export default function ChangeManagement() {
  const approved = changes.filter(c => c.status === 'معتمد').length;
  const pending = changes.filter(c => c.status === 'معلق' || c.status === 'قيد المراجعة').length;
  const totalCostImpact = changes.filter(c => c.status === 'معتمد').reduce((s, c) => s + c.costDelta, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إدارة التغيير</h1>
        <p className="text-muted-foreground">متابعة طلبات التغيير وتأثيرها على التكلفة والجدول الزمني.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي طلبات التغيير', value: changes.length, icon: GitBranch, color: 'text-primary' },
          { label: 'معتمدة', value: approved, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'قيد المراجعة', value: pending, icon: Clock, color: 'text-amber-500' },
          { label: 'أثر التكلفة الكلي', value: `${(totalCostImpact / 1000000).toFixed(1)}M`, icon: TrendingUp, color: totalCostImpact > 0 ? 'text-destructive' : 'text-emerald-500' },
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
          <h3 className="font-semibold text-lg">سجل طلبات التغيير</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {['الرمز', 'وصف التغيير', 'المشروع', 'النوع', 'أثر التكلفة', 'أثر الجدول', 'مقدم الطلب', 'الحالة'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {changes.map(c => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">{c.title}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{c.project}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColor[c.type]}`}>{c.type}</span></td>
                  <td className={`px-4 py-3 font-mono font-medium ${c.costDelta > 0 ? 'text-destructive' : 'text-emerald-500'}`}>
                    {c.costDelta > 0 ? '+' : ''}{(c.costDelta / 1000000).toFixed(2)}M
                  </td>
                  <td className={`px-4 py-3 font-mono ${c.scheduleDelta > 0 ? 'text-destructive' : c.scheduleDelta < 0 ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                    {c.scheduleDelta > 0 ? '+' : ''}{c.scheduleDelta} يوم
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.requestedBy}</td>
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
