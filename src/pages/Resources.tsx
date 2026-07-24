import { mockContractors } from '@/data/contractors';
import { Users, Briefcase, TrendingUp, AlertCircle, Star, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const roles = [
  { role: 'مهندس مشاريع', count: 48, allocated: 42, utilization: 88 },
  { role: 'مهندس تخطيط', count: 15, allocated: 13, utilization: 87 },
  { role: 'مهندس تكاليف', count: 12, allocated: 11, utilization: 92 },
  { role: 'مدير موقع', count: 22, allocated: 20, utilization: 91 },
  { role: 'مساح كميات', count: 18, allocated: 14, utilization: 78 },
  { role: 'مهندس جودة', count: 10, allocated: 8, utilization: 80 },
  { role: 'مهندس سلامة', count: 14, allocated: 12, utilization: 86 },
];

export default function Resources() {
  const totalResources = roles.reduce((s, r) => s + r.count, 0);
  const totalAllocated = roles.reduce((s, r) => s + r.allocated, 0);
  const avgUtilization = Math.round(roles.reduce((s, r) => s + r.utilization, 0) / roles.length);
  const sortedContractors = [...mockContractors].sort((a, b) => b.overallRating - a.overallRating);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إدارة الموارد</h1>
        <p className="text-muted-foreground">إدارة الكوادر البشرية والمقاولين وتحليل معدلات الاستخدام والأداء.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الموارد البشرية', value: totalResources, icon: Users, color: 'text-primary' },
          { label: 'موارد مُخصصة', value: totalAllocated, icon: Briefcase, color: 'text-emerald-500' },
          { label: 'متوسط الاستخدام', value: `${avgUtilization}%`, icon: TrendingUp, color: 'text-primary' },
          { label: 'موارد غير مُخصصة', value: totalResources - totalAllocated, icon: AlertCircle, color: 'text-amber-500' },
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
          <h3 className="font-semibold text-lg mb-5">معدل استخدام الموارد حسب التخصص</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roles} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                <YAxis dataKey="role" type="category" width={120} tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`${v}%`, 'الاستخدام']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', direction: 'rtl' }}
                />
                <Bar dataKey="utilization" radius={[4, 0, 0, 4]} barSize={16} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Star className="text-amber-500 fill-amber-500 w-5 h-5" />
            تقييم المقاولين والاستشاريين
          </h3>
          <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
            {sortedContractors.map(c => (
              <div key={c.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                  c.type === 'استشاري' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500')}>
                  {c.nameAr.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{c.nameAr}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.delayScore}%</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" />{c.qualityScore}%</span>
                    <span>{c.activeProjects} مشاريع</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="font-bold text-sm">{c.overallRating}</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
