import { useCallback, useEffect, useState } from 'react';
import { buildDashboard } from '../data/compute';
import type { DashboardData, Filters } from '../types';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: DashboardData };

/** Simulates an API call. Add ?state=error to the URL to preview the error state. */
export function useDashboard(filters: Filters) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setState({ status: 'loading' });
    const timer = setTimeout(() => {
      const forceError = new URLSearchParams(window.location.search).get('state') === 'error';
      setState(forceError && attempt === 0 ? { status: 'error' } : { status: 'ready', data: buildDashboard(filters) });
    }, 600);
    return () => clearTimeout(timer);
  }, [filters, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  return { state, retry };
}
