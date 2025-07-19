import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SearchResults from './SearchResults';

describe('Search results: Loader ', () => {
  const mockSearchResultsProps = {
    isLoading: true,
    isError: false,
    searchResults: [],
  };

  test('does not render if isLoading === false', () => {
    mockSearchResultsProps.isLoading = false;
    render(
      <SearchResults
        isLoading={mockSearchResultsProps.isLoading}
        isError={mockSearchResultsProps.isError}
        searchResults={mockSearchResultsProps.searchResults}
      />
    );
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  test('renders if isLoading === true', () => {
    mockSearchResultsProps.isLoading = true;
    render(
      <SearchResults
        isLoading={mockSearchResultsProps.isLoading}
        isError={mockSearchResultsProps.isError}
        searchResults={mockSearchResultsProps.searchResults}
      />
    );
    expect(screen.queryByTestId('loader')).toBeInTheDocument();
  });
});

describe('Search results: no data found ', () => {
  const mockSearchResultsProps = {
    isLoading: false,
    isError: false,
    searchResults: [],
  };

  test('Displays "no results" message when data array is empty', () => {
    render(
      <SearchResults
        isLoading={mockSearchResultsProps.isLoading}
        isError={mockSearchResultsProps.isError}
        searchResults={mockSearchResultsProps.searchResults}
      />
    );
    expect(screen.getByText(/nothing was found/i)).toBeInTheDocument();
  });
});
