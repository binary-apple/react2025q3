import { useStats } from '@/contexts/stats-context';
import format from '@/utils/format';

function MainPage() {
  const { stats } = useStats();

  return (
    <main className="flex flex-col gap-2">
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
            </tr>
          </thead>
          <tbody className="divide-y divide-grey">
            {stats.map((v, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {v.countryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {v.iso_code ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {v.data[v.data.length - 1].year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {format(v.data[v.data.length - 1].population)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {format(v.data[v.data.length - 1].co2, 2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {format(v.data[v.data.length - 1].co2_per_capita, 2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default MainPage;
