export interface Contractor {
  id: string;
  nameAr: string;
  type: 'مقاول' | 'استشاري';
  performanceScore: number;
  delayScore: number;
  qualityScore: number;
  overallRating: number;
  activeProjects: number;
  completedProjects: number;
}

const companyNames = [
  'شركة بن لادن السعودية',
  'سعودي أوجيه',
  'شركة السيف الهندسية للمقاولات',
  'شركة المباني',
  'دار الهندسة',
  'خطيب وعلمي',
  'شركة العراب للمقاولات',
  'شركة نسما للمقاولات',
  'مجموعة شبه الجزيرة',
  'الراشد للتجارة والمقاولات',
  'زهير فايز ومشاركوه',
  'الشركة العقارية السعودية',
  'البواني',
  'شركة الفهد للتجارة والمقاولات',
  'بارسونز',
  'أروب',
  'شركة العيوني',
  'شركة روابي القابضة',
  'دريك آند سكل',
  'شركة الحربي للتجارة والمقاولات',
  'الشركة السعودية للمباني',
  'اليمامة للأعمال',
  'الزامل للحديد',
  'بكتل',
  'أتكينز',
];

export const mockContractors: Contractor[] = companyNames.map((name, i) => {
  const isConsultant = i % 4 === 0 || name.includes('هندس') || name.includes('علمي') || name.includes('فايز') || name.includes('بارسونز');
  
  const perf = Math.floor(Math.random() * 30) + 70;
  const delay = Math.floor(Math.random() * 30) + 70;
  const qual = Math.floor(Math.random() * 20) + 80;
  
  return {
    id: `CONT-${(i + 1).toString().padStart(3, '0')}`,
    nameAr: name,
    type: isConsultant ? 'استشاري' : 'مقاول',
    performanceScore: perf,
    delayScore: delay,
    qualityScore: qual,
    overallRating: Number(((perf + delay + qual) / 3 / 20).toFixed(1)), // out of 5
    activeProjects: Math.floor(Math.random() * 5) + 1,
    completedProjects: Math.floor(Math.random() * 15),
  };
});
