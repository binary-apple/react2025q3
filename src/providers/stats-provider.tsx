import { StatsContext } from '@/contexts/stats-context';
import { getData } from '@/services/api';
import type { CountryEmissionStats, YearEmissionStats } from '@/types';
import { useEffect, useState, type PropsWithChildren } from 'react';

export const StatsProvider = ({ children }: PropsWithChildren) => {
  const [stats, setStats] = useState<
    | (CountryEmissionStats & { yearMap: Map<number, YearEmissionStats> })[]
    | null
  >(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getData();
        setStats(data);
      } catch {
        //
      }
    }

    load();
  }, []);

  return (
    <StatsContext.Provider value={{ stats }}>{children}</StatsContext.Provider>
  );
};
