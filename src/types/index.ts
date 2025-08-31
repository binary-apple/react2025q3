import type { SORT_OPTIONS } from '@/constants';

export type YearEmissionStats = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  [key: string]: number | string | undefined;
};

export type CountryEmissionStats = {
  countryName: string;
  iso_code?: string;
  data: YearEmissionStats[];
};

export type GlobalEmissionStats = Record<
  string,
  Omit<CountryEmissionStats, 'name'>
>;

export type OptionalColumns =
  | 'methane'
  | 'oil_co2'
  | 'temperature_change_from_co2';

export type SortOrder = (typeof SORT_OPTIONS)[number]['order'];
export type SortColumn = (typeof SORT_OPTIONS)[number]['column'];
