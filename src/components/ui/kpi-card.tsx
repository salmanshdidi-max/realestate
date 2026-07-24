import { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  delay?: number;
}

export const KPICard: FC<KPICardProps> = ({ title, value, icon: Icon, trend, trendValue, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={cn(
        "bg-card border border-border rounded-xl p-5 hover-elevate transition-all duration-300 relative overflow-hidden group",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500 blur-2xl pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-muted-foreground font-medium text-sm">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-3xl font-bold font-mono tracking-tight text-foreground">{value}</div>
        
        {trendValue && (
          <div className={cn(
            "flex items-center gap-1 mt-2 text-xs font-medium",
            trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
          )}>
            <span>{trendValue}</span>
            <span className="text-muted-foreground ml-1">مقارنة بالشهر الماضي</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
