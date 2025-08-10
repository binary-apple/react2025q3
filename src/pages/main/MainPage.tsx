import { useState } from 'react';
import Search from '@components/Search';
import SearchResults from '@components/SearchResults';
import useLocalStorage from '@hooks/useLocalStorage';
import Pagination from '@components/Pagination';
import { useSearchParams } from 'react-router';
import { useGetCharactersQuery } from '@services/potterApi';

type AppState = {
  searchString: string;
  currentPage: number;
};

function MainPage() {
  const [searchString, setSearchString] = useLocalStorage('searchString');
  const [searchParams, setSearchParams] = useSearchParams();
  const [appState, setAppState] = useState<AppState>({
    searchString: searchString,
    currentPage: Number(searchParams.get('page')) || 1,
  });

  const { isFetching, isError, data } = useGetCharactersQuery(
    {
      searchString: appState.searchString,
      currentPage: appState.currentPage,
    },
    {
      skip: searchString !== appState.searchString,
    }
  );

  const setSearchStringToState = (searchString: string): void => {
    setAppState({ ...appState, searchString });
  };

  async function onSearch() {
    try {
      if (appState.searchString !== searchString || appState.currentPage > 1) {
        setSearchParams({});
        setAppState((a) => ({ ...a, currentPage: 1 }));
      }
      setSearchString(appState.searchString);
    } catch {
      try {
        setAppState((a) => ({ ...a, isLoading: false, isError: true }));
      } catch {
        //
      }
    }
  }

  async function onNewPage(newPage: number) {
    setAppState((a) => ({ ...a, currentPage: newPage }));
    setSearchParams({ page: String(newPage) });
  }

  return (
    <div className="wrapper">
      <Search
        onSearch={() => onSearch()}
        searchString={appState.searchString}
        setSearchString={setSearchStringToState}
      />
      <Pagination
        currentPage={appState.currentPage}
        hasMorePages={data ? data.hasMorePages : false}
        onButtonClick={(newPage) => onNewPage(newPage)}
      />
      <SearchResults
        isError={isError}
        isLoading={isFetching}
        searchResults={data ? data.searchResults : []}
      />
    </div>
  );
}

export default MainPage;
