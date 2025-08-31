import type { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  minYear: number;
  maxYear: number;
  selectedYear: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function YearSelector({ minYear, maxYear, selectedYear, onChange }: Props) {
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => i + minYear
  ).reverse();
  return (
    <select
      value={selectedYear}
      onChange={onChange}
      className={twMerge(
        'cursor-pointer rounded-md border-2 font-bold',
        'border-primary bg-background px-3 py-2',
        'focus:border-primary-dark hover:border-primary-dark',
        'transition-all duration-500'
      )}
    >
      {years.map((year) => (
        <option key={year} value={year} className="font-medium">
          {year}
        </option>
      ))}
    </select>
  );
}

export default YearSelector;
