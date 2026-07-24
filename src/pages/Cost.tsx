import { KPICard } from '@/components/ui/kpi-card';
import { CircleDollarSign, TrendingDown, ArrowDownToLine, Receipt } from 'lucide-react';
import { mockProjects, totalPortfolioValue, totalSpent } from '@/data/projects';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

// Monthly burn rate in Million SAR
const burnRateData = [
  { month: 'يناير', budget: 18, actual: 16 },
  { month: 'فبراير', budget: 20, actual: 19 },
  { month: 'مارس', budget: 22, actual: 25 },
  { month: 'أبريل', budget: 24, actual: 27 },
  { month: 'مايو', budget: 26, actual: 29 },
  { month: 'يونيو', budget: 28, actual: 32 },
];

export default function Cost() {
  const overBudgetProjects = mockProjects.filter(p => p.spent > p.budget * (p.completionPct / 100 + 0.05));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">التكلفة والاستثمار</h1>
        <p className="text-muted-foreground">التحكم في الميزانيات، المصروفات، والانحرافات المالية للمشاريع.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="الميزانية المعتمدة" value={`${(totalPortfolioValue / 1_000_000).toFixed(0)} م.ر`} icon={CircleDollarSign} />
        <KPICard title="إجمالي المنصرف" value={`${(totalSpent / 1_000_000).toFixed(0)} م.ر`} icon={Receipt} />
        <KPICard title="معدل الحرق الشهري" value="32 م.ر" icon={TrendingDown} trend="up" trendValue="+8%" className="border-amber-500/30" />
        <KPICard title="التدفق النقدي المتبقي" value={`${((totalPortfolioValue - totalSpent) / 1_000_000).toFixed(0)} م.ر`} icon={ArrowDownToLine} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-6">معدل الصرف الشهري (Burn Rate) بالمليون ريال</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burnRateData}>
                <defs>
                  <linearGradient id="colorActualCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} unit=" م" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  formatter={(value) => [`${value} مليون ريال`, '']}
                />
                <Area type="monotone" dataKey="budget" name="المخطط" stroke="hsl(var(--muted-foreground))" fill="transparent" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="actual" name="المنصرف" stroke="hsl(var(--destructive))" strokeWidth={2} fillOpacity={1} fill="url(#colorActualCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl overflow-hidden flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-destructive">تنبيهات تجاوز الميزانية</h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {overBudgetProjects.slice(0, 6).map(p => {
              const expectedCost = p.budget * (p.completionPct / 100);
              const variance = p.spent - expectedCost;
              return (
                <div key={p.id} className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <h4 className="font-bold text-sm mb-1">{p.nameAr}</h4>
                  <div className="flex justify-between text-xs mb-2 text-muted-foreground">
                    <span>المنصرف: {(p.spent / 1_000_000).toFixed(1)} م.ر</span>
                    <span>المتوقع: {(expectedCost / 1_000_000).toFixed(1)} م.ر</span>
                  </div>
                  <div className="text-destructive font-mono text-sm font-bold bg-destructive/10 px-2 py-1 rounded inline-block">
                    +{(variance / 1_000_000).toFixed(1)} م.ر تجاوز
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
