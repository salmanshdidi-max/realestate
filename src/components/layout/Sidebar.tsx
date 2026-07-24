import { FC } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Briefcase,
  Layers,
  Building2, 
  CalendarClock, 
  CircleDollarSign, 
  ShieldAlert, 
  AlertCircle,
  GitBranch,
  UserCog,
  ClipboardList,
  ShieldCheck, 
  HardHat,
  Package,
  Landmark, 
  FileText,
  BrainCircuit,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navGroups = [
  {
    title: 'الرئيسية',
    items: [
      { name: 'لوحة إدارة المشاريع', path: '/', icon: LayoutDashboard },
      { name: 'إدارة المحافظ', path: '/portfolio', icon: Briefcase },
      { name: 'إدارة البرامج', path: '/programs', icon: Layers },
    ]
  },
  {
    title: 'المشاريع',
    items: [
      { name: 'المشاريع', path: '/projects', icon: Building2 },
    ]
  },
  {
    title: 'التخطيط والتحكم',
    items: [
      { name: 'التخطيط والجدولة', path: '/scheduling', icon: CalendarClock },
      { name: 'التحكم بالتكلفة', path: '/cost', icon: CircleDollarSign },
    ]
  },
  {
    title: 'المخاطر والمشكلات',
    items: [
      { name: 'إدارة المخاطر', path: '/risks', icon: ShieldAlert },
      { name: 'إدارة المشكلات', path: '/issues', icon: AlertCircle },
      { name: 'إدارة التغيير', path: '/change-management', icon: GitBranch },
    ]
  },
  {
    title: 'الموارد والعقود',
    items: [
      { name: 'إدارة الموارد', path: '/resources', icon: UserCog },
      { name: 'إدارة العقود', path: '/contracts', icon: ClipboardList },
    ]
  },
  {
    title: 'الجودة والسلامة',
    items: [
      { name: 'إدارة الجودة', path: '/quality', icon: ShieldCheck },
      { name: 'السلامة والصحة HSE', path: '/hse', icon: HardHat },
    ]
  },
  {
    title: 'المشتريات',
    items: [
      { name: 'المشتريات والخدمات', path: '/procurement', icon: Package },
    ]
  },
  {
    title: 'الحوكمة والتقارير',
    items: [
      { name: 'الحوكمة PMO', path: '/governance', icon: Landmark },
      { name: 'التقارير', path: '/reports', icon: FileText },
    ]
  },
  {
    title: 'الذكاء الاصطناعي',
    items: [
      { name: 'AI Project Assistant', path: '/ai-center', icon: BrainCircuit, highlight: true },
    ]
  },
  {
    title: 'النظام',
    items: [
      { name: 'الإعدادات', path: '/settings', icon: Settings },
    ]
  }
];

export const Sidebar: FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [location] = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-l border-sidebar-border transition-all duration-300 flex flex-col relative z-20",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
            <Building2 className="text-primary-foreground h-5 w-5" />
          </div>
          <div className={cn("overflow-hidden transition-opacity", !isOpen && "opacity-0")}>
            <span className="font-bold text-sm whitespace-nowrap block leading-tight">
              منصة <span className="text-primary">إدارة المشاريع</span>
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap block">& الحوكمة</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            {isOpen && (
              <h3 className="px-5 text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider mb-1.5">
                {group.title}
              </h3>
            )}
            <ul className="space-y-0.5 px-2">
              {group.items.map((item) => {
                const isActive = location === item.path;
                return (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <div className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors group relative",
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        item.highlight && !isActive && "text-primary/80 hover:text-primary hover:bg-primary/5"
                      )}>
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-l-full" />
                        )}
                        <item.icon className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground"
                        )} />
                        {isOpen && (
                          <span className="truncate text-sm">{item.name}</span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};
