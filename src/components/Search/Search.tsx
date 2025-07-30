import { type ChangeEvent } from 'react';
import classes from './Search.module.css';

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
    <div className={classes.wrapper}>
      <input
        value={props.searchString}
        onChange={(e) => onInputChange(e)}
        placeholder="Search..."
        data-testid="search-input"
      ></input>
      <button onClick={() => onClick()} data-testid="search-button">
        Search
      </button>
    </div>
  );
}

export default Search;
