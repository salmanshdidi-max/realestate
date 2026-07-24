import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const designPhases = ['المفهوم', 'التصميم الأولي', 'التصميم التفصيلي', 'المراجعة', 'الاعتماد النهائي'];

const mockDesignProjects = [
  { name: 'مول الرياض الجديد', currentPhase: 2, status: 'متأخر' },
  { name: 'برج الأعمال المركزي', currentPhase: 4, status: 'متقدم' },
  { name: 'مشروع الواجهة البحرية', currentPhase: 5, status: 'مكتمل' },
  { name: 'المدينة المتكاملة نيوم', currentPhase: 1, status: 'قيد التنفيذ' },
  { name: 'مجمع النخيل السكني', currentPhase: 3, status: 'قيد التنفيذ' },
];

export default function Design() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">التصميم والاعتمادات</h1>
        <p className="text-muted-foreground">تتبع مراحل التصميم الهندسي للمشاريع قيد التخطيط.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden p-6 space-y-8">
        {mockDesignProjects.map((proj, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{proj.name}</h3>
              <span className={cn(
                "text-xs px-2 py-1 rounded-md",
                proj.status === 'متأخر' ? 'bg-destructive/10 text-destructive' :
                proj.status === 'مكتمل' ? 'bg-emerald-500/10 text-emerald-500' :
                'bg-primary/10 text-primary'
              )}>
                {proj.status}
              </span>
            </div>
            
            <div className="relative flex items-center justify-between">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", proj.status === 'متأخر' ? 'bg-destructive' : 'bg-primary')} 
                  style={{ width: `${(proj.currentPhase / 5) * 100}%` }} 
                />
              </div>
              
              {designPhases.map((phase, i) => {
                const phaseNum = i + 1;
                const isCompleted = phaseNum <= proj.currentPhase;
                const isCurrent = phaseNum === proj.currentPhase + 1;
                
                return (
                  <div key={phase} className="flex flex-col items-center gap-2 bg-card p-2 rounded-xl">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                      isCompleted ? "bg-primary border-primary text-primary-foreground" :
                      isCurrent ? "bg-background border-primary text-primary" :
                      "bg-background border-border text-muted-foreground"
                    )}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                       isCurrent ? <Clock className="w-4 h-4 animate-pulse" /> :
                       <Circle className="w-4 h-4" />}
                    </div>
                    <span className={cn(
                      "text-xs font-medium text-center w-20",
                      isCompleted ? "text-foreground" :
                      isCurrent ? "text-primary" :
                      "text-muted-foreground"
                    )}>{phase}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
