import type {
  CountryEmissionStats,
  GlobalEmissionStats,
  YearEmissionStats,
} from '@/types';

const URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export const getData: () => Promise<
  (CountryEmissionStats & { yearMap: Map<number, YearEmissionStats> })[]
> = async () => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const raw = (await response.json()) as GlobalEmissionStats;

  const result = Object.entries(raw).map(([name, stats]) => {
    const yearMap = new Map<number, YearEmissionStats>();
    stats.data.forEach((yearStats) => {
      yearMap.set(yearStats.year, yearStats);
    });
    return {
      countryName: name,
      iso_code: stats.iso_code,
      data: stats.data,
      yearMap,
    };
  });

  return result;
};
