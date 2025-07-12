import { Component } from 'react';

type SearchResultsState = {
  isLoading: boolean;
  isError: boolean;
  searchResults: unknown[];
};

class SearchResults extends Component<object, SearchResultsState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      searchResults: [],
    };
  }
  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    const response = await fetch(
      'https://potterapi-fedeperin.vercel.app/en/characters',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const results = await response.json();

    if (response.ok) {
      this.setState({ searchResults: results, isLoading: false });
    } else {
      this.setState({ isLoading: false, isError: true });
    }
  }

  render() {
    return <div>Search results</div>;
  }
}

export default SearchResults;
