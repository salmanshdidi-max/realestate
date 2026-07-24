export interface Risk {
  id: string;
  projectId: string;
  titleAr: string;
  category: 'مالي' | 'تشغيلي' | 'قانوني' | 'فني' | 'بيئي';
  severity: 'منخفض' | 'متوسط' | 'عالي' | 'حرج';
  probability: number; // 1 to 5
  impact: number; // 1 to 5
  mitigationAr: string;
  status: 'مفتوح' | 'قيد المعالجة' | 'مغلق';
  owner: string;
}

export const mockRisks: Risk[] = [
  {
    id: 'RSK-001',
    projectId: 'PRJ-005',
    titleAr: 'تأخير في توريد مواد البناء الأساسية',
    category: 'تشغيلي',
    severity: 'حرج',
    probability: 4,
    impact: 5,
    mitigationAr: 'التعاقد مع موردين محليين بديلين وزيادة المخزون الاستراتيجي',
    status: 'مفتوح',
    owner: 'إدارة سلاسل الإمداد',
  },
  {
    id: 'RSK-002',
    projectId: 'PRJ-001',
    titleAr: 'تجاوز الميزانية المخصصة لأعمال الواجهات',
    category: 'مالي',
    severity: 'عالي',
    probability: 3,
    impact: 4,
    mitigationAr: 'مراجعة التصاميم (Value Engineering) لتقليل التكلفة',
    status: 'قيد المعالجة',
    owner: 'الإدارة المالية',
  },
  {
    id: 'RSK-003',
    projectId: 'PRJ-003',
    titleAr: 'صعوبات في استخراج التصاريح النهائية',
    category: 'قانوني',
    severity: 'متوسط',
    probability: 3,
    impact: 3,
    mitigationAr: 'تشكيل فريق عمل مشترك مع الجهات الحكومية لتسريع الإجراءات',
    status: 'مفتوح',
    owner: 'إدارة العلاقات الحكومية',
  },
  {
    id: 'RSK-004',
    projectId: 'PRJ-002',
    titleAr: 'نقص العمالة الماهرة لأعمال التشطيبات الدقيقة',
    category: 'تشغيلي',
    severity: 'عالي',
    probability: 4,
    impact: 4,
    mitigationAr: 'استقطاب عمالة من مقاولين من الباطن إضافيين',
    status: 'قيد المعالجة',
    owner: 'إدارة المشاريع',
  },
  {
    id: 'RSK-005',
    projectId: 'PRJ-004',
    titleAr: 'تغييرات جوهرية في الكود العمراني للمنطقة',
    category: 'فني',
    severity: 'متوسط',
    probability: 2,
    impact: 4,
    mitigationAr: 'تحديث المخططات الأولية للتوافق مع التعديلات المتوقعة',
    status: 'مغلق',
    owner: 'الإدارة الهندسية',
  }
];

// Generate more random risks
const categories = ['مالي', 'تشغيلي', 'قانوني', 'فني', 'بيئي'] as const;
const severities = ['منخفض', 'متوسط', 'عالي', 'حرج'] as const;
const statuses = ['مفتوح', 'قيد المعالجة', 'مغلق'] as const;

for (let i = 6; i <= 30; i++) {
  const prob = Math.floor(Math.random() * 5) + 1;
  const imp = Math.floor(Math.random() * 5) + 1;
  const score = prob * imp;
  let severity: Risk['severity'] = 'منخفض';
  if (score > 15) severity = 'حرج';
  else if (score > 9) severity = 'عالي';
  else if (score > 4) severity = 'متوسط';

  mockRisks.push({
    id: `RSK-${i.toString().padStart(3, '0')}`,
    projectId: `PRJ-${(Math.floor(Math.random() * 10) + 1).toString().padStart(3, '0')}`,
    titleAr: `خطر محتمل رقم ${i} في التنفيذ`,
    category: categories[Math.floor(Math.random() * categories.length)],
    severity,
    probability: prob,
    impact: imp,
    mitigationAr: 'خطة تخفيف المخاطر المعتمدة',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    owner: 'فريق المخاطر',
  });
}
