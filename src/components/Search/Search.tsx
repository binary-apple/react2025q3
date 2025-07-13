import { Component, type ChangeEvent } from 'react';
import classes from './Search.module.css';

type SearchState = {
  searchString: string;
};

type SearchProps = {
  onSearch: (searchString: string) => void;
};

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const searchString = localStorage.getItem('searchString');
    this.state = { searchString: searchString ?? '' };
  }

  onInputChange(e: ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({ searchString: e.target.value });
    }
  }

  onClick() {
    this.props.onSearch(this.state.searchString);
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <input
          value={this.state.searchString}
          onChange={(e) => this.onInputChange(e)}
          placeholder="Search..."
        ></input>
        <button onClick={() => this.onClick()}>Search</button>
      </div>
    );
  }
}

export default Search;
