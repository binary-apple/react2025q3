'use client';

import Button from '@components/Button';
import { removeAll } from '@store/slices/selectedCharactersSlice';
import { type RootState } from '@store/store';
import { saveToCsv } from '@utils/arrayToCsv';
import { useTranslations } from 'next-intl';
import { useSelector, useDispatch } from 'react-redux';

function Flyout() {
  const t = useTranslations('Layout');
  const selectedItems = useSelector(
    (state: RootState) => state.selectedCharacters.value
  );
  const selectedCount = selectedItems.length;
  const dispatch = useDispatch();
  if (selectedCount === 0) {
    return null;
  }
  return (
    <div className="flex gap-3 py-3">
      <div>{`${selectedCount} ${t('selectedItems')}`}</div>
      <Button onClick={() => dispatch(removeAll())}>
        {t('unselectAllButton')}
      </Button>
      <a {...saveToCsv(selectedItems)}>
        <Button>{t('downloadButton')}</Button>
      </a>
    </div>
  );
}

export default Flyout;
