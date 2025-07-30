import { Outlet, useSearchParams } from 'react-router';
import Loader from '@components/Loader';
import SearchItem, { type SearchItemProps } from '@components/SearchItem';
import classes from './SearchResults.module.css';
import { useEffect, useState } from 'react';

type SearchResultsProps = {
  isLoading: boolean;
  isError: boolean;
  searchResults: unknown[];
};

function SearchResults(props: SearchResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsParam = searchParams.get('details');
  const [selectedId, setSelectedId] = useState<number | null>(
    detailsParam ? +detailsParam : null
  );
  const onItemClick = (id: number) => {
    setSelectedId(id);
  };
  useEffect(() => {
    const detailParam = searchParams.get('details');
    setSelectedId(detailParam ? +detailParam : null);
  }, [searchParams]);
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedId === null) {
      newParams.delete('details');
    } else {
      newParams.set('details', String(selectedId));
    }
    setSearchParams(newParams);
  }, [selectedId]);
  if (props.isError) {
    return <div>There was an error. Try again</div>;
  }
  if (props.isLoading) {
    return <Loader />;
  }
  if (props.searchResults.length === 0) {
    return <div>Nothing was found</div>;
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes['results-wrapper']} data-testid="search-results">
        {props.searchResults.map((searchItem: unknown, id: number) => {
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
              onClick={() => onItemClick(searchItemProps.index)}
            />
          );
        })}
      </div>
      <Outlet context={[selectedId, setSelectedId]} />
    </div>
  );
}

export default SearchResults;
