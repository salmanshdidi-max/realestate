export const mockKPIs = {
  totalPortfolioValue: 350_000_000, // 350 Million SAR
  totalProjects: 42,
  totalCompanies: 10,
  totalContractors: 25,
  overallCompletionPct: 68,
  criticalProjects: 7,
  delayedProjects: 5,
  governanceScore: 90,
  portfolioHealth: 82,

  monthlyPerformance: [
    { month: 'يناير', planned: 45, actual: 42 },
    { month: 'فبراير', planned: 50, actual: 48 },
    { month: 'مارس', planned: 55, actual: 52 },
    { month: 'أبريل', planned: 60, actual: 59 },
    { month: 'مايو', planned: 65, actual: 64 },
    { month: 'يونيو', planned: 70, actual: 68 },
  ],

  // Percentage allocation by project type (sums to 100)
  budgetBreakdown: [
    { name: 'سكني', value: 40 },
    { name: 'تجاري', value: 30 },
    { name: 'متعدد الاستخدام', value: 18 },
    { name: 'بنية تحتية', value: 8 },
    { name: 'ضيافة', value: 4 },
  ],

  // Values in Million SAR
  regionalDistribution: [
    { name: 'الرياض', count: 18, value: 140 },
    { name: 'جدة', count: 12, value: 90 },
    { name: 'الدمام', count: 5, value: 45 },
    { name: 'نيوم', count: 2, value: 55 },
    { name: 'أخرى', count: 5, value: 20 },
  ]
};
