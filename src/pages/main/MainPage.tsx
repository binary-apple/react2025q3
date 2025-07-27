import { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import SearchResults from '../../components/SearchResults/SearchResults';
import { getResponse } from '../../api/api';
import useLocalStorage from '../../hooks/useLocalStorage';
import Pagination from '../../components/Pagination/Pagination';

type AppState = {
  isLoading: boolean;
  isError: boolean;
  searchString: string;
  searchResults: unknown[];
  currentPage: number;
  hasMorePages: boolean;
};

function MainPage() {
  const [searchString, setSearchString] = useLocalStorage('searchString');
  const [appState, setAppState] = useState<AppState>({
    isLoading: false,
    isError: false,
    searchString: searchString,
    searchResults: [],
    currentPage: 1,
    hasMorePages: false,
  });

  const setSearchStringToState = (searchString: string): void => {
    setAppState({ ...appState, searchString });
  };

  async function onSearch() {
    try {
      setAppState({ ...appState, isLoading: true });
      setSearchString(appState.searchString);
      let response = await getResponse(
        appState.searchString,
        appState.currentPage
      );
      const results = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      response = await getResponse(
        appState.searchString,
        appState.currentPage + 1
      );

      if (!response.ok && response.status !== 404) {
        throw new Error();
      }
      setAppState({
        ...appState,
        searchResults: results,
        isLoading: false,
        hasMorePages: response.status !== 404,
      });
    } catch {
      setAppState({ ...appState, isLoading: false, isError: true });
    }
  }

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <div className="wrapper">
      <Search
        onSearch={() => onSearch()}
        searchString={appState.searchString}
        setSearchString={setSearchStringToState}
      />
      <Pagination
        currentPage={appState.currentPage}
        hasMorePages={appState.hasMorePages}
      />
      <SearchResults
        isError={appState.isError}
        isLoading={appState.isLoading}
        searchResults={appState.searchResults}
      />
    </div>
  );
}

export default MainPage;
