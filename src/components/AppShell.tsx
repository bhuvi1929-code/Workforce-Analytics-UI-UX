import { useState, type ReactNode } from 'react';
import {
  AppBar, Avatar, Box, Drawer, IconButton, InputBase, List, ListItemButton, ListItemIcon,
  ListItemText, Toolbar, Tooltip, Typography, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/SpaceDashboardRounded';
import PeopleIcon from '@mui/icons-material/GroupsRounded';
import EventIcon from '@mui/icons-material/CalendarMonthRounded';
import ApartmentIcon from '@mui/icons-material/CorporateFareRounded';
import AssessmentIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsIcon from '@mui/icons-material/TuneRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNoneRounded';

const WIDTH = 252;
const NAV = [
  { label: 'Dashboard', icon: <DashboardIcon />, current: true },
  { label: 'Employees', icon: <PeopleIcon /> },
  { label: 'Attendance', icon: <EventIcon /> },
  { label: 'Departments', icon: <ApartmentIcon /> },
  { label: 'Reports', icon: <AssessmentIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Box component="nav" aria-label="Main navigation" sx={{ height: '100%', display: 'flex', flexDirection: 'column', px: 2, py: 2 }}>
      <Toolbar disableGutters sx={{ minHeight: '58px !important', px: 1.25, gap: 1.25, mb: 3 }}>
        <Box sx={{ width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: '12px', color: 'white', background: 'linear-gradient(135deg,#7C73FF,#4F46E5)', boxShadow: '0 7px 16px rgba(99,91,255,.25)' }}>
          <DashboardIcon />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 15, fontWeight: 850, letterSpacing: '-.04em', lineHeight: 1.25 }}>Workforce</Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary', letterSpacing: '.12em', textTransform: 'uppercase' }}>Analytics suite</Typography>
        </Box>
      </Toolbar>
      <Typography sx={{ px: 1.5, mb: 1, fontSize: 10, fontWeight: 800, letterSpacing: '.13em', color: 'text.secondary' }}>WORKSPACE</Typography>
      <List sx={{ p: 0, display: 'grid', gap: .6 }}>
        {NAV.map((n) => (
          <ListItemButton key={n.label} selected={n.current} onClick={onNavigate} aria-current={n.current ? 'page' : undefined}
            sx={{ minHeight: 46, borderRadius: '12px', px: 1.5, '& .MuiListItemIcon-root': { color: 'inherit' } }}>
            <ListItemIcon sx={{ minWidth: 38 }}>{n.icon}</ListItemIcon>
            <ListItemText primary={n.label} primaryTypographyProps={{ fontSize: 13, fontWeight: n.current ? 750 : 550 }} />
            {n.current && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />}
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 1.5, borderRadius: 3, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ fontSize: 12, fontWeight: 750, mb: .5 }}>Need a hand?</Typography>
        <Typography sx={{ fontSize: 11, color: 'text.secondary', lineHeight: 1.5 }}>Your people insights, all in one place.</Typography>
      </Box>
    </Box>
  );
}

export default function AppShell({ children, onToggleMode }: { children: ReactNode; onToggleMode: () => void }) {
  const [open, setOpen] = useState(false);
  const dark = useTheme().palette.mode === 'dark';
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box component="a" href="#main" sx={{ position: 'absolute', left: -9999, '&:focus': { left: 8, top: 8, zIndex: 2000, bgcolor: 'background.paper', p: 1 } }}>Skip to content</Box>
      <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, width: WIDTH, flexShrink: 0, '& .MuiDrawer-paper': { width: WIDTH, boxSizing: 'border-box', border: 0, borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' } }}><Nav /></Drawer>
      <Drawer open={open} onClose={() => setOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: WIDTH } }}><Nav onNavigate={() => setOpen(false)} /></Drawer>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', backgroundImage: 'none' }}>
          <Toolbar sx={{ minHeight: '72px !important', px: { xs: 2, md: 4 }, gap: 1.5 }}>
            <IconButton aria-label="Open navigation" edge="start" onClick={() => setOpen(true)} sx={{ display: { md: 'none' } }}><MenuIcon /></IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.2, px: 1.7, py: 1, borderRadius: '12px', bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', flex: '0 1 360px' }}>
              <SearchIcon fontSize="small" color="action" />
              <InputBase placeholder="Search anything..." inputProps={{ 'aria-label': 'Search employees' }} sx={{ flex: 1, fontSize: 13 }} />
              <Typography sx={{ fontSize: 10, color: 'text.secondary', border: '1px solid', borderColor: 'divider', borderRadius: 1, px: .7, py: .2 }}>⌘ K</Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 12, color: 'text.secondary', mr: .5 }}>HR workspace</Typography>
            <Tooltip title="Notifications"><IconButton aria-label="Notifications"><NotificationsNoneIcon /></IconButton></Tooltip>
            <Tooltip title={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
              <IconButton aria-label="Toggle light and dark theme" onClick={onToggleMode} sx={{ bgcolor: 'action.hover' }}>{dark ? <LightModeIcon /> : <DarkModeIcon />}</IconButton>
            </Tooltip>
            <Avatar sx={{ width: 36, height: 36, fontSize: 12, fontWeight: 800, bgcolor: 'primary.main', boxShadow: '0 4px 12px rgba(99,91,255,.2)' }} aria-label="Signed in as HR Admin">HR</Avatar>
          </Toolbar>
        </AppBar>
        <Box component="main" id="main" tabIndex={-1} sx={{ maxWidth: 1720, mx: 'auto', p: { xs: 2, md: 3.5 }, display: 'grid', gap: 2.5 }}>{children}</Box>
      </Box>
    </Box>
  );
}
