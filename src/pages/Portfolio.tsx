import { mockProjects, mockKPIs, totalPortfolioValue } from '@/data/projects';
import { mockKPIs as kpis } from '@/data/kpis';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { MapPin } from 'lucide-react';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function Portfolio() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">محفظة التطوير العقاري</h1>
        <p className="text-muted-foreground">التوزيع الاستراتيجي والجغرافي لمحفظة المشاريع.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Type Breakdown */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-4">توزيع المحفظة حسب النوع (القيمة)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={kpis.budgetBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {kpis.budgetBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => [`${value}%`, 'النسبة']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', direction: 'rtl' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {kpis.budgetBreakdown.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-bold mr-auto text-muted-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-4">التوزيع الجغرافي للمشاريع (بالمليون ريال)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kpis.regionalDistribution} layout="vertical" margin={{ right: 30, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--foreground))' }} width={80} />
                <RechartsTooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                  formatter={(value) => [`${value} مليون`, 'القيمة']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', direction: 'rtl' }}
                />
                <Bar dataKey="value" name="القيمة" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={24}>
                  {kpis.regionalDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${0.5 + (entry.value / 140) * 0.5})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* City summary blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.regionalDistribution.slice(0,4).map((region, idx) => (
          <div key={region.name} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold">{region.name}</h4>
              <p className="text-sm text-muted-foreground">{region.count} مشاريع • {region.value} مليون</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
