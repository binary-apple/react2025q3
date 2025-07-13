import './App.css';
import { Component } from 'react';
import Search from './components/Search/Search';
import ErrorButton from './components/ErrorButton/ErrorButton';
import SearchResults from './components/SearchResults/SearchResults';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { getResponse } from './api/api';

type AppState = {
  isLoading: boolean;
  isError: boolean;
  searchString: string;
  searchResults: unknown[];
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      searchString: '',
      searchResults: [],
    };
  }

  componentDidMount(): void {
    this.onSearch(this.state.searchString);
  }

  async onSearch(searchString: string) {
    this.setState({ isLoading: true });
    const response = await getResponse(searchString);
    const results = await response.json();

    if (response.ok) {
      this.setState({ searchResults: results, isLoading: false });
    } else {
      this.setState({ isLoading: false, isError: true });
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="wrapper">
          <Search onSearch={(searchString) => this.onSearch(searchString)} />
          <ErrorButton />
          <SearchResults
            isError={this.state.isError}
            isLoading={this.state.isLoading}
            searchResults={this.state.searchResults}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
