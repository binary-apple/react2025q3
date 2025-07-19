import { Component } from 'react';
import classes from './Loader.module.css';

class Loader extends Component {
  render() {
    return <div className={classes.loader} data-testid="loader"></div>;
  }
}

export default Loader;
