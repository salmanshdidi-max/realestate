import { Landmark, CheckSquare, FileSignature, ShieldCheck, Clock, AlertCircle, GitMerge, BookOpen } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';

// ── 1. Project Lifecycle Stages ─────────────────────────────────────────────
const lifecycleStages = [
  {
    id: 1,
    nameAr: 'البدء',
    nameEn: 'Initiation',
    status: 'مكتمل',
    completion: 100,
    documents: ['وثيقة بدء المشروع', 'دراسة الجدوى الأولية'],
    gate: 'اعتماد فكرة المشروع',
    responsible: 'راعي المشروع',
  },
  {
    id: 2,
    nameAr: 'التخطيط',
    nameEn: 'Planning',
    status: 'مكتمل',
    completion: 100,
    documents: ['خطة إدارة المشروع', 'جدول أعمال تفصيلي', 'خطة التكلفة'],
    gate: 'اعتماد خطة المشروع',
    responsible: 'مدير المشروع',
  },
  {
    id: 3,
    nameAr: 'التصميم',
    nameEn: 'Design',
    status: 'مكتمل',
    completion: 100,
    documents: ['مخططات التصميم', 'المواصفات الفنية', 'جداول الكميات'],
    gate: 'اعتماد التصاميم',
    responsible: 'المهندس المعماري',
  },
  {
    id: 4,
    nameAr: 'الاعتماد',
    nameEn: 'Approval',
    status: 'جارٍ',
    completion: 70,
    documents: ['وثيقة اعتماد الميزانية', 'اعتماد المخططات', 'التصاريح الحكومية'],
    gate: 'اعتماد الميزانية والتراخيص',
    responsible: 'PMO / الإدارة العليا',
  },
  {
    id: 5,
    nameAr: 'التنفيذ',
    nameEn: 'Execution',
    status: 'معلق',
    completion: 0,
    documents: ['عقود المقاولين', 'خطة الجودة', 'خطة السلامة HSE'],
    gate: 'اعتماد بدء التنفيذ',
    responsible: 'مدير المشروع / المقاول',
  },
  {
    id: 6,
    nameAr: 'الرقابة والتحكم',
    nameEn: 'Monitoring & Control',
    status: 'معلق',
    completion: 0,
    documents: ['تقارير الأداء الشهرية', 'سجل المخاطر', 'سجل طلبات التغيير'],
    gate: 'مراجعة الأداء الدوري',
    responsible: 'PMO / مدير التحكم',
  },
  {
    id: 7,
    nameAr: 'التسليم والإغلاق',
    nameEn: 'Handover & Closing',
    status: 'معلق',
    completion: 0,
    documents: ['شهادة الإنجاز', 'وثائق التشغيل والصيانة', 'الدروس المستفادة'],
    gate: 'اعتماد إغلاق المشروع',
    responsible: 'مدير المشروع / العميل',
  },
];

// ── 2. Stage Gates ───────────────────────────────────────────────────────────
const stageGates = [
  { gate: 'اعتماد وثيقة الأعمال', project: 'مول الرياض الجديد', required: 'الإدارة العليا', status: 'معتمد', owner: 'م. فهد المطيري' },
  { gate: 'اعتماد التصاميم', project: 'برج الأعمال المركزي', required: 'PMO + الاستشاري', status: 'معتمد', owner: 'م. خالد الدوسري' },
  { gate: 'اعتماد الميزانية', project: 'مشروع الواجهة البحرية', required: 'المدير المالي + PMO', status: 'قيد المراجعة', owner: 'م. أحمد السالم' },
  { gate: 'اعتماد بدء التنفيذ', project: 'مجمع النخيل السكني', required: 'PMO + الجهات التنظيمية', status: 'قيد المراجعة', owner: 'م. سعد القحطاني' },
  { gate: 'اعتماد إغلاق المشروع', project: 'مشروع المدينة المتكاملة', required: 'العميل + الإدارة العليا', status: 'معلق', owner: 'م. ياسر الشمري' },
];

// ── 3. Policies & Procedures ─────────────────────────────────────────────────
const policies = [
  { name: 'سياسة إدارة المشاريع', owner: 'PMO', version: 'v3.1', status: 'معتمد', updated: '2026-01-15' },
  { name: 'سياسة إدارة الجدول الزمني', owner: 'مدير التخطيط', version: 'v2.4', status: 'معتمد', updated: '2026-02-10' },
  { name: 'سياسة التحكم في التكاليف', owner: 'المدير المالي', version: 'v2.0', status: 'معتمد', updated: '2026-01-30' },
  { name: 'سياسة إدارة المخاطر', owner: 'مدير المخاطر', version: 'v1.8', status: 'قيد المراجعة', updated: '2025-11-20' },
  { name: 'سياسة إدارة التغيير', owner: 'PMO', version: 'v2.2', status: 'معتمد', updated: '2026-03-05' },
  { name: 'سياسة ضبط الوثائق', owner: 'مدير الجودة', version: 'v1.5', status: 'معتمد', updated: '2025-12-01' },
  { name: 'سياسة التقارير والإبلاغ', owner: 'PMO', version: 'v3.0', status: 'قيد التحديث', updated: '2026-04-20' },
];

// ── 4. RACI Matrix ────────────────────────────────────────────────────────────
type RaciCode = 'R' | 'A' | 'C' | 'I' | '-';

const raciRoles = ['مدير المشروع', 'PMO', 'مهندس التخطيط', 'التحكم بالتكاليف', 'مدير المخاطر', 'راعي المشروع', 'المقاول'];

const raciActivities: { name: string; values: RaciCode[] }[] = [
  { name: 'اعتماد الجدول الزمني',   values: ['R', 'A', 'C', 'I', 'I', 'I', 'C'] },
  { name: 'التحكم في الميزانية',     values: ['R', 'A', 'C', 'R', 'I', 'A', 'I'] },
  { name: 'مراجعة المخاطر',          values: ['R', 'C', 'C', 'I', 'R', 'A', 'I'] },
  { name: 'اعتماد طلبات التغيير',   values: ['R', 'A', 'I', 'C', 'C', 'A', 'C'] },
  { name: 'التقارير الدورية',        values: ['R', 'A', 'C', 'C', 'C', 'I', 'I'] },
];

const raciColor: Record<RaciCode, string> = {
  R: 'bg-primary/20 text-primary border-primary/40',
  A: 'bg-destructive/20 text-destructive border-destructive/40',
  C: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  I: 'bg-muted/40 text-muted-foreground border-border',
  '-': 'bg-transparent text-muted-foreground/40 border-transparent',
};

const raciLegend: { code: RaciCode; label: string }[] = [
  { code: 'R', label: 'مسؤول (Responsible)' },
  { code: 'A', label: 'محاسب (Accountable)' },
  { code: 'C', label: 'مستشار (Consulted)' },
  { code: 'I', label: 'مُبلَّغ (Informed)' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const stageStatusStyle: Record<string, string> = {
  'مكتمل':       'bg-emerald-500/10 text-emerald-400',
  'جارٍ':        'bg-amber-500/10  text-amber-400',
  'معلق':        'bg-muted/30      text-muted-foreground',
};

const gateStatusStyle: Record<string, string> = {
  'معتمد':        'bg-emerald-500/10 text-emerald-400',
  'قيد المراجعة': 'bg-amber-500/10  text-amber-400',
  'معلق':         'bg-muted/30      text-muted-foreground',
};

const policyStatusStyle: Record<string, string> = {
  'معتمد':        'bg-emerald-500/10 text-emerald-400',
  'قيد المراجعة': 'bg-amber-500/10  text-amber-400',
  'قيد التحديث': 'bg-primary/10    text-primary',
};

export default function Governance() {
  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">مركز الحوكمة وإدارة PMO</h1>
        <p className="text-muted-foreground">إطار الحوكمة، بوابات المشاريع، السياسات، ومصفوفة المسؤوليات RACI.</p>
      </div>

      {/* ── Section 5: Governance KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-5 rounded-xl flex flex-col gap-2 border-primary/30">
          <div className="text-primary"><ShieldCheck className="w-5 h-5" /></div>
          <div className="text-2xl font-black font-mono">92%</div>
          <div className="text-xs text-muted-foreground">امتثال الحوكمة</div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex flex-col gap-2 border-emerald-500/30">
          <div className="text-emerald-400"><GitMerge className="w-5 h-5" /></div>
          <div className="text-2xl font-black font-mono">71%</div>
          <div className="text-xs text-muted-foreground">اكتمال بوابات المشاريع</div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex flex-col gap-2 border-primary/30">
          <div className="text-primary"><BookOpen className="w-5 h-5" /></div>
          <div className="text-2xl font-black font-mono">88%</div>
          <div className="text-xs text-muted-foreground">امتثال السياسات</div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex flex-col gap-2 border-amber-500/30">
          <div className="text-amber-400"><Clock className="w-5 h-5" /></div>
          <div className="text-2xl font-black font-mono">6.4 <span className="text-sm font-normal">يوم</span></div>
          <div className="text-xs text-muted-foreground">متوسط دورة الاعتماد</div>
        </div>
        <div className="glass-panel p-5 rounded-xl flex flex-col gap-2 border-destructive/30">
          <div className="text-destructive"><AlertCircle className="w-5 h-5" /></div>
          <div className="text-2xl font-black font-mono">7</div>
          <div className="text-xs text-muted-foreground">مسائل حوكمة مفتوحة</div>
        </div>
      </div>

      {/* Governance Maturity Banner */}
      <div className="glass-panel p-6 rounded-xl flex items-center justify-between border-l-4 border-l-primary bg-primary/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div>
          <h3 className="text-lg font-bold mb-1 text-primary">مؤشر نضج الحوكمة المؤسسية</h3>
          <p className="text-sm text-muted-foreground">تم التقييم وفق معايير P3M3 — المستوى الرابع: مُدار</p>
        </div>
        <div className="text-5xl font-black text-primary font-mono drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]">
          90<span className="text-2xl">%</span>
        </div>
      </div>

      {/* ── Section 1: Project Governance Framework ── */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-lg">إطار دورة حياة المشروع — Project Governance Framework</h3>
          <p className="text-sm text-muted-foreground mt-0.5">مراحل الدورة مع الحالة والوثائق المطلوبة وبوابات الاعتماد</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {['#', 'المرحلة', 'الحالة', 'الوثائق المطلوبة', 'بوابة الاعتماد', 'الجهة المسؤولة', 'الإنجاز'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lifecycleStages.map(stage => (
                <tr key={stage.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-muted-foreground text-xs">{stage.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{stage.nameAr}</div>
                    <div className="text-xs text-muted-foreground">{stage.nameEn}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${stageStatusStyle[stage.status] ?? ''}`}>{stage.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <ul className="space-y-0.5">
                      {stage.documents.map(doc => (
                        <li key={doc} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-primary mt-0.5">·</span>{doc}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground max-w-[160px]">{stage.gate}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{stage.responsible}</td>
                  <td className="px-4 py-3 w-28">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stage.completion === 100 ? 'bg-emerald-500' : stage.completion > 0 ? 'bg-amber-400' : 'bg-muted-foreground/30'}`}
                          style={{ width: `${stage.completion}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs w-8">{stage.completion}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 2: Stage Gate Management ── */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-lg">إدارة بوابات المشاريع — Stage Gate Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {['اسم البوابة', 'المشروع', 'جهة الاعتماد المطلوبة', 'الحالة الحالية', 'المسؤول'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stageGates.map((g, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-semibold">{g.gate}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{g.project}</td>
                  <td className="px-4 py-3 text-xs">{g.required}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${gateStatusStyle[g.status] ?? ''}`}>{g.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{g.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 3: Policies & Procedures ── */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-lg">السياسات والإجراءات — Policies & Procedures</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {['السياسة', 'المالك', 'الإصدار', 'الحالة', 'آخر تحديث'].map(h => (
                  <th key={h} className="px-4 py-3 text-right font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {policies.map((p, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{p.owner}</td>
                  <td className="px-4 py-3 font-mono text-xs text-primary">{p.version}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${policyStatusStyle[p.status] ?? ''}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 4: RACI Matrix ── */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-lg">مصفوفة المسؤوليات — RACI Matrix</h3>
          <div className="flex flex-wrap gap-3 mt-3">
            {raciLegend.map(l => (
              <div key={l.code} className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium ${raciColor[l.code]}`}>
                <span className="font-mono font-bold">{l.code}</span>
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground w-48">النشاط</th>
                {raciRoles.map(role => (
                  <th key={role} className="px-2 py-3 text-center font-medium text-muted-foreground text-xs whitespace-nowrap">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {raciActivities.map((activity, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-sm">{activity.name}</td>
                  {activity.values.map((code, j) => (
                    <td key={j} className="px-2 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded border font-mono font-bold text-xs ${raciColor[code]}`}>
                        {code}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
