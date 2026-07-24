import { Package, Clock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

const procurementItems = [
  { id: 'PO-001', item: 'حديد تسليح درجة 60', project: 'برج الأعمال المركزي', supplier: 'مصنع الحديد الوطني', qty: '850 طن', value: 4.25, status: 'تم التسليم', orderDate: '2026-02-01', deliveryDate: '2026-03-15', category: 'مواد بناء' },
  { id: 'PO-002', item: 'خرسانة جاهزة C40', project: 'مشروع الواجهة البحرية', supplier: 'شركة الخرسانة السعودية', qty: '1200 م³', value: 1.92, status: 'قيد التوريد', orderDate: '2026-04-10', deliveryDate: '2026-05-20', category: 'مواد بناء' },
  { id: 'PO-003', item: 'واجهات زجاجية مزدوجة', project: 'برج الأعمال المركزي', supplier: 'مورد الزجاج الأول', qty: '3200 م²', value: 6.40, status: 'متأخر', orderDate: '2026-01-15', deliveryDate: '2026-03-01', category: 'تشطيبات' },
  { id: 'PO-004', item: 'مصاعد كهربائية', project: 'مول الرياض الجديد', supplier: 'شركة المصاعد العالمية', qty: '8 وحدات', value: 3.20, status: 'طلب معتمد', orderDate: '2026-05-01', deliveryDate: '2026-08-30', category: 'ميكانيكا' },
  { id: 'PO-005', item: 'أنظمة تكييف مركزية', project: 'مجمع النخيل السكني', supplier: 'شركة برودة للتكييف', qty: '45 وحدة', value: 5.85, status: 'قيد التوريد', orderDate: '2026-03-20', deliveryDate: '2026-06-15', category: 'ميكانيكا' },
  { id: 'PO-006', item: 'لوحات كهربائية ذكية', project: 'المدينة المتكاملة', supplier: 'شركة الطاقة المتقدمة', qty: '120 لوحة', value: 2.40, status: 'تم التسليم', orderDate: '2025-12-01', deliveryDate: '2026-02-28', category: 'كهرباء' },
  { id: 'PO-007', item: 'بلاط رخام إيطالي', project: 'مشروع الواجهة البحرية', supplier: 'وكالة الرخام الدولية', qty: '8000 م²', value: 7.20, status: 'طلب معتمد', orderDate: '2026-06-01', deliveryDate: '2026-09-15', category: 'تشطيبات' },
];

const statusColor: Record<string, string> = {
  'تم التسليم': 'bg-emerald-500/10 text-emerald-500',
  'قيد التوريد': 'bg-primary/10 text-primary',
  'متأخر': 'bg-destructive/10 text-destructive',
  'طلب معتمد': 'bg-amber-500/10 text-amber-500',
};

const categoryColor: Record<string, string> = {
  'مواد بناء': 'bg-orange-500/10 text-orange-500',
  'تشطيبات': 'bg-purple-500/10 text-purple-500',
  'ميكانيكا': 'bg-blue-500/10 text-blue-500',
  'كهرباء': 'bg-amber-500/10 text-amber-500',
};

export default function Procurement() {
  const totalValue = procurementItems.reduce((s, p) => s + p.value, 0);
  const delivered = procurementItems.filter(p => p.status === 'تم التسليم').length;
  const delayed = procurementItems.filter(p => p.status === 'متأخر').length;
  const inTransit = procurementItems.filter(p => p.status === 'قيد التوريد').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">المشتريات والخدمات اللوجستية</h1>
        <p className="text-muted-foreground">متابعة أوامر الشراء والتوريد وسلسلة الإمداد لجميع المشاريع.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي أوامر الشراء', value: procurementItems.length, icon: Package, color: 'text-primary' },
          { label: 'القيمة الإجمالية (M ريال)', value: `${totalValue.toFixed(1)}M`, icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'تم التسليم', value: delivered, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'تأخير في التوريد', value: delayed, icon: AlertCircle, color: 'text-destructive' },
        ].map((k, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl">
            <div className={`mb-2 ${k.color}`}><k.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold font-mono">{k.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center">
          <h3 className="font-semibold text-lg">أوامر الشراء والتوريد</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" />{inTransit} قيد التوريد</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive inline-block" />{delayed} متأخر</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {['الرمز', 'الصنف', 'المشروع', 'المورد', 'الفئة', 'الكمية', 'القيمة (M)', 'تاريخ التسليم', 'الحالة'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {procurementItems.map(p => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-4 py-3 font-medium max-w-[150px] truncate">{p.item}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[120px] truncate">{p.project}</td>
                  <td className="px-4 py-3 text-xs max-w-[140px] truncate">{p.supplier}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColor[p.category] ?? 'bg-muted text-muted-foreground'}`}>{p.category}</span></td>
                  <td className="px-4 py-3 text-xs font-mono">{p.qty}</td>
                  <td className="px-4 py-3 font-mono">{p.value.toFixed(2)}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.deliveryDate}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor[p.status]}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
