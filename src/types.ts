export const DEPARTMENTS = ['Engineering', 'Operations', 'Sales', 'Finance', 'HR', 'Support'] as const;
export const LOCATIONS = ['Chennai', 'Bengaluru', 'Mumbai', 'Remote'] as const;
export const STATUSES = ['Active', 'On leave', 'Probation'] as const;

export type Department = (typeof DEPARTMENTS)[number];
export type Location = (typeof LOCATIONS)[number];
export type Status = (typeof STATUSES)[number];

export interface Employee {
  id: string;
  name: string;
  department: Department;
  location: Location;
  status: Status;
}

export interface ActivityItem {
  id: string;
  employeeId: string;
  name: string;
  department: Department;
  action: string;
  minutesAgo: number;
}

export interface Filters {
  from: string; // YYYY-MM-DD
  to: string;
  department: Department | 'All';
  location: Location | 'All';
  status: Status | 'All';
}

export interface Kpi {
  id: 'total' | 'present' | 'rate' | 'leave' | 'late';
  label: string;
  value: string;
  hint: string;
}

export interface TrendPoint { date: string; present: number; leave: number; absent: number }

export interface DashboardData {
  total: number;
  kpis: Kpi[];
  trend: TrendPoint[];
  departments: { name: string; count: number }[];
  statuses: { name: string; value: number }[];
  activity: ActivityItem[];
}
