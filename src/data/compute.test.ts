import { describe, expect, it } from 'vitest';
import { buildDashboard, defaultFilters } from './compute';

describe('buildDashboard', () => {
  it('returns five KPIs', () => {
    expect(buildDashboard(defaultFilters()).kpis).toHaveLength(5);
  });
  it('filters by department', () => {
    const d = buildDashboard({ ...defaultFilters(), department: 'HR' });
    expect(d.departments.every((x) => x.name === 'HR')).toBe(true);
  });
  it('handles filter combinations with few or no matches', () => {
    const d = buildDashboard({ ...defaultFilters(), status: 'Probation', department: 'HR', location: 'Remote' });
    expect(d.total).toBeGreaterThanOrEqual(0);
  });
  it('excludes weekends from the trend', () => {
    const d = buildDashboard(defaultFilters());
    expect(d.trend.every((t) => ![0, 6].includes(new Date(t.date).getDay()))).toBe(true);
  });
});
