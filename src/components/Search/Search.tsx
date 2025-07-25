import { useState, type ChangeEvent } from 'react';
import classes from './Search.module.css';

type SearchProps = {
  onSearch: (searchString: string) => void;
};

function Search(props: SearchProps) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem('searchString') ?? ''
  );

  function onInputChange(e: ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      setSearchString(e.target.value);
    }
  }

  function onClick() {
    props.onSearch(searchString);
  }

  return (
    <div className={classes.wrapper}>
      <input
        value={searchString}
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
