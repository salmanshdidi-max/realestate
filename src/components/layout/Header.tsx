import { FC } from 'react';
import { Menu, Search, Bell, Sun, Moon, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 bg-card border-b border-border px-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-muted-foreground hover:bg-accent rounded-md transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative hidden md:block w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="البحث في النظام (مشاريع، مخاطر، موارد، عقود)..." 
            className="pl-4 pr-10 bg-background/50 border-border/50 focus:bg-background focus-visible:ring-primary/50 transition-all rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors relative">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute left-2 top-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
        
        <button className="p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-card"></span>
        </button>
        
        <div className="h-8 w-px bg-border mx-1"></div>
        
        <div className="flex items-center gap-3 pr-2 cursor-pointer hover:bg-accent p-1.5 rounded-md transition-colors">
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium leading-none">Salmanshdidi</p>
            <p className="text-xs text-muted-foreground mt-1">Project Management & PMO Specialist</p>
          </div>
          <div className="h-9 w-9 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
            <User className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};
