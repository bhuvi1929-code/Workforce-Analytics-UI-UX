import { useMemo, useState } from 'react';
import { Box, CssBaseline, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import AppShell from './components/AppShell';
import FilterBar from './components/FilterBar';
import KpiCard from './components/KpiCard';
import ActivityFeed from './components/ActivityFeed';
import { AttendanceTrend, DepartmentBar, WorkforceDonut } from './components/Charts';
import { EmptyState, ErrorState, LoadingState } from './components/States';
import { defaultFilters } from './data/compute';
import { useDashboard } from './hooks/useDashboard';
import { buildTheme } from './theme';
import type { Filters } from './types';

type Mode = 'light' | 'dark';

export default function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<Mode | null>(() => {
    try { return (localStorage.getItem('wa-mode') as Mode | null) ?? null; } catch { return null; }
  });
  const effective: Mode = mode ?? (prefersDark ? 'dark' : 'light');
  const theme = useMemo(() => buildTheme(effective), [effective]);

  const toggle = () => {
    const next: Mode = effective === 'dark' ? 'light' : 'dark';
    setMode(next);
    try { localStorage.setItem('wa-mode', next); } catch { /* storage unavailable */ }
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { state, retry } = useDashboard(filters);
  const reset = () => setFilters(defaultFilters());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell onToggleMode={toggle}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1 }}>
          <Box>
            <Typography sx={{ color: 'primary.main', fontSize: 11, fontWeight: 850, letterSpacing: '.14em', textTransform: 'uppercase', mb: .7 }}>People intelligence</Typography>
            <Typography variant="h5" component="h1" sx={{ fontSize: { xs: 25, md: 31 } }}>Workforce overview</Typography>
            <Typography color="text.secondary" sx={{ mt: .5, fontSize: 13 }}>A clear picture of your people, attendance, and daily operations.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 12, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2, px: 1.5, py: 1 }}>
            <Box sx={{ width: 7, height: 7, bgcolor: 'success.main', borderRadius: '50%' }} />
            Live dashboard · Mock data
          </Box>
        </Box>
        <FilterBar value={filters} onChange={setFilters} onReset={reset} />

        {state.status === 'loading' && <LoadingState />}
        {state.status === 'error' && <ErrorState onRetry={retry} />}
        {state.status === 'ready' && state.data.total === 0 && <EmptyState onReset={reset} />}
        {state.status === 'ready' && state.data.total > 0 && (
          <>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(5,1fr)' } }}>
              {state.data.kpis.map((k) => <KpiCard key={k.id} kpi={k} />)}
            </Box>
            <AttendanceTrend data={state.data.trend} />
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
              <DepartmentBar data={state.data.departments} />
              <WorkforceDonut data={state.data.statuses} total={state.data.total} />
            </Box>
            <ActivityFeed items={state.data.activity} />
          </>
        )}
      </AppShell>
    </ThemeProvider>
  );
}
