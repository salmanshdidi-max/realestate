export interface Project {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  city: string;
  type: 'سكني' | 'تجاري' | 'متعدد الاستخدام' | 'بنية تحتية' | 'ضيافة';
  status: 'قيد التخطيط' | 'قيد التصميم' | 'تحت الإنشاء' | 'مكتمل' | 'متوقف';
  budget: number;
  spent: number;
  completionPct: number;
  healthScore: number;
  riskLevel: 'منخفض' | 'متوسط' | 'عالي' | 'حرج';
  startDate: string;
  endDate: string;
  contractorId: string;
  projectManagerAr: string;
  phase: string;
  delayDays: number;
  criticalIssues: number;
}

const cities = ['الرياض', 'جدة', 'الدمام', 'نيوم', 'مكة المكرمة', 'المدينة المنورة', 'الخبر'];
const types = ['سكني', 'تجاري', 'متعدد الاستخدام', 'بنية تحتية', 'ضيافة'] as const;
const statuses = ['قيد التخطيط', 'قيد التصميم', 'تحت الإنشاء', 'مكتمل', 'متوقف'] as const;
const risks = ['منخفض', 'متوسط', 'عالي', 'حرج'] as const;

export const mockProjects: Project[] = [
  {
    // Under budget — 52% complete, spending tracking well
    id: 'PRJ-001',
    name: 'Jeddah Waterfront',
    nameAr: 'مشروع الواجهة البحرية',
    location: 'الشاطئ',
    city: 'جدة',
    type: 'سكني',
    status: 'تحت الإنشاء',
    budget: 75_000_000,
    spent: 37_500_000, // 50% spent at 52% completion → slightly under budget
    completionPct: 52,
    healthScore: 85,
    riskLevel: 'متوسط',
    startDate: '2023-01-15',
    endDate: '2026-12-30',
    contractorId: 'CONT-001',
    projectManagerAr: 'أحمد السالم',
    phase: 'الأعمال الإنشائية',
    delayDays: 15,
    criticalIssues: 2,
  },
  {
    // Over budget — 75% complete but spent more than expected
    id: 'PRJ-002',
    name: 'Central Business Tower',
    nameAr: 'برج الأعمال المركزي',
    location: 'المركز المالي',
    city: 'الرياض',
    type: 'تجاري',
    status: 'تحت الإنشاء',
    budget: 60_000_000,
    spent: 49_800_000, // 83% spent at 75% completion → over budget
    completionPct: 75,
    healthScore: 72,
    riskLevel: 'عالي',
    startDate: '2022-03-01',
    endDate: '2025-06-30',
    contractorId: 'CONT-002',
    projectManagerAr: 'خالد الدوسري',
    phase: 'التشطيبات',
    delayDays: 0,
    criticalIssues: 1,
  },
  {
    // Over budget — nearly complete but cost overrun
    id: 'PRJ-003',
    name: 'Al Nakheel Residential',
    nameAr: 'مجمع النخيل السكني',
    location: 'الظهران',
    city: 'الدمام',
    type: 'سكني',
    status: 'تحت الإنشاء',
    budget: 35_000_000,
    spent: 33_600_000, // 96% spent at 88% completion → over budget
    completionPct: 88,
    healthScore: 68,
    riskLevel: 'عالي',
    startDate: '2021-11-01',
    endDate: '2024-09-30',
    contractorId: 'CONT-003',
    projectManagerAr: 'سعد القحطاني',
    phase: 'الاختبار والتشغيل',
    delayDays: 45,
    criticalIssues: 3,
  },
  {
    // Under budget — design phase, early spending
    id: 'PRJ-004',
    name: 'New Riyadh Mall',
    nameAr: 'مول الرياض الجديد',
    location: 'شمال الرياض',
    city: 'الرياض',
    type: 'تجاري',
    status: 'قيد التصميم',
    budget: 80_000_000,
    spent: 9_600_000, // 12% spent at 15% completion → on budget
    completionPct: 15,
    healthScore: 95,
    riskLevel: 'منخفض',
    startDate: '2024-02-01',
    endDate: '2027-12-30',
    contractorId: 'CONT-004',
    projectManagerAr: 'فهد المطيري',
    phase: 'التصميم التفصيلي',
    delayDays: 0,
    criticalIssues: 0,
  },
  {
    // Critically over budget — troubled project
    id: 'PRJ-005',
    name: 'Integrated City',
    nameAr: 'مشروع المدينة المتكاملة',
    location: 'المنطقة الحرة',
    city: 'نيوم',
    type: 'متعدد الاستخدام',
    status: 'تحت الإنشاء',
    budget: 45_000_000,
    spent: 20_250_000, // 45% spent at only 35% completion → significantly over
    completionPct: 35,
    healthScore: 55,
    riskLevel: 'حرج',
    startDate: '2023-06-01',
    endDate: '2029-12-30',
    contractorId: 'CONT-005',
    projectManagerAr: 'ياسر الشمري',
    phase: 'البنية التحتية',
    delayDays: 120,
    criticalIssues: 7,
  },
  // Generated projects — smaller scale supporting portfolio
  ...Array.from({ length: 37 }).map((_, i) => {
    const id = i + 6;
    const type = types[id % types.length];
    const status = statuses[id % statuses.length];
    const city = cities[id % cities.length];
    // Small supporting projects: 3M–12M range
    const budget = (id % 10) * 900_000 + 3_000_000;
    const completionPct = status === 'مكتمل' ? 100 : status === 'قيد التخطيط' ? 0 : status === 'قيد التصميم' ? (id % 4) * 5 : (id % 7) * 10 + 20;
    const overUnder = [0.92, 0.97, 1.00, 1.04, 1.09][id % 5]; // mix of under/on/over
    const spent = Math.round(budget * (completionPct / 100) * overUnder);

    return {
      id: `PRJ-${id.toString().padStart(3, '0')}`,
      name: `Project ${id}`,
      nameAr: `مشروع التطوير ${id} - ${city}`,
      location: `حي ${id}`,
      city,
      type,
      status,
      budget,
      spent,
      completionPct,
      healthScore: 60 + (id % 4) * 10,
      riskLevel: risks[id % risks.length],
      startDate: `202${(id % 4)}-01-01`,
      endDate: `202${(id % 4) + 5}-12-31`,
      contractorId: `CONT-${((id % 25) + 1).toString().padStart(3, '0')}`,
      projectManagerAr: 'مهندس المشروع',
      phase: status === 'مكتمل' ? 'مكتمل' : 'تحت التنفيذ',
      delayDays: (id % 5) * 8,
      criticalIssues: id % 4,
    };
  })
];

export const totalPortfolioValue = mockProjects.reduce((acc, p) => acc + p.budget, 0);
export const totalSpent = mockProjects.reduce((acc, p) => acc + p.spent, 0);
export const overallCompletion = Math.round(
  mockProjects.reduce((acc, p) => acc + p.completionPct, 0) / mockProjects.length
);
// Re-export mockKPIs alias for pages that import it from here
export { mockKPIs } from './kpis';
