import { mockContractors } from '@/data/contractors';
import { Star, Building2, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Contractors() {
  const sortedContractors = [...mockContractors].sort((a, b) => b.overallRating - a.overallRating);
  const best = sortedContractors.slice(0, 3);
  const worst = sortedContractors.slice(-3).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">المقاولين والاستشاريين</h1>
        <p className="text-muted-foreground">تقييم أداء الشركاء وقياس الجودة والالتزام بالجدول الزمني.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-emerald-500">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Star className="text-emerald-500 fill-emerald-500" />
            أفضل المقاولين أداءً
          </h3>
          <div className="space-y-4">
            {best.map(c => (
              <div key={c.id} className="flex justify-between items-center bg-card p-3 rounded-lg border border-border">
                <div>
                  <h4 className="font-semibold">{c.nameAr}</h4>
                  <span className="text-xs text-muted-foreground">{c.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-emerald-500">{c.overallRating}</span>
                  <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-destructive">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-destructive">
            <TrendingDown />
            مقاولين تحت المراقبة
          </h3>
          <div className="space-y-4">
            {worst.map(c => (
              <div key={c.id} className="flex justify-between items-center bg-card p-3 rounded-lg border border-border">
                <div>
                  <h4 className="font-semibold">{c.nameAr}</h4>
                  <span className="text-xs text-muted-foreground">{c.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-destructive">{c.overallRating}</span>
                  <Star className="w-4 h-4 text-destructive" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedContractors.map(c => (
          <div key={c.id} className="glass-panel p-5 rounded-xl hover-elevate transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex bg-background px-2 py-1 rounded-md text-sm font-bold border border-border">
                {c.overallRating} <Star className="w-4 h-4 text-amber-500 fill-amber-500 ml-1 inline" />
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-1 truncate">{c.nameAr}</h3>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-md mb-4 inline-block",
              c.type === 'استشاري' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
            )}>{c.type}</span>
            
            <div className="space-y-2 mt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> الالتزام بالوقت</span>
                <span className={c.delayScore > 85 ? "text-emerald-500" : "text-destructive"}>{c.delayScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> الجودة</span>
                <span className={c.qualityScore > 85 ? "text-emerald-500" : "text-destructive"}>{c.qualityScore}%</span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between mt-2">
                <span className="text-muted-foreground">مشاريع نشطة</span>
                <span className="font-mono">{c.activeProjects}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
