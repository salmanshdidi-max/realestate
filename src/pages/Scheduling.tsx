import { mockProjects } from '@/data/projects';
import { Calendar, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function Scheduling() {
  const delayedProjects = mockProjects.filter(p => p.delayDays > 0).sort((a, b) => b.delayDays - a.delayDays);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">الجدولة والتحكم</h1>
        <p className="text-muted-foreground">مراقبة الجداول الزمنية للمشاريع وتحديد مسارات التأخير الحرجة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Calendar className="text-primary" />
            أعلى المشاريع تأخيراً (بالأيام)
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delayedProjects.slice(0, 8)} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="nameAr" type="category" width={150} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                  formatter={(value) => [`${value} يوم تأخير`, 'التأخير']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', direction: 'rtl' }}
                />
                <Bar dataKey="delayDays" radius={[4, 0, 0, 4]} barSize={20}>
                  {delayedProjects.slice(0, 8).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.delayDays > 30 ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl flex flex-col">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-destructive">
            <AlertCircle />
            تأثير التأخير على التكلفة
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {delayedProjects.slice(0, 5).map(project => {
              const impactCost = (project.budget * 0.001 * project.delayDays); // Rough estimate
              return (
                <div key={project.id} className="p-4 bg-card border border-border rounded-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-2 h-full bg-destructive/80" />
                  <h4 className="font-medium mb-1 pl-3 truncate">{project.nameAr}</h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-destructive font-bold">{project.delayDays} يوم تأخير</span>
                    <span className="text-muted-foreground font-mono">{(impactCost / 1000000).toFixed(1)}M ريال</span>
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
