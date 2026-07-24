import { HardHat, AlertTriangle, CheckCircle2, Users, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

const hseData = [
  { project: 'الواجهة البحرية', incidents: 2, nearMisses: 5, inspections: 12, score: 88 },
  { project: 'برج الأعمال', incidents: 0, nearMisses: 3, inspections: 15, score: 96 },
  { project: 'النخيل السكني', incidents: 1, nearMisses: 8, inspections: 10, score: 82 },
  { project: 'مول الرياض', incidents: 3, nearMisses: 11, inspections: 9, score: 74 },
  { project: 'المدينة المتكاملة', incidents: 0, nearMisses: 2, inspections: 18, score: 98 },
];

const incidents = [
  { id: 'INC-001', type: 'إصابة طفيفة', project: 'مشروع الواجهة البحرية', date: '2026-03-15', severity: 'منخفض', status: 'مغلق', description: 'جرح بسيط نتيجة استخدام أداة غير مناسبة' },
  { id: 'INC-002', type: 'حادث مركبة', project: 'مول الرياض الجديد', date: '2026-04-02', severity: 'متوسط', status: 'قيد التحقيق', description: 'تصادم بسيط داخل الموقع بسرعة منخفضة' },
  { id: 'INC-003', type: 'سقوط من ارتفاع', project: 'مول الرياض الجديد', date: '2026-04-18', severity: 'عالي', status: 'قيد التحقيق', description: 'سقوط عامل من سقالة ارتفاع 3 أمتار' },
  { id: 'INC-004', type: 'إصابة طفيفة', project: 'مجمع النخيل السكني', date: '2026-05-05', severity: 'منخفض', status: 'مغلق', description: 'إصابة في القدم أثناء نقل مواد' },
];

const severityColor: Record<string, string> = {
  'منخفض': 'bg-emerald-500/10 text-emerald-500',
  'متوسط': 'bg-amber-500/10 text-amber-500',
  'عالي': 'bg-destructive/10 text-destructive',
};

export default function HSE() {
  const totalIncidents = hseData.reduce((s, d) => s + d.incidents, 0);
  const totalNearMisses = hseData.reduce((s, d) => s + d.nearMisses, 0);
  const avgScore = Math.round(hseData.reduce((s, d) => s + d.score, 0) / hseData.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إدارة السلامة والصحة المهنية — HSE</h1>
        <p className="text-muted-foreground">مراقبة الحوادث ومؤشرات السلامة وضمان بيئة عمل آمنة في جميع المواقع.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'الحوادث المسجلة', value: totalIncidents, icon: AlertTriangle, color: 'text-destructive' },
          { label: 'الأحداث المقاربة', value: totalNearMisses, icon: TrendingDown, color: 'text-amber-500' },
          { label: 'متوسط درجة السلامة', value: `${avgScore}%`, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'إجمالي التفتيشات', value: hseData.reduce((s, d) => s + d.inspections, 0), icon: HardHat, color: 'text-primary' },
        ].map((k, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl">
            <div className={`mb-2 ${k.color}`}><k.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold font-mono">{k.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-5">درجة السلامة حسب المشروع</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hseData} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="project" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`${v}%`, 'درجة السلامة']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={28}>
                  {hseData.map((d, i) => (
                    <Cell key={i} fill={d.score >= 90 ? 'hsl(142 71% 45%)' : d.score >= 80 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            سجل الحوادث
          </h3>
          <div className="space-y-3 overflow-y-auto max-h-[260px]">
            {incidents.map(inc => (
              <div key={inc.id} className="p-3 border border-border rounded-lg bg-card/50">
                <div className="flex items-start justify-between mb-1">
                  <span className="font-medium text-sm">{inc.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${severityColor[inc.severity]}`}>{inc.severity}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{inc.project} — {inc.date}</p>
                <p className="text-xs text-muted-foreground">{inc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
