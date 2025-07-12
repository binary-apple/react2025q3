import { Component } from 'react';
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
};

class SearchItem extends Component<SearchItemProps, object> {
  render() {
    return (
      <div className={classes['search-item-wrapper']}>
        <div>{this.props.fullName}</div>
        <div>
          <img src={this.props.image} alt={this.props.fullName}></img>
          <div>
            <b>Birthday:</b> {this.props.birthdate}
          </div>
          <div>
            <b>Hogwarts house:</b> {this.props.hogwartsHouse}
          </div>
          {/* <div>
            <b>Children:</b>{' '}
            {this.props.children?.length === 0
              ? '-'
              : this.props.children?.join(', ')}
          </div> */}
        </div>
      </div>
    );
  }
}

export default SearchItem;
