import { type ChangeEvent } from 'react';
// import classes from './Search.module.css';
import Button from '@components/Button';

type SearchProps = {
  onSearch: () => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
};

function Search(props: SearchProps) {
  function onInputChange(e: ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      props.setSearchString(e.target.value);
    }
  }

  function onClick() {
    props.onSearch();
  }

  return (
    <div className="flex gap-2.5">
      <input
        value={props.searchString}
        onChange={(e) => onInputChange(e)}
        placeholder="Search..."
        data-testid="search-input"
      ></input>
      <Button onClick={() => onClick()} data-testid="search-button">
        Search
      </Button>
    </div>
  );
}

export default Search;
