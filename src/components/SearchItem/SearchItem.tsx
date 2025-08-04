import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { add, remove } from '../../store/slices/selectedCharactersSlice';
import type { Character } from '@custom-types/character';

export type SearchItemProps = Character & { onClick: VoidFunction };

function SearchItem({ onClick, ...props }: SearchItemProps) {
  const isSelected = useSelector((state: RootState) =>
    state.selectedCharacters.value.some((value) => value.index === props.index)
  );
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2.5">
      <input
        type="checkbox"
        checked={isSelected}
        className="h-fit self-center scale-150"
        onChange={() => {
          dispatch(isSelected ? remove(props.index) : add(props));
        }}
      ></input>
      <div className="flex gap-2.5" onClick={onClick}>
        <img
          src={props.image}
          alt={props.fullName}
          className="block h-[150px] w-[105px] rounded-[10px]"
        ></img>
        <div className="text-left flex flex-col items-start">
          <div className="pr-1 font-black text-lg text-primary">
            {props.fullName}
          </div>
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
