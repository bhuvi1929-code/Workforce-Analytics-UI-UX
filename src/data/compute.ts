import { EMPLOYEES, ACTIVITY } from './mock';
import type { DashboardData, Filters, TrendPoint } from '../types';

export function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function defaultFilters(): Filters {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 29);
  return { from: isoDay(from), to: isoDay(to), department: 'All', location: 'All', status: 'All' };
}

/** Deterministic daily attendance rate between ~0.88 and ~0.97. */
function dayRate(date: string): number {
  const n = [...date].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 1000;
  return 0.88 + (n / 1000) * 0.09;
}

export function buildDashboard(f: Filters): DashboardData {
  const people = EMPLOYEES.filter(
    (e) =>
      (f.department === 'All' || e.department === f.department) &&
      (f.location === 'All' || e.location === f.location) &&
      (f.status === 'All' || e.status === f.status),
  );
  const total = people.length;
  const onLeave = people.filter((p) => p.status === 'On leave').length;
  const available = total - onLeave;

  const trend: TrendPoint[] = [];
  const end = new Date(f.to);
  for (let d = new Date(f.from); d <= end && trend.length < 90; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    const date = isoDay(d);
    const present = Math.round(available * dayRate(date));
    trend.push({ date, present, leave: onLeave, absent: Math.max(0, available - present) });
  }

  const last = trend[trend.length - 1];
  const avgRate = trend.length && available ? trend.reduce((a, t) => a + t.present, 0) / trend.length / available : 0;

  const departments = Array.from(new Set(people.map((p) => p.department))).map((name) => ({
    name,
    count: people.filter((p) => p.department === name).length,
  }));
  const statuses = (['Active', 'On leave', 'Probation'] as const)
    .map((name) => ({ name, value: people.filter((p) => p.status === name).length }))
    .filter((s) => s.value > 0);
  const ids = new Set(people.map((p) => p.id));

  return {
    total,
    trend,
    departments,
    statuses,
    activity: ACTIVITY.filter((a) => ids.has(a.employeeId)).slice(0, 8),
    kpis: [
      { id: 'total', label: 'Total employees', value: String(total), hint: `${departments.length} departments` },
      { id: 'present', label: 'Present on last day', value: String(last?.present ?? 0), hint: last ? last.date : 'No working days' },
      { id: 'rate', label: 'Avg. attendance rate', value: `${(avgRate * 100).toFixed(1)}%`, hint: `${trend.length} working days` },
      { id: 'leave', label: 'On leave', value: String(onLeave), hint: total ? `${((onLeave / total) * 100).toFixed(0)}% of workforce` : '–' },
      { id: 'late', label: 'Late arrivals / day', value: String(Math.round((last?.present ?? 0) * 0.06)), hint: 'Estimated, mock data' },
    ],
  };
}
