'use client';

import Button from '@components/Button';
import Pagination from '@components/Pagination';
import Search from '@components/Search';
import SearchResults from '@components/SearchResults';
import { REFETCH_INTERVAL_SECONDS } from '@constants/index';
import useLocalStorage from '@hooks/useLocalStorage';
import { potterApi, useGetCharactersQuery } from '@services/potterApi';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type AppState = {
  searchString: string;
  currentPage: number;
};

function MainPage() {
  const t = useTranslations('MainPage');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchString, setSearchString] = useLocalStorage('searchString');
  const [appState, setAppState] = useState<AppState>({
    searchString: searchString || '',
    currentPage: +(searchParams?.get('page') ?? 1),
  });

  const { isFetching, isError, data } = useGetCharactersQuery(
    {
      searchString: appState.searchString,
      currentPage: appState.currentPage,
    },
    {
      refetchOnMountOrArgChange: REFETCH_INTERVAL_SECONDS,
      skip: searchString !== appState.searchString,
    }
  );

  useEffect(() => {
    onSearch();
  }, []);

  const dispatch = useDispatch();

  const setSearchStringToState = (searchString: string): void => {
    setAppState({ ...appState, searchString });
  };

  async function onSearch() {
    try {
      if (appState.searchString !== searchString || appState.currentPage > 1) {
        router.replace(pathname ?? '');
        setAppState((prevState) => ({ ...prevState, currentPage: 1 }));
      }
      setSearchString(appState.searchString);
    } catch {
      //
    }
  }

  async function onNewPage(newPage: number) {
    setAppState((a) => ({ ...a, currentPage: newPage }));
    const params = new URLSearchParams({});
    params.set('page', String(newPage));
    router.replace(`${pathname}?${params}`);
  }

  return (
    <div className="m-2.5 mx-auto flex flex-grow flex-col items-center gap-2.5 self-baseline">
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
        {t('refreshCacheButton')}
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
