export type YearEmissionStats = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
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
