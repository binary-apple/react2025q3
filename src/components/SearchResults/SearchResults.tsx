import { Component } from 'react';
import Loader from '../Loader/Loader';
import SearchItem, { type SearchItemProps } from '../SearchItem/SearchItem';
import classes from './SearchResults.module.css';

type SearchResultsProps = {
  isLoading: boolean;
  isError: boolean;
  searchResults: unknown[];
};

class SearchResults extends Component<SearchResultsProps, object> {
  render() {
    return (
      <div className={classes.wrapper}>
        {this.props.isLoading && <Loader />}
        {!this.props.isLoading && this.props.searchResults.length === 0 && (
          <div>Nothing was found</div>
        )}
        {!this.props.isLoading &&
          this.props.searchResults.map((searchItem: unknown, id: number) => {
            const searchItemProps = searchItem as SearchItemProps;
            return (
              <SearchItem
                key={id}
                fullName={searchItemProps.fullName}
                nickname={searchItemProps.nickname}
                hogwartsHouse={searchItemProps.hogwartsHouse}
                interpretedBy={searchItemProps.interpretedBy}
                // TODO: pass character's children
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
