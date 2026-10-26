import type { ReactNode } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import type { DashboardData } from '../types';

function ChartCard({ title, summary, children, height = 290 }: { title: string; summary: string; children: ReactNode; height?: number }) {
  return (
    <Paper component="section" aria-label={title} sx={{ p: 2.5, borderRadius: 3, minWidth: 0 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontSize: 14 }}>{title}</Typography>
      <Box role="img" aria-label={summary} sx={{ height }}>{children}</Box>
    </Paper>
  );
}

function useChartStyles() {
  const t = useTheme();
  return {
    tooltip: { background: t.palette.background.paper, border: `1px solid ${t.palette.divider}`, borderRadius: 8, color: t.palette.text.primary },
    axis: { fill: t.palette.text.secondary, fontSize: 12 },
    grid: t.palette.divider,
    series: [t.palette.primary.main, t.palette.info.main, t.palette.secondary.main],
  };
}

const short = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

export function AttendanceTrend({ data }: { data: DashboardData['trend'] }) {
  const s = useChartStyles();
  return (
    <ChartCard title="Attendance trend" summary={`Daily present, on leave and absent counts over ${data.length} working days`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
          <CartesianGrid stroke={s.grid} vertical={false} />
          <XAxis dataKey="date" tickFormatter={short} tick={s.axis} minTickGap={24} />
          <YAxis tick={s.axis} />
          <Tooltip contentStyle={s.tooltip} labelFormatter={short} />
          <Legend />
          <Area type="monotone" dataKey="present" name="Present" stackId="a" stroke={s.series[0]} fill={s.series[0]} fillOpacity={0.35} />
          <Area type="monotone" dataKey="leave" name="On leave" stackId="a" stroke={s.series[1]} fill={s.series[1]} fillOpacity={0.35} />
          <Area type="monotone" dataKey="absent" name="Absent" stackId="a" stroke={s.series[2]} fill={s.series[2]} fillOpacity={0.35} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function DepartmentBar({ data }: { data: DashboardData['departments'] }) {
  const s = useChartStyles();
  const t = useTheme();
  return (
    <ChartCard title="Employees by department" summary={data.map((d) => `${d.name} ${d.count}`).join(', ')}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid stroke={s.grid} horizontal={false} />
          <XAxis type="number" tick={s.axis} />
          <YAxis type="category" dataKey="name" tick={s.axis} width={86} />
          <Tooltip contentStyle={s.tooltip} cursor={{ fill: t.palette.action.hover }} />
          <Bar dataKey="count" name="Employees" fill={s.series[0]} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function WorkforceDonut({ data, total }: { data: DashboardData['statuses']; total: number }) {
  const s = useChartStyles();
  return (
    <ChartCard title="Workforce by status" summary={data.map((d) => `${d.name} ${d.value}`).join(', ')}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="82%" paddingAngle={2} stroke="none">
              {data.map((d, i) => <Cell key={d.name} fill={s.series[i % s.series.length]} />)}
            </Pie>
            <Tooltip contentStyle={s.tooltip} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
        <Box sx={{ position: 'absolute', top: '38%', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
          <Typography variant="h5" component="p" sx={{ lineHeight: 1 }}>{total}</Typography>
          <Typography variant="caption" color="text.secondary">employees</Typography>
        </Box>
      </Box>
    </ChartCard>
  );
}
