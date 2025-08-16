'use client';

import Button from '@components/Button';
import { removeAll } from '@store/slices/selectedCharactersSlice';
import { type RootState } from '@store/store';
import { saveToCsv } from '@utils/arrayToCsv';
import { useSelector, useDispatch } from 'react-redux';

function Flayout() {
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
      <div>
        {`${selectedCount} item${selectedCount > 1 ? 's are' : ' is'} selected`}
      </div>
      <Button onClick={() => dispatch(removeAll())}>Unselect all</Button>
      <a {...saveToCsv(selectedItems)}>
        <Button>Download</Button>
      </a>
    </div>
  );
}

export default Flayout;
