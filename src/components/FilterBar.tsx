import { Button, MenuItem, Paper, TextField } from '@mui/material';
import { DEPARTMENTS, LOCATIONS, STATUSES, type Filters } from '../types';

interface Props { value: Filters; onChange: (f: Filters) => void; onReset: () => void }

export default function FilterBar({ value, onChange, onReset }: Props) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...value, [k]: v });
  const select = (label: string, key: 'department' | 'location' | 'status', options: readonly string[]) => (
    <TextField select size="small" label={label} value={value[key]} onChange={(e) => set(key, e.target.value as never)}>
      <MenuItem value="All">All</MenuItem>
      {options.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
    </TextField>
  );
  return (
    <Paper component="form" role="search" aria-label="Dashboard filters" onSubmit={(e) => e.preventDefault()}
      sx={{ p: 2, borderRadius: 3, display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(5,1fr) auto' }, alignItems: 'center' }}>
      <TextField size="small" type="date" label="From" value={value.from} slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: value.to } }} onChange={(e) => set('from', e.target.value)} />
      <TextField size="small" type="date" label="To" value={value.to} slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: value.from } }} onChange={(e) => set('to', e.target.value)} />
      {select('Department', 'department', DEPARTMENTS)}
      {select('Location', 'location', LOCATIONS)}
      {select('Status', 'status', STATUSES)}
      <Button onClick={onReset}>Reset</Button>
    </Paper>
  );
}
