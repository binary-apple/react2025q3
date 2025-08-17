import Button from '@components/Button';
import Pagination from '@components/Pagination';
import Search from '@components/Search';
import SearchResults from '@components/SearchResults';
import { REFETCH_INTERVAL_SECONDS } from '@constants/index';
// import useLocalStorage from '@hooks/useLocalStorage';
import { potterApi, useGetCharactersQuery } from '@services/potterApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useSearchParams } from 'react-router';

type AppState = {
  searchString: string;
  currentPage: number;
};

function MainPage() {
  // const [searchString, setSearchString] = useLocalStorage('searchString');
  // const [searchParams, setSearchParams] = useSearchParams();
  const [appState, setAppState] = useState<AppState>({
    searchString: /* searchString */ '',
    currentPage: /* Number(searchParams.get('page')) || */ 1,
  });

  const { isFetching, isError, data } = useGetCharactersQuery(
    {
      searchString: appState.searchString,
      currentPage: appState.currentPage,
    },
    {
      refetchOnMountOrArgChange: REFETCH_INTERVAL_SECONDS,
      // skip: searchString !== appState.searchString,
    }
  );

  const dispatch = useDispatch();

  const setSearchStringToState = (searchString: string): void => {
    setAppState({ ...appState, searchString });
  };

  async function onSearch() {
    try {
      if (
        /* appState.searchString !== searchString || */ appState.currentPage > 1
      ) {
        // setSearchParams({});
        setAppState((prevState) => ({ ...prevState, currentPage: 1 }));
      }
      // setSearchString(appState.searchString);
    } catch {
      //
    }
  }

  async function onNewPage(newPage: number) {
    setAppState((a) => ({ ...a, currentPage: newPage }));
    // setSearchParams({ page: String(newPage) });
  }

  return (
    <div className="wrapper">
      <Search
        onSearch={() => onSearch()}
        searchString={appState.searchString}
        setSearchString={setSearchStringToState}
      />
      <Button
        onClick={() => {
          dispatch(potterApi.util.resetApiState());
        }}
      >
        Refresh cache
      </Button>
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
