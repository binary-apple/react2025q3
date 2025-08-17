import type { Character } from '@custom-types/character';
import type { RootState } from '@store/store';

import { add, remove } from '@store/slices/selectedCharactersSlice';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

export type SearchItemProps = Character & { onClick: VoidFunction };

const imageStyle = {
  borderRadius: '10px',
};

function SearchItem({ onClick, ...props }: SearchItemProps) {
  const t = useTranslations('MainPage');
  const isSelected = useSelector((state: RootState) =>
    state.selectedCharacters.value.some((value) => value.index === props.index)
  );
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2.5">
      <input
        type="checkbox"
        checked={isSelected}
        className="h-fit scale-150 self-center"
        onChange={() => {
          dispatch(isSelected ? remove(props.index) : add(props));
        }}
      ></input>
      <div className="flex gap-2.5" onClick={onClick}>
        <Image
          src={props.image}
          width={105}
          height={150}
          alt={props.fullName}
          style={imageStyle}
        />
        <div className="flex flex-col items-start text-left">
          <div className="text-primary pr-1 text-lg font-black">
            {props.fullName}
          </div>
          <div>
            <b>{t('birthday')}:</b> {props.birthdate}
          </div>
          <div>
            <b>{t('house')}:</b> {props.hogwartsHouse}
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
