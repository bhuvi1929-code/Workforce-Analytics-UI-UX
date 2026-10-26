import { Box, Paper, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/GroupsRounded';
import HowToRegIcon from '@mui/icons-material/HowToRegRounded';
import PercentIcon from '@mui/icons-material/DonutSmallRounded';
import BeachIcon from '@mui/icons-material/BeachAccessRounded';
import ScheduleIcon from '@mui/icons-material/AccessTimeRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded';
import type { Kpi } from '../types';

const ICONS = { total: PeopleIcon, present: HowToRegIcon, rate: PercentIcon, leave: BeachIcon, late: ScheduleIcon };
const TINTS: Record<Kpi['id'], { bg: string; color: string }> = {
  total: { bg: '#EEEDFF', color: '#635BFF' },
  present: { bg: '#DDF8EF', color: '#059669' },
  rate: { bg: '#E0F2FE', color: '#0284C7' },
  leave: { bg: '#FFF0E1', color: '#EA580C' },
  late: { bg: '#FCE7F3', color: '#DB2777' },
};

export default function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = ICONS[kpi.id];
  const tint = TINTS[kpi.id];
  return (
    <Paper component="article" aria-label={kpi.label} sx={{ p: 2.2, display: 'flex', gap: 1.5, alignItems: 'flex-start', minWidth: 0, borderRadius: 3, position: 'relative', overflow: 'hidden', transition: 'transform .2s ease, box-shadow .2s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 28px rgba(34,43,90,.09)' }, '&:after': { content: '""', position: 'absolute', width: 90, height: 90, borderRadius: '50%', right: -42, top: -42, bgcolor: tint.bg, opacity: .6 } }}>
      <Box sx={{ p: 1.2, borderRadius: '13px', bgcolor: tint.bg, color: tint.color, display: 'flex', position: 'relative', zIndex: 1 }}>
        <Icon fontSize="small" />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1, position: 'relative', zIndex: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, mb: .8 }} noWrap>{kpi.label}</Typography>
        <Typography variant="h5" component="p" sx={{ lineHeight: 1.1, fontSize: { xs: 23, md: 27 }, mb: .8 }}>{kpi.value}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
          <TrendingUpIcon sx={{ fontSize: 13, color: tint.color }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10.5 }}>{kpi.hint}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
