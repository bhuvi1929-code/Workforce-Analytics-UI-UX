import { Alert, Button, Box, Skeleton, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export function LoadingState() {
  return (
    <Box role="status" aria-busy="true" aria-label="Loading dashboard" sx={{ display: 'grid', gap: 2 }}>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(5,1fr)' } }}>
        {Array.from({ length: 5 }, (_, i) => <Skeleton key={i} variant="rounded" height={104} />)}
      </Box>
      <Skeleton variant="rounded" height={320} />
      <Skeleton variant="rounded" height={280} />
    </Box>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Alert severity="error" action={<Button color="inherit" size="small" onClick={onRetry}>Retry</Button>}>
      We couldn’t load workforce data. Check your connection and try again.
    </Alert>
  );
}

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
      <SearchOffIcon color="disabled" sx={{ fontSize: 48 }} />
      <Typography variant="h6" sx={{ mt: 1 }}>No employees match these filters</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>Widen the date range or clear a filter to see results.</Typography>
      <Button variant="contained" onClick={onReset}>Reset filters</Button>
    </Box>
  );
}
