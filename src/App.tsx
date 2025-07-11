import './App.css';
import { Component } from 'react';
import Search from './components/Search/Search';
import ErrorButton from './components/ErrorButton/ErrorButton';

class App extends Component {
  render() {
    return (
      <>
        <Search />
        <ErrorButton />
      </>
    );
  }
}

export default App;
