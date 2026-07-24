import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { AppLayout } from '@/components/layout/AppLayout';

import Dashboard from '@/pages/Dashboard';
import Portfolio from '@/pages/Portfolio';
import Programs from '@/pages/Programs';
import Projects from '@/pages/Projects';
import Land from '@/pages/Land';
import Feasibility from '@/pages/Feasibility';
import Design from '@/pages/Design';
import Licenses from '@/pages/Licenses';
import Contractors from '@/pages/Contractors';
import Scheduling from '@/pages/Scheduling';
import Cost from '@/pages/Cost';
import Risks from '@/pages/Risks';
import Issues from '@/pages/Issues';
import ChangeManagement from '@/pages/ChangeManagement';
import Resources from '@/pages/Resources';
import Contracts from '@/pages/Contracts';
import Quality from '@/pages/Quality';
import HSE from '@/pages/HSE';
import Procurement from '@/pages/Procurement';
import Delivery from '@/pages/Delivery';
import Governance from '@/pages/Governance';
import Reports from '@/pages/Reports';
import AICenter from '@/pages/AICenter';
import Settings from '@/pages/Settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/programs" component={Programs} />
        <Route path="/projects" component={Projects} />
        <Route path="/land" component={Land} />
        <Route path="/feasibility" component={Feasibility} />
        <Route path="/design" component={Design} />
        <Route path="/licenses" component={Licenses} />
        <Route path="/contractors" component={Contractors} />
        <Route path="/scheduling" component={Scheduling} />
        <Route path="/cost" component={Cost} />
        <Route path="/risks" component={Risks} />
        <Route path="/issues" component={Issues} />
        <Route path="/change-management" component={ChangeManagement} />
        <Route path="/resources" component={Resources} />
        <Route path="/contracts" component={Contracts} />
        <Route path="/quality" component={Quality} />
        <Route path="/hse" component={HSE} />
        <Route path="/procurement" component={Procurement} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/governance" component={Governance} />
        <Route path="/reports" component={Reports} />
        <Route path="/ai-center" component={AICenter} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
