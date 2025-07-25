import './App.css';
import { useEffect, useState } from 'react';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { getResponse } from './api/api';

type AppState = {
  isLoading: boolean;
  isError: boolean;
  searchString: string;
  searchResults: unknown[];
};

function App() {
  const [appState, setAppState] = useState<AppState>({
    isLoading: false,
    isError: false,
    searchString: localStorage.getItem('searchString') ?? '',
    searchResults: [],
  });

  async function onSearch(searchString: string) {
    try {
      setAppState({ ...appState, isLoading: true });
      localStorage.setItem('searchString', searchString);
      const response = await getResponse(searchString);
      const results = await response.json();

      if (response.ok) {
        setAppState({ ...appState, searchResults: results, isLoading: false });
      } else {
        setAppState({ ...appState, isLoading: false, isError: true });
      }
    } catch {
      setAppState({ ...appState, isLoading: false, isError: true });
    }
  }

  useEffect(() => {
    onSearch(appState.searchString);
  }, [appState.searchString]);

  return (
    <ErrorBoundary>
      <div className="wrapper">
        <Search onSearch={(searchString) => onSearch(searchString)} />
        <SearchResults
          isError={appState.isError}
          isLoading={appState.isLoading}
          searchResults={appState.searchResults}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
