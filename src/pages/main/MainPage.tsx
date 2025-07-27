import { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import SearchResults from '../../components/SearchResults/SearchResults';
import { getResponse } from '../../api/api';
import useLocalStorage from '../../hooks/useLocalStorage';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [appState, setAppState] = useState<AppState>({
    isLoading: false,
    isError: false,
    searchString: searchString,
    searchResults: [],
    currentPage: Number(searchParams.get('page')) || 1,
    hasMorePages: false,
  });

  const setSearchStringToState = (searchString: string): void => {
    setAppState({ ...appState, searchString });
  };

  async function onSearch(ss: string, cp: number) {
    try {
      setAppState((a) => ({ ...a, isError: false }));
      if (ss !== searchString) {
        setSearchParams({});
        setAppState((a) => ({ ...a, currentPage: 1 }));
        cp = 1;
      }
      setAppState((a) => ({ ...a, isLoading: true }));
      setSearchString(appState.searchString);
      let response = await getResponse(ss, cp);
      let results = await response.json();
      if (response.status === 404) {
        results = [];
      }
      if (!response.ok && response.status !== 404) {
        throw new Error();
      }
      response = await getResponse(ss, cp + 1);

      if (!response.ok && response.status !== 404) {
        throw new Error();
      }
      setAppState((a) => ({
        ...a,
        searchResults: results,
        isLoading: false,
        hasMorePages: response.status !== 404,
      }));
    } catch {
      try {
        setAppState((a) => ({ ...a, isLoading: false, isError: true }));
      } catch {
        //
      }
    }
  }

  async function onSearchString() {
    onSearch(appState.searchString, appState.currentPage);
  }

  async function onNewPage(newPage: number) {
    setAppState((a) => ({ ...a, currentPage: newPage }));
    setSearchParams({ page: String(newPage) });
    onSearch(appState.searchString, newPage);
  }

  useEffect(() => {
    onSearch(appState.searchString, appState.currentPage);
  }, []);

  return (
    <div className="wrapper">
      <Search
        onSearch={() => onSearchString()}
        searchString={appState.searchString}
        setSearchString={setSearchStringToState}
      />
      <Pagination
        currentPage={appState.currentPage}
        hasMorePages={appState.hasMorePages}
        onButtonClick={(newPage) => onNewPage(newPage)}
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
