import { AlertCircle, Clock, CheckCircle2, User } from 'lucide-react';

const issues = [
  { id: 'ISS-001', title: 'تأخر التسليم من مورد الحديد', project: 'برج الأعمال المركزي', priority: 'حرج', status: 'مفتوح', owner: 'م. خالد', age: 12, impact: 'التأثير على الجدول الزمني بمقدار 3 أسابيع' },
  { id: 'ISS-002', title: 'نزاع تعاقدي مع المقاول الرئيسي', project: 'مشروع الواجهة البحرية', priority: 'عالي', status: 'قيد المعالجة', owner: 'م. سارة', age: 25, impact: 'توقف مرحلة الهيكل الإنشائي' },
  { id: 'ISS-003', title: 'اعتراض على مخططات التصميم', project: 'مجمع النخيل السكني', priority: 'متوسط', status: 'قيد المعالجة', owner: 'م. فيصل', age: 7, impact: 'إعادة رسم 15% من المخططات' },
  { id: 'ISS-004', title: 'نقص في عمالة متخصصة', project: 'المدينة المتكاملة', priority: 'عالي', status: 'مفتوح', owner: 'م. نورة', age: 18, impact: 'تأخير أعمال التشطيبات' },
  { id: 'ISS-005', title: 'تلف في مواد البناء نتيجة الأمطار', project: 'مول الرياض الجديد', priority: 'متوسط', status: 'مغلق', owner: 'م. عبدالله', age: 45, impact: 'خسارة مادية 2.1M ريال' },
  { id: 'ISS-006', title: 'خلاف مع الجهة الحكومية على الارتدادات', project: 'برج الأعمال المركزي', priority: 'عالي', status: 'مفتوح', owner: 'م. ريم', age: 9, impact: 'تأجيل رخصة البناء' },
  { id: 'ISS-007', title: 'تجاوز الميزانية التشغيلية', project: 'مشروع الواجهة البحرية', priority: 'حرج', status: 'قيد المعالجة', owner: 'م. خالد', age: 3, impact: 'تجاوز 8% من الميزانية المعتمدة' },
  { id: 'ISS-008', title: 'خلل في نظام الصرف الصحي', project: 'مجمع النخيل السكني', priority: 'منخفض', status: 'مغلق', owner: 'م. سارة', age: 60, impact: 'تأخير التسليم أسبوعان' },
];

const priorityColor: Record<string, string> = {
  'حرج': 'bg-destructive/15 text-destructive border border-destructive/30',
  'عالي': 'bg-amber-500/15 text-amber-500 border border-amber-500/30',
  'متوسط': 'bg-primary/15 text-primary border border-primary/30',
  'منخفض': 'bg-muted text-muted-foreground',
};
const statusColor: Record<string, string> = {
  'مفتوح': 'bg-destructive/10 text-destructive',
  'قيد المعالجة': 'bg-amber-500/10 text-amber-500',
  'مغلق': 'bg-emerald-500/10 text-emerald-500',
};

export default function Issues() {
  const open = issues.filter(i => i.status === 'مفتوح').length;
  const inProgress = issues.filter(i => i.status === 'قيد المعالجة').length;
  const closed = issues.filter(i => i.status === 'مغلق').length;
  const critical = issues.filter(i => i.priority === 'حرج').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">إدارة المشكلات</h1>
        <p className="text-muted-foreground">تتبع ومعالجة المشكلات والعوائق التي تؤثر على تسليم المشاريع.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'مشكلات مفتوحة', value: open, color: 'text-destructive', icon: AlertCircle },
          { label: 'قيد المعالجة', value: inProgress, color: 'text-amber-500', icon: Clock },
          { label: 'مغلقة', value: closed, color: 'text-emerald-500', icon: CheckCircle2 },
          { label: 'مشكلات حرجة', value: critical, color: 'text-destructive', icon: AlertCircle },
        ].map((k, i) => (
          <div key={i} className="glass-panel p-5 rounded-xl">
            <div className={`mb-2 ${k.color}`}><k.icon className="w-5 h-5" /></div>
            <div className="text-3xl font-bold font-mono">{k.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center">
          <h3 className="font-semibold text-lg">سجل المشكلات</h3>
          <span className="text-xs text-muted-foreground">{issues.length} مشكلة إجمالاً</span>
        </div>
        <div className="divide-y divide-border">
          {issues.map(issue => (
            <div key={issue.id} className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="font-mono text-xs text-muted-foreground mt-0.5 shrink-0">{issue.id}</span>
                  <div className="min-w-0">
                    <h4 className="font-medium truncate">{issue.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{issue.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${priorityColor[issue.priority]}`}>{issue.priority}</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusColor[issue.status]}`}>{issue.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground pr-8">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{issue.owner}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{issue.age} يوم</span>
                <span className="flex-1 truncate">{issue.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
