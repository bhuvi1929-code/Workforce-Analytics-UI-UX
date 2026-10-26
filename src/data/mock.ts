import { DEPARTMENTS, LOCATIONS, type ActivityItem, type Employee, type Status } from '../types';

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = ['Aarav', 'Meera', 'Karthik', 'Divya', 'Rahul', 'Priya', 'Suresh', 'Anitha', 'Vikram', 'Nisha', 'Arjun', 'Lakshmi'];
const LAST = ['Raman', 'Iyer', 'Kumar', 'Nair', 'Singh', 'Pillai', 'Das', 'Menon', 'Rao', 'Shah'];
const ACTIONS = ['Checked in', 'Requested leave', 'Completed onboarding', 'Updated profile', 'Checked out', 'Submitted timesheet', 'Transferred department'];

const rand = rng(42);
const pick = <T,>(a: readonly T[]): T => a[Math.floor(rand() * a.length)];

export const EMPLOYEES: Employee[] = Array.from({ length: 240 }, (_, i) => {
  const r = rand();
  const status: Status = r < 0.8 ? 'Active' : r < 0.92 ? 'On leave' : 'Probation';
  return {
    id: `E${1000 + i}`,
    name: `${pick(FIRST)} ${pick(LAST)}`,
    department: pick(DEPARTMENTS),
    location: pick(LOCATIONS),
    status,
  };
});

export const ACTIVITY: ActivityItem[] = Array.from({ length: 60 }, (_, i) => {
  const e = pick(EMPLOYEES);
  return {
    id: `A${i}`,
    employeeId: e.id,
    name: e.name,
    department: e.department,
    action: pick(ACTIONS),
    minutesAgo: 3 + i * 17,
  };
});
