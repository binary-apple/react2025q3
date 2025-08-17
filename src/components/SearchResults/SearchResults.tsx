'use client';
import DetailsView from '@components/DetailsView';
import Loader from '@components/Loader';
import SearchItem, { type SearchItemProps } from '@components/SearchItem';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchResultsProps = {
  isLoading: boolean;
  isError: boolean;
  searchResults: unknown[];
};

function SearchResults(props: SearchResultsProps) {
  const t = useTranslations('MainPage');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onItemClick = (id: number) => {
    const params = new URLSearchParams(String(searchParams));
    params.set('details', String(id));
    router.replace(`${pathname}?${String(params)}`);
  };
  if (props.isError) {
    return <div>{t('errorMessage')}</div>;
  }
  if (props.isLoading) {
    return <Loader />;
  }
  if (props.searchResults.length === 0) {
    return <div>{t('emptyResult')}</div>;
  }
  return (
    <div className="flex gap-2.5">
      <div className="flex flex-col gap-2.5" data-testid="search-results">
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
      <div>
        <DetailsView />
      </div>
    </div>
  );
}

export default SearchResults;
