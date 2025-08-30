import { useStats } from '@/contexts/stats-context';
import type { OptionalColumns } from '@/types';
import format from '@/utils/format';
import { useState } from 'react';
import Portal from './portal';
import { OPTIONAL_COLUMNS } from '@/constants';
import YearSelector from './year-selector';

function MainPage() {
  const { stats } = useStats();
  const [selectedColumns, setSelectedColumns] = useState<Set<OptionalColumns>>(
    new Set()
  );
  // const [selectedYear, setSelectedYear] = useState(2023);

  return (
    <main className="flex flex-col gap-2">
      <div className="flex gap-2 justify-start">
        <Portal
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
        <YearSelector minYear={1750} maxYear={2023} onChange={() => {}} />
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
            {stats.map((v, i) => {
              const lastYearStats = v.data[v.data.length - 1];
              return (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {v.countryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {v.iso_code ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {lastYearStats.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {format(lastYearStats.population)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {format(lastYearStats.co2, 2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {format(lastYearStats.co2_per_capita, 2)}
                  </td>
                  {Array.from(selectedColumns).map((key) => (
                    <td
                      key={key}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    >
                      {format(lastYearStats[key], 2)}
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
