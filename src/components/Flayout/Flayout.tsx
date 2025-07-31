import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { removeAll } from '../../store/slices/selectedCharactersSlice';
import classes from './Flayout.module.css';

function Flayout() {
  const selectedCount = useSelector(
    (state: RootState) => state.selectedCharacters.value.length
  );
  const dispatch = useDispatch();
  if (selectedCount === 0) {
    return null;
  }
  return (
    <div className={classes.wrapper}>
      <div>
        {`${selectedCount} item${selectedCount > 1 ? 's are' : ' is'} selected`}
      </div>
      <button onClick={() => dispatch(removeAll())}>Unselect all</button>
      <button>Download</button>
    </div>
  );
}

export default Flayout;
