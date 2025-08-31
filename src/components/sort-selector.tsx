import { SORT_OPTIONS } from '@/constants';
import type { SortColumn, SortOrder } from '@/types';
import type { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  sortColumn: SortColumn;
  sortOrder: SortOrder;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function SortSelector({ sortColumn, sortOrder, onChange }: Props) {
  return (
    <select
      className={twMerge(
        'cursor-pointer rounded-md border-2 font-bold',
        'border-primary bg-background px-3 py-2',
        'focus:border-primary-dark hover:border-primary-dark',
        'transition-all duration-500'
      )}
      onChange={onChange}
      value={`${sortColumn}_${sortOrder}`}
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
