import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { removeAll } from '../../store/slices/selectedCharactersSlice';
import { saveToCsv } from '../../utils/arrayToCsv';
import Button from '@components/Button/Button';

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
