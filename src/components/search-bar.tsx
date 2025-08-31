import type { ChangeEvent } from 'react';
import Button from '@components/button';
import { twMerge } from 'tailwind-merge';

type Props = {
  searchInput: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: VoidFunction;
};

function SearchBar({ searchInput, onChange, onClick }: Props) {
  return (
    <div className="flex gap-2">
      <input
        onChange={onChange}
        value={searchInput}
        placeholder="Enter country name..."
        className={twMerge(
          'cursor-pointer rounded-md border-2 font-bold',
          'border-primary bg-background px-3 py-2',
          'focus:border-primary-dark hover:border-primary-dark',
          'transition-all duration-500'
        )}
      ></input>
      <Button onClick={onClick}>Search</Button>
    </div>
  );
}

export default SearchBar;
