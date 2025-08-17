import Button from '@components/Button';
import { useTranslations } from 'next-intl';
import { type ChangeEvent } from 'react';

type SearchProps = {
  onSearch: () => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
};

function Search(props: SearchProps) {
  const t = useTranslations('MainPage');

  function onInputChange(e: ChangeEvent) {
    if (e.target instanceof HTMLInputElement) {
      props.setSearchString(e.target.value);
    }
  }

  function onClick() {
    props.onSearch();
  }

  return (
    <div className="flex gap-2.5">
      <input
        value={props.searchString}
        onChange={(e) => onInputChange(e)}
        placeholder={t('inputPlaceholder')}
        data-testid="search-input"
      ></input>
      <Button onClick={() => onClick()} data-testid="search-button">
        {t('searchButton')}
      </Button>
    </div>
  );
}

export default Search;
