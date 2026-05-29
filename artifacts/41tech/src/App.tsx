import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/languageContext";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Public Pages
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Cases from "@/pages/Cases";
import CaseDetail from "@/pages/CaseDetail";
import AboutUs from "@/pages/AboutUs";
import Expertise from "@/pages/Expertise";
import Experience from "@/pages/Experience";

// Admin Pages
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProjects from "@/pages/admin/Projects";
import AdminTeam from "@/pages/admin/Team";
import AdminCases from "@/pages/admin/Cases";
import AdminTechnologies from "@/pages/admin/Technologies";
import AdminSettings from "@/pages/admin/Settings";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        const status = (error as { status?: number })?.status;
        if (status === 401 || status === 403) return false;
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
    },
  },
});

/** Redirect helper — preserves SPA navigation without full reload */
function RedirectTo({ to }: { to: string }) {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [to, navigate]);
  return null;
}

function Router() {
  return (
    <Switch>
      {/* ── Admin Routes (unchanged) ── */}
      <Route path="/admin-41tech/login" component={AdminLogin} />

      <Route path="/admin-41tech/settings">
        <AdminLayout><AdminSettings /></AdminLayout>
      </Route>
      <Route path="/admin-41tech/dashboard">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </Route>
      <Route path="/admin-41tech/projects">
        <AdminLayout><AdminProjects /></AdminLayout>
      </Route>
      <Route path="/admin-41tech/team">
        <AdminLayout><AdminTeam /></AdminLayout>
      </Route>
      <Route path="/admin-41tech/cases">
        <AdminLayout><AdminCases /></AdminLayout>
      </Route>
      <Route path="/admin-41tech/technologies">
        <AdminLayout><AdminTechnologies /></AdminLayout>
      </Route>

      {/* ── Public Routes ── */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>

      {/* Core nav pages */}
      <Route path="/expertise">
        <PublicLayout><Expertise /></PublicLayout>
      </Route>
      <Route path="/projetos">
        <PublicLayout><Projects /></PublicLayout>
      </Route>
      <Route path="/projetos/:slug">
        <PublicLayout><ProjectDetail /></PublicLayout>
      </Route>
      <Route path="/experiencia">
        <PublicLayout><Experience /></PublicLayout>
      </Route>

      {/* Contato (= página Sobre Mim) */}
      <Route path="/contato">
        <PublicLayout><AboutUs /></PublicLayout>
      </Route>

      {/* Legacy alias — backward compat */}
      <Route path="/sobre-mim">
        <PublicLayout><AboutUs /></PublicLayout>
      </Route>

      {/* /cases redirects to /projetos (Cases data is preserved in admin) */}
      <Route path="/cases">
        <RedirectTo to="/projetos" />
      </Route>
      <Route path="/cases/:slug">
        {/* Individual case detail kept alive for any existing links */}
        <PublicLayout><CaseDetail /></PublicLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
