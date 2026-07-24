import { Layers, CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { mockProjects } from '@/data/projects';

// Budgets in Million SAR — realistic for a mid-size real estate company
const programs = [
  { id: 'PRG-001', nameAr: 'برنامج الإسكان الميسر', projects: 12, budget: 85, completion: 62, status: 'نشط', lead: 'م. خالد الحربي' },
  { id: 'PRG-002', nameAr: 'برنامج المشاريع التجارية', projects: 9, budget: 72, completion: 74, status: 'نشط', lead: 'م. سارة المالكي' },
  { id: 'PRG-003', nameAr: 'برنامج المدن المتكاملة', projects: 5, budget: 60, completion: 38, status: 'حرج', lead: 'م. فيصل القحطاني' },
  { id: 'PRG-004', nameAr: 'برنامج الضيافة والترفيه', projects: 4, budget: 45, completion: 81, status: 'على المسار', lead: 'م. نورة العتيبي' },
  { id: 'PRG-005', nameAr: 'برنامج البنية التحتية', projects: 7, budget: 38, completion: 55, status: 'متأخر', lead: 'م. عبدالله الدوسري' },
  { id: 'PRG-006', nameAr: 'برنامج التطوير الذكي', projects: 5, budget: 20, completion: 90, status: 'على المسار', lead: 'م. ريم الشمري' },
];

const statusColor: Record<string, string> = {
  'نشط': 'bg-primary/10 text-primary',
  'على المسار': 'bg-emerald-500/10 text-emerald-500',
  'متأخر': 'bg-amber-500/10 text-amber-500',
  'حرج': 'bg-destructive/10 text-destructive',
};

export default function Programs() {
  const totalBudget = programs.reduce((s, p) => s + p.budget, 0);
  const avgCompletion = Math.round(programs.reduce((s, p) => s + p.completion, 0) / programs.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إدارة البرامج</h1>
        <p className="text-muted-foreground">متابعة البرامج الاستراتيجية ومؤشرات أدائها على مستوى المحفظة.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي البرامج', value: programs.length, icon: Layers, color: 'text-primary' },
          { label: 'إجمالي الميزانية (م.ر)', value: `${totalBudget} مليون`, icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'متوسط الإنجاز', value: `${avgCompletion}%`, icon: CheckCircle2, color: 'text-primary' },
          { label: 'برامج حرجة', value: programs.filter(p => p.status === 'حرج' || p.status === 'متأخر').length, icon: AlertCircle, color: 'text-destructive' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl">
            <div className={`mb-2 ${kpi.color}`}><kpi.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold font-mono">{kpi.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-lg">البرامج الاستراتيجية</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {['الرمز', 'اسم البرنامج', 'القائد', 'المشاريع', 'الميزانية (مليون ر.س)', 'الإنجاز', 'الحالة'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {programs.map(p => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-4 py-3 font-medium">{p.nameAr}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.lead}</td>
                  <td className="px-4 py-3 font-mono text-center">{p.projects}</td>
                  <td className="px-4 py-3 font-mono">{p.budget}</td>
                  <td className="px-4 py-3 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${p.completion}%` }} />
                      </div>
                      <span className="font-mono text-xs w-8">{p.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusColor[p.status]}`}>{p.status}</span>
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
