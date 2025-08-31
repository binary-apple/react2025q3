import type { OptionalColumns } from '@/types';

export const OPTIONAL_COLUMNS: Record<OptionalColumns, string> = {
  methane: 'Methane',
  oil_co2: 'Oil CO2',
  temperature_change_from_co2: 'Temperature change from CO2',
};

export const SORT_OPTIONS = [
  { column: '', order: '', label: 'Default sort' },
  { column: 'name', order: 'asc', label: 'Name ↑' },
  { column: 'name', order: 'desc', label: 'Name ↓' },
  { column: 'population', order: 'asc', label: 'Population ↑' },
  { column: 'population', order: 'desc', label: 'Population ↓' },
] as const;
