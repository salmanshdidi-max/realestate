import { Moon, Sun, Globe, Bell, Shield, Database } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إعدادات النظام</h1>
        <p className="text-muted-foreground">تخصيص واجهة المستخدم وتفضيلات النظام.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        {/* Appearance */}
        <div className="p-6 border-b border-border">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-primary" /> 
            المظهر والعرض
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-card p-4 rounded-lg border border-border">
              <div>
                <p className="font-medium">الوضع الليلي (Dark Mode)</p>
                <p className="text-sm text-muted-foreground">تفعيل الوضع الليلي الافتراضي للنظام</p>
              </div>
              <Switch defaultChecked onCheckedChange={toggleTheme} />
            </div>
            <div className="flex items-center justify-between bg-card p-4 rounded-lg border border-border">
              <div>
                <p className="font-medium">كثافة البيانات (Data Density)</p>
                <p className="text-sm text-muted-foreground">عرض البيانات بشكل مكثف في الجداول</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="p-6 border-b border-border">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> 
            اللغة والمنطقة
          </h3>
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <button className="border-2 border-primary bg-primary/10 text-primary p-3 rounded-lg font-bold">العربية</button>
              <button className="border border-border text-muted-foreground p-3 rounded-lg hover:bg-accent transition-colors">English (قريباً)</button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 border-b border-border">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" /> 
            التنبيهات
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>يتم تكوين التنبيهات من قبل مسؤول النظام.</p>
          </div>
        </div>

        {/* System Info */}
        <div className="p-6 bg-card/30">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-muted-foreground" /> 
            معلومات النظام
          </h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm max-w-sm">
            <div className="text-muted-foreground">إصدار المنصة:</div>
            <div className="font-mono text-left" dir="ltr">v2.4.0-enterprise</div>
            <div className="text-muted-foreground">تاريخ آخر تحديث للبيانات:</div>
            <div className="font-mono text-left" dir="ltr">Today, 07:00 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
