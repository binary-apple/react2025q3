import type { CountryEmissionStats } from '@/types';
import { createContext, useContext } from 'react';

export const StatsContext = createContext<{
  stats: CountryEmissionStats[] | null;
}>({
  stats: null,
});

export const useStats = () => useContext(StatsContext);
