import './App.css';
import { Component } from 'react';
import Search from './components/Search/Search';
import ErrorButton from './components/ErrorButton/ErrorButton';
import SearchResults from './components/SearchResults/SearchResults';

class App extends Component {
  render() {
    return (
      <>
        <Search />
        <SearchResults />
        <ErrorButton />
      </>
    );
  }
}

export default App;
