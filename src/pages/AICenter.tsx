import { useState } from 'react';
import { Search, BrainCircuit, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockAIAnalysis, defaultAIResponse, AIAnalysisResponse } from '@/data/aiAnalysis';
import { motion, AnimatePresence } from 'framer-motion';

export default function AICenter() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResponse | null>(null);

  const sampleQuestions = [
    "ما المشاريع المتأخرة؟",
    "ما أسباب تأخر المشروع؟",
    "ما الأنشطة الحرجة القادمة؟",
    "ما أثر التأخير على تاريخ التسليم؟",
    "هل الميزانية تحت السيطرة؟",
    "ما المخاطر الأعلى؟",
    "ما خطة التعافي المقترحة؟"
  ];

  const handleAnalyze = () => {
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI thinking delay
    setTimeout(() => {
      // Find matching response based on keywords
      const matched = mockAIAnalysis.find(res => 
        res.questionKeywords.some(kw => query.includes(kw))
      );
      
      setResult(matched || defaultAIResponse);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
          <BrainCircuit className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">AI Project Assistant</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          اسأل النظام عن حالة المشاريع أو اطلب تحليلاً — مساعد مدير المشروع ومدير PMO.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="relative">
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="مثال: ما المشاريع المتوقع تأخرها في المنطقة الغربية؟"
            className="h-16 pl-32 pr-6 text-lg rounded-2xl bg-card border-2 border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 shadow-lg"
          />
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !query.trim()}
            className="absolute left-2 top-2 bottom-2 bg-primary text-primary-foreground px-6 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                يحلل...
              </span>
            ) : (
              'تحليل البيانات'
            )}
          </button>
        </div>

        {!result && !isAnalyzing && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3 font-medium">أسئلة مقترحة:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map(q => (
                <button 
                  key={q}
                  onClick={() => { setQuery(q); }}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center justify-center py-20 text-muted-foreground"
          >
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              <BrainCircuit className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
            </div>
            <p className="text-lg font-medium animate-pulse">يتم معالجة ملايين نقاط البيانات واستخراج الرؤى...</p>
          </motion.div>
        )}

        {result && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h2 className="text-2xl font-bold">تقرير تحليل المشروع — AI Project Assistant</h2>
              <div className="flex gap-2">
                <button onClick={() => { setQuery(''); setResult(null); }} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80">
                  سؤال جديد
                </button>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary bg-primary/5">
              <p className="text-lg leading-relaxed font-medium">{result.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="text-primary" />
                    التحليل التفصيلي
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.answer}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {result.kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-card border border-border p-4 rounded-xl">
                      <div className="text-sm text-muted-foreground mb-1">{kpi.label}</div>
                      <div className="text-2xl font-bold font-mono">{kpi.value}</div>
                    </div>
                  ))}
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="text-amber-500" />
                    التوصيات والقرارات المقترحة
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex gap-3 text-muted-foreground bg-accent/50 p-3 rounded-lg border border-border/50">
                        <div className="mt-1 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-xl bg-destructive/5 border-destructive/20">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-destructive">
                    <AlertTriangle />
                    المخاطر والتنبؤ
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-foreground">احتمالية الحدوث</span>
                      <span className="font-bold text-destructive">{result.prediction.probability}%</span>
                    </div>
                    <div className="w-full bg-destructive/20 h-2 rounded-full overflow-hidden">
                      <div className="bg-destructive h-full" style={{ width: `${result.prediction.probability}%` }} />
                    </div>
                    <p className="text-sm mt-3 text-muted-foreground">{result.prediction.text}</p>
                  </div>

                  <h4 className="font-medium text-sm mb-3">المخاطر المترتبة:</h4>
                  <ul className="space-y-2 text-sm">
                    {result.risks.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-destructive mt-0.5">•</span> {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-4">الأسباب الجذرية (Root Causes)</h3>
                  <div className="space-y-4">
                    {result.rootCauses.map((cause, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cause.cause}</span>
                          <span className="font-mono text-muted-foreground">{cause.percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full opacity-80" style={{ width: `${cause.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
