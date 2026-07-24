import { FC } from 'react';
import { KPICard } from '@/components/ui/kpi-card';
import { mockKPIs, mockProjects } from '@/data/projects'; // Note: update imports
import { totalPortfolioValue, overallCompletion, mockProjects as projs } from '@/data/projects';
import { mockKPIs as kpis } from '@/data/kpis';
import { Building2, CircleDollarSign, Percent, AlertOctagon, CheckCircle2, Briefcase, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';
import { StatusBadge } from '@/components/ui/status-badge';

// Format currency in Million SAR
const formatCurrency = (value: number) => {
  return `${(value / 1_000_000).toFixed(0)} م.ر`;
};

export default function Dashboard() {
  const criticalProjectsCount = projs.filter(p => p.riskLevel === 'حرج' || p.riskLevel === 'عالي').length;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Project Management Dashboard</h1>
        <p className="text-muted-foreground">Project Management Workspace — نظرة عامة على أداء المشاريع والمؤشرات والجدول والتكلفة.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="إجمالي قيمة المحفظة" 
          value={formatCurrency(totalPortfolioValue)} 
          icon={CircleDollarSign} 
          trend="up" 
          trendValue="+5.2%"
          delay={0.1}
        />
        <KPICard 
          title="نسبة الإنجاز الكلية" 
          value={`${overallCompletion}%`} 
          icon={Percent} 
          trend="up" 
          trendValue="+2.1%"
          delay={0.2}
        />
        <KPICard 
          title="مؤشر صحة المحفظة" 
          value={`${kpis.portfolioHealth}%`} 
          icon={Activity} 
          trend="up"
          trendValue="+1.5%"
          className="border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
          delay={0.3}
        />
        <KPICard 
          title="المشاريع الحرجة" 
          value={criticalProjectsCount} 
          icon={AlertOctagon} 
          trend="down"
          trendValue="-2"
          className="border-destructive/30"
          delay={0.4}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">الأداء المالي والمنصرف</h3>
            <select className="bg-background border border-border rounded-md text-sm p-1">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpis.monthlyPerformance}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="planned" name="المخطط" stroke="hsl(var(--muted-foreground))" fillOpacity={1} fill="url(#colorPlanned)" />
                <Area type="monotone" dataKey="actual" name="الفعلي" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl flex flex-col">
          <h3 className="font-semibold text-lg mb-4">المشاريع التي تتطلب تدخلاً</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {projs.filter(p => p.riskLevel === 'حرج' || p.riskLevel === 'عالي').slice(0, 5).map(project => (
              <div key={project.id} className="p-3 border border-border/50 rounded-lg bg-background/30 hover:bg-background/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm truncate max-w-[70%]">{project.nameAr}</h4>
                  <StatusBadge status={project.riskLevel} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>نسبة الإنجاز: {project.completionPct}%</span>
                  <span>تأخير: {project.delayDays} يوم</span>
                </div>
                <div className="w-full bg-secondary h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-destructive" 
                    style={{ width: `${project.completionPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
