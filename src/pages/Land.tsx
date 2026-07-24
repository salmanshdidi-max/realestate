import { useState } from 'react';
import { Search, MapPin, Ruler, DollarSign, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';

// Prices in SAR — displayed as Million SAR
const mockLands = [
  { id: 'LND-001', location: 'الرياض - شمال الرياض', size: 12000, price: 22_000_000, value: 25_000_000, potential: 'عالي', status: 'متاح', type: 'تجاري' },
  { id: 'LND-002', location: 'جدة - الشاطئ', size: 8500, price: 18_000_000, value: 20_500_000, potential: 'عالي', status: 'قيد التفاوض', type: 'متعدد الاستخدام' },
  { id: 'LND-003', location: 'الدمام - الفيصلية', size: 15000, price: 10_500_000, value: 11_800_000, potential: 'متوسط', status: 'متاح', type: 'سكني' },
  { id: 'LND-004', location: 'مكة المكرمة - العزيزية', size: 5000, price: 28_000_000, value: 31_000_000, potential: 'حرج', status: 'مباع', type: 'ضيافة' },
  { id: 'LND-005', location: 'الرياض - الملقا', size: 9200, price: 19_500_000, value: 22_000_000, potential: 'عالي', status: 'متاح', type: 'تجاري' },
];

export default function Land() {
  const [searchTerm, setSearchTerm] = useState('');

  const totalValue = mockLands.reduce((s, l) => s + l.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">الأراضي والفرص الاستثمارية</h1>
          <p className="text-muted-foreground">متابعة الفرص المتاحة ومحفظة الأراضي الحالية.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الأراضي', value: '14', icon: MapPin },
          { label: 'إجمالي المساحة (م²)', value: '49,700', icon: Ruler },
          { label: 'القيمة التقديرية (م.ر)', value: `${(totalValue / 1_000_000).toFixed(0)} مليون`, icon: DollarSign },
          { label: 'فرص عالية القيمة', value: '5', icon: TrendingUp },
        ].map(kpi => (
          <div key={kpi.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <kpi.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <h4 className="font-bold text-xl">{kpi.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border bg-card/50">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث بالموقع..."
              className="pl-4 pr-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground bg-accent/50">
              <tr>
                <th className="px-6 py-4 font-medium">الرمز</th>
                <th className="px-6 py-4 font-medium">الموقع</th>
                <th className="px-6 py-4 font-medium">المساحة (م²)</th>
                <th className="px-6 py-4 font-medium">السعر المطلوب (مليون ر.س)</th>
                <th className="px-6 py-4 font-medium">التقييم المقترح (مليون ر.س)</th>
                <th className="px-6 py-4 font-medium">إمكانية التطوير</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLands
                .filter(l => l.location.includes(searchTerm))
                .map((land) => (
                <tr key={land.id} className="hover:bg-accent/30 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-muted-foreground">{land.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{land.location}</td>
                  <td className="px-6 py-4 font-mono">{land.size.toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono">{(land.price / 1_000_000).toFixed(1)}</td>
                  <td className="px-6 py-4 font-mono">{(land.value / 1_000_000).toFixed(1)}</td>
                  <td className="px-6 py-4"><StatusBadge status={land.potential} /></td>
                  <td className="px-6 py-4"><StatusBadge status={land.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
