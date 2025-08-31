import { SORT_OPTIONS } from '@/constants';
import { twMerge } from 'tailwind-merge';

function SortSelector() {
  return (
    <select
      className={twMerge(
        'cursor-pointer rounded-md border-2 font-bold',
        'border-primary bg-background px-3 py-2',
        'focus:border-primary-dark hover:border-primary-dark',
        'transition-all duration-500'
      )}
    >
      {SORT_OPTIONS.map((option, index) => (
        <option key={index} value={`${option.column}_${option.order}`}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortSelector;
