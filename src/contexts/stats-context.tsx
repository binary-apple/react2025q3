import type { CountryEmissionStats, YearEmissionStats } from '@/types';
import { createContext, useContext } from 'react';

export const StatsContext = createContext<{
  stats:
    | (CountryEmissionStats & { yearMap: Map<number, YearEmissionStats> })[]
    | null;
}>({
  stats: null,
});

export const useStats = () => useContext(StatsContext);
