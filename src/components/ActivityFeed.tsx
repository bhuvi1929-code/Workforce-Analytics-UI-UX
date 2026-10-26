import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import type { ActivityItem } from '../types';

const ago = (m: number) => (m < 60 ? `${m} min ago` : m < 1440 ? `${Math.floor(m / 60)} h ago` : `${Math.floor(m / 1440)} d ago`);
const initials = (n: string) => n.split(' ').map((p) => p[0]).join('');

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Paper component="section" aria-label="Recent employee activity" sx={{ p: 2.5, borderRadius: 3 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 1.5, fontSize: 14 }}>Recent activity</Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3 }}>No recent activity for the selected employees.</Typography>
      ) : (
        <List disablePadding>
          {items.map((a) => (
            <ListItem key={a.id} disableGutters divider>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', width: 38, height: 38, fontSize: 12, fontWeight: 800 }}>{initials(a.name)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${a.name}: ${a.action}`} secondary={`${a.department}, ${ago(a.minutesAgo)}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
