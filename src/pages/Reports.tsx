import { FileText, Download, Printer } from 'lucide-react';

const reports = [
  { id: 1, title: 'Project Performance Report', date: 'يوليو 2026', type: 'شهري', color: 'primary' },
  { id: 2, title: 'Monthly Project Report', date: 'يوليو 2026', type: 'شهري', color: 'emerald-500' },
  { id: 3, title: 'PMO Report', date: 'الربع الثاني 2026', type: 'ربعي', color: 'amber-500' },
  { id: 4, title: 'Risk Report', date: 'الأسبوع الثالث يوليو 2026', type: 'أسبوعي', color: 'destructive' },
  { id: 5, title: 'Schedule Report', date: 'يوليو 2026', type: 'أسبوعي', color: 'primary' },
  { id: 6, title: 'Cost Report', date: 'الربع الثاني 2026', type: 'ربعي', color: 'emerald-500' },
  { id: 7, title: 'Project Status Report', date: 'يوليو 2026', type: 'شهري', color: 'amber-500' },
];

export default function Reports() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">التقارير</h1>
        <p className="text-muted-foreground">تقارير إدارة المشاريع والـ PMO جاهزة للطباعة والتصدير.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="glass-panel p-6 rounded-xl flex flex-col justify-between h-48 group hover-elevate transition-all border-r-4" style={{ borderRightColor: `hsl(var(--${report.color}) / 0.5)` }}>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg bg-${report.color}/10 text-${report.color}`}>
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{report.type}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight mt-3 group-hover:text-primary transition-colors">{report.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">تاريخ الإصدار: {report.date}</p>
            </div>
            
            <div className="flex gap-2 mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90"
              >
                <Printer className="w-4 h-4" /> طباعة
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2 rounded-md text-sm font-medium hover:bg-secondary/80">
                <Download className="w-4 h-4" /> PDF تحميل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
