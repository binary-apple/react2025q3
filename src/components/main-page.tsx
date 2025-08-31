import { useStats } from '@/contexts/stats-context';
import type { OptionalColumns } from '@/types';
import format from '@/utils/format';
import { useEffect, useState, type ChangeEvent } from 'react';
import Portal from '@components/portal';
import { OPTIONAL_COLUMNS } from '@/constants';
import YearSelector from '@components/year-selector';
import { twMerge } from 'tailwind-merge';
import SearchBar from '@components/search-bar';
import SortSelector from './sort-selector';

// TODO: get years range from fetching api
const MIN_YEAR = 1750;
const MAX_YEAR = 2023;

function MainPage() {
  const { stats } = useStats();
  const [filteredStats, setFilteredStats] = useState(stats);
  const [selectedColumns, setSelectedColumns] = useState<Set<OptionalColumns>>(
    new Set()
  );
  const [selectedYear, setSelectedYear] = useState(MAX_YEAR);
  const [prevYear, setPrevYear] = useState(MAX_YEAR);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onSearchClick();
  }, [stats]);

  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPrevYear(selectedYear);
    setSelectedYear(+e.target.value);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSearchClick = () => {
    if (stats === null) {
      return;
    }
    setFilteredStats(
      stats.filter((stat) =>
        stat.countryName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <main className="flex flex-col gap-2">
      <div className="flex gap-2 justify-start">
        <Portal
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
        <YearSelector
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
          selectedYear={selectedYear}
          onChange={(e) => {
            onYearChange(e);
          }}
        />
        <SearchBar
          searchTerm={searchTerm}
          onClick={onSearchClick}
          onChange={onSearchChange}
        />
        <SortSelector />
      </div>
      {stats && (
        <table className="min-w-full divide-y-2 divide-primary-dark">
          <thead>
            <tr>
              <th className="px-6 py-3 text-start text-lg font-medium">
                Country/Region
              </th>
              <th className="px-6 py-3 text-start text-lg font-medium">ISO</th>
              <th className="px-6 py-3 text-start text-lg font-medium">Year</th>
              <th className="px-6 py-3 text-start text-lg font-medium">
                Population
              </th>
              <th className="px-6 py-3 text-start text-lg font-medium">CO2</th>
              <th className="px-6 py-3 text-start text-lg font-medium">
                CO2 per capita
              </th>
              {Array.from(selectedColumns).map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-start text-lg font-medium"
                >
                  {OPTIONAL_COLUMNS[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-grey">
            {(filteredStats ?? []).map((v, i) => {
              const selectedYearStats = v.yearMap.get(selectedYear);
              const prevYearStats = v.yearMap.get(prevYear);
              return (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {v.countryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {v.iso_code ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {selectedYear}
                  </td>
                  <td
                    className={twMerge(
                      'px-6 py-4 whitespace-nowrap text-sm font-medium',
                      selectedYearStats?.population !==
                        prevYearStats?.population
                        ? 'text-shadow-lg text-shadow-primary-dark'
                        : ''
                    )}
                  >
                    {format(selectedYearStats?.population)}
                  </td>
                  <td
                    className={twMerge(
                      'px-6 py-4 whitespace-nowrap text-sm font-medium',
                      format(selectedYearStats?.co2, 2) !==
                        format(prevYearStats?.co2, 2)
                        ? 'text-shadow-lg text-shadow-primary-dark'
                        : ''
                    )}
                  >
                    {format(selectedYearStats?.co2, 2)}
                  </td>
                  <td
                    className={twMerge(
                      'px-6 py-4 whitespace-nowrap text-sm font-medium',
                      format(selectedYearStats?.co2_per_capita, 2) !==
                        format(prevYearStats?.co2_per_capita, 2)
                        ? 'text-shadow-lg text-shadow-primary-dark'
                        : ''
                    )}
                  >
                    {format(selectedYearStats?.co2_per_capita, 2)}
                  </td>
                  {Array.from(selectedColumns).map((key) => (
                    <td
                      key={key}
                      className={twMerge(
                        'px-6 py-4 whitespace-nowrap text-sm font-medium',
                        format(selectedYearStats?.[key], 2) !==
                          format(prevYearStats?.[key], 2)
                          ? 'text-shadow-lg text-shadow-primary-dark'
                          : ''
                      )}
                    >
                      {format(selectedYearStats?.[key], 2)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default MainPage;
