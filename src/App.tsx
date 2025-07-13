import './App.css';
import { Component } from 'react';
import Search from './components/Search/Search';
import ErrorButton from './components/ErrorButton/ErrorButton';
import SearchResults from './components/SearchResults/SearchResults';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="wrapper">
          <Search />
          <ErrorButton />
          <SearchResults />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
