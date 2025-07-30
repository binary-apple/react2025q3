import classes from './SearchItem.module.css';

export type SearchItemProps = {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  children?: string[];
  image: string;
  birthdate: string;
  index: number;
  onClick: () => void;
};

function SearchItem(props: SearchItemProps) {
  return (
    <div className={classes['search-item-wrapper']} onClick={props.onClick}>
      <img src={props.image} alt={props.fullName} className={classes.img}></img>
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
  );
}

export default SearchItem;
