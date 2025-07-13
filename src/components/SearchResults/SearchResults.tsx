import { Component } from 'react';
import Loader from '../Loader/Loader';
import SearchItem, { type SearchItemProps } from '../SearchItem/SearchItem';
import classes from './SearchResults.module.css';

type SearchResultsState = {
  isLoading: boolean;
  isError: boolean;
  searchResults: unknown[];
};

class SearchResults extends Component<object, SearchResultsState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      searchResults: [],
    };
  }
  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    const response = await fetch(
      'https://potterapi-fedeperin.vercel.app/en/characters',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const results = await response.json();

    if (response.ok) {
      this.setState({ searchResults: results, isLoading: false });
    } else {
      this.setState({ isLoading: false, isError: true });
    }
  }

  render() {
    return (
      <div className={classes.wrapper}>
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading &&
          this.state.searchResults.map((searchItem: unknown, id: number) => {
            const searchItemProps = searchItem as SearchItemProps;
            return (
              <SearchItem
                key={id}
                fullName={searchItemProps.fullName}
                nickname={searchItemProps.nickname}
                hogwartsHouse={searchItemProps.hogwartsHouse}
                interpretedBy={searchItemProps.interpretedBy}
                // children={searchItemProps.children}
                image={searchItemProps.image}
                birthdate={searchItemProps.birthdate}
                index={searchItemProps.index}
              />
            );
          })}
      </div>
    );
  }
}

export default SearchResults;
