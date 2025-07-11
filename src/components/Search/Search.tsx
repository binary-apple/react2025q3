import { Component } from 'react';
import classes from './Search.module.css';

class Search extends Component {
  render() {
    return (
      <div className={classes.wrapper}>
        <input placeholder="Search..."></input>
        <button>Search</button>
      </div>
    );
  }
}

export default Search;
