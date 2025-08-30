import type { CountryEmissionStats, GlobalEmissionStats } from '@/types';

const URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export const getData: () => Promise<CountryEmissionStats[]> = async () => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const raw = (await response.json()) as GlobalEmissionStats;

  return Object.entries(raw).map(([name, stats]) => ({
    countryName: name,
    iso_code: stats.iso_code,
    data: stats.data,
  }));
};
