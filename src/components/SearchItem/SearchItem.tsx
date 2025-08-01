import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { add, remove } from '../../store/slices/selectedCharactersSlice';
import classes from './SearchItem.module.css';
import type { Character } from '@custom-types/character';

export type SearchItemProps = Character & { onClick: VoidFunction };

function SearchItem(props: SearchItemProps) {
  const isSelected = useSelector((state: RootState) =>
    state.selectedCharacters.value.includes(props.index)
  );
  const dispatch = useDispatch();

  return (
    <div className={classes['search-item-wrapper']}>
      <input
        type="checkbox"
        checked={isSelected}
        className={classes.checkbox}
        onChange={() => {
          dispatch(isSelected ? remove(props.index) : add(props.index));
        }}
      ></input>
      <div className={classes['details-wrapper']} onClick={props.onClick}>
        <img
          src={props.image}
          alt={props.fullName}
          className={classes.img}
        ></img>
        <div className={classes.details}>
          <div className={classes.name}>{props.fullName}</div>
          <div>
            <b>Birthday:</b> {props.birthdate}
          </div>
          <div>
            <b>Hogwarts house:</b> {props.hogwartsHouse}
          </div>
          {
            // TODO: display character's children
          }
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
