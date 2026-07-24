import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockProjects, Project } from '@/data/projects';
import { StatusBadge } from '@/components/ui/status-badge';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('الكل');

  const cities = ['الكل', ...new Set(mockProjects.map(p => p.city))];

  const filteredProjects = mockProjects.filter(p => {
    const matchesSearch = p.nameAr.includes(searchTerm) || p.id.includes(searchTerm);
    const matchesCity = selectedCity === 'الكل' || p.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">سجل المشاريع</h1>
          <p className="text-muted-foreground">إدارة ومتابعة كافة مشاريع المحفظة ({mockProjects.length} مشروع).</p>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
            إضافة مشروع جديد
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center justify-between bg-card/50">
          <div className="flex items-center gap-3 flex-1 min-w-[300px]">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="البحث باسم المشروع أو الرمز..." 
                className="pl-4 pr-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="h-10 px-3 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
            >
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-accent transition-colors">
              <Filter className="h-4 w-4" />
              تصفية متقدمة
            </button>
            <button className="p-2 border border-border rounded-md hover:bg-accent transition-colors">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground bg-accent/50 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4 font-medium">الرمز</th>
                <th className="px-6 py-4 font-medium">المشروع</th>
                <th className="px-6 py-4 font-medium">المدينة / الموقع</th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-foreground">
                  <div className="flex items-center gap-1">الميزانية <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-6 py-4 font-medium">الإنجاز</th>
                <th className="px-6 py-4 font-medium">الحالة</th>
                <th className="px-6 py-4 font-medium">المخاطر</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-accent/30 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-muted-foreground">{project.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.nameAr}</div>
                    <div className="text-xs text-muted-foreground mt-1">{project.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{project.city}</div>
                    <div className="text-xs text-muted-foreground mt-1">{project.location}</div>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    {(project.budget / 1000000).toLocaleString()} م
                  </td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500" 
                          style={{ width: `${project.completionPct}%` }}
                        />
                      </div>
                      <span className="text-xs w-8">{project.completionPct}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={project.riskLevel} />
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    لا توجد نتائج مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
