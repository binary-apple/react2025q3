import type { SortColumn, OptionalColumns, SortOrder } from '@/types';
import format from '@/utils/format';
import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import Portal from '@components/portal';
import { OPTIONAL_COLUMNS } from '@/constants';
import YearSelector from '@components/year-selector';
import { twMerge } from 'tailwind-merge';
import SearchBar from '@components/search-bar';
import SortSelector from './sort-selector';
import { statsReader } from '@/services/api';

// TODO: get years range from fetching api
const MIN_YEAR = 1750;
const MAX_YEAR = 2023;

function MainPage() {
  const stats = statsReader.read();
  const [selectedColumns, setSelectedColumns] = useState<Set<OptionalColumns>>(
    new Set()
  );
  const [selectedYear, setSelectedYear] = useState(MAX_YEAR);
  const [prevYear, setPrevYear] = useState(MAX_YEAR);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [sortColumn, setSortColumn] = useState<SortColumn>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('');

  const statsToDisplay = useMemo(() => {
    const base = stats ?? [];
    const filteredStats = base.filter((stat) =>
      stat.countryName.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    if (sortOrder === '' || sortColumn === '') {
      return filteredStats;
    }

    return filteredStats.sort((a, b) => {
      if (sortColumn === 'name') {
        return (
          a.countryName.localeCompare(b.countryName) *
          (sortOrder === 'asc' ? 1 : -1)
        );
      }

      if (sortColumn === 'population') {
        const aPopulation = a.yearMap.get(selectedYear)?.population;
        const bPopulation = b.yearMap.get(selectedYear)?.population;

        if (!aPopulation && !bPopulation) return 0;
        if (!aPopulation) return 1;
        if (!bPopulation) return -1;

        return (aPopulation - bPopulation) * (sortOrder === 'asc' ? 1 : -1);
      }

      return 0;
    });
  }, [stats, searchTerm, sortColumn, sortOrder, selectedYear]);

  const onYearChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setPrevYear(selectedYear);
      setSelectedYear(+e.target.value);
    },
    [selectedYear]
  );

  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, []);

  const onSortChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    const [newSortColumn, newSortOrder] = sortValue.split('_');

    setSortColumn((newSortColumn as SortColumn) ?? '');
    setSortOrder((newSortOrder as SortOrder) ?? '');
  }, []);

  const onSearchClick = useCallback(() => {
    setSearchTerm(searchInput);
  }, [searchInput]);

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
          onChange={onYearChange}
        />
        <SearchBar
          searchInput={searchInput}
          onClick={onSearchClick}
          onChange={onSearchChange}
        />
        <SortSelector
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onChange={onSortChange}
        />
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
            {statsToDisplay.map((v, i) => {
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
