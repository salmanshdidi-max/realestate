import { FC } from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status, className }) => {
  let colorClass = 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  
  if (status === 'مكتمل' || status === 'منخفض' || status === 'معتمد' || status === 'مغلق') {
    colorClass = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
  } else if (status === 'تحت الإنشاء' || status === 'متوسط' || status === 'قيد المعالجة' || status === 'قيد الانتظار') {
    colorClass = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  } else if (status === 'قيد التصميم' || status === 'عالي') {
    colorClass = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
  } else if (status === 'متوقف' || status === 'حرج' || status === 'مرفوض') {
    colorClass = 'bg-destructive/10 text-destructive border-destructive/20';
  }

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      colorClass,
      className
    )}>
      {status}
    </span>
  );
};
