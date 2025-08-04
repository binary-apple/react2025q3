import '@testing-library/jest-dom/vitest';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SearchResults from './SearchResults';
import { MemoryRouter } from 'react-router';
import { renderWithProviders } from '../../utils/test-utils';

describe('Search results: Loader ', () => {
  const mockSearchResultsProps = {
    isLoading: true,
    isError: false,
    searchResults: [],
  };

  test('does not render if isLoading === false', () => {
    mockSearchResultsProps.isLoading = false;
    renderWithProviders(
      <MemoryRouter>
        <SearchResults
          isLoading={mockSearchResultsProps.isLoading}
          isError={mockSearchResultsProps.isError}
          searchResults={mockSearchResultsProps.searchResults}
        />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  test('renders if isLoading === true', () => {
    mockSearchResultsProps.isLoading = true;
    renderWithProviders(
      <MemoryRouter>
        <SearchResults
          isLoading={mockSearchResultsProps.isLoading}
          isError={mockSearchResultsProps.isError}
          searchResults={mockSearchResultsProps.searchResults}
        />
      </MemoryRouter>
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
    renderWithProviders(
      <MemoryRouter>
        <SearchResults
          isLoading={mockSearchResultsProps.isLoading}
          isError={mockSearchResultsProps.isError}
          searchResults={mockSearchResultsProps.searchResults}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/nothing was found/i)).toBeInTheDocument();
  });
});

describe('Search results: renders all items ', () => {
  const mockSearchResultsProps = {
    isLoading: false,
    isError: false,
    searchResults: [
      {
        fullName: 'Sir Nicholas de Mimsy-Porpington',
        nickname: 'Nearly Headless Nick',
        hogwartsHouse: 'Gryffindor',
        interpretedBy: 'John Marwood Cleese',
        children: [],
        image: 'test-image.jpg',
        birthdate: 'Between Jan 1, 1401 and Oct 31, 1475',
        index: 0,
      },
      {
        fullName: 'The Fat Friar',
        nickname: 'The Fat Friar',
        hogwartsHouse: 'Hufflepuff',
        interpretedBy: 'Simon Fisher-Becker',
        children: [],
        image: 'test-image.jpg',
        birthdate: '10th century',
        index: 1,
      },
      {
        fullName: 'Helena Ravenclaw',
        nickname: 'The Grey Lady',
        hogwartsHouse: 'Ravenclaw',
        interpretedBy: 'Nina Young',
        children: [],
        image: 'test-image.jpg',
        birthdate: 'Post-982',
        index: 2,
      },
      {
        fullName: 'The Bloody Baron',
        nickname: 'The Bloody Baron',
        hogwartsHouse: 'Slytherin',
        interpretedBy: 'Terence Bayler',
        children: [],
        image: 'test-image.jpg',
        birthdate: 'Post 982',
        index: 3,
      },
    ],
  };

  test('Renders correct number of items when data is provided', () => {
    renderWithProviders(
      <MemoryRouter>
        <SearchResults
          isLoading={mockSearchResultsProps.isLoading}
          isError={mockSearchResultsProps.isError}
          searchResults={mockSearchResultsProps.searchResults}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-results').children.length).toBe(4);
  });
});

describe('Search results: Error ', () => {
  const mockSearchResultsProps = {
    isLoading: false,
    isError: true,
    searchResults: [],
  };

  test('Displays "error" message if isError === true', () => {
    renderWithProviders(
      <MemoryRouter>
        <SearchResults
          isLoading={mockSearchResultsProps.isLoading}
          isError={mockSearchResultsProps.isError}
          searchResults={mockSearchResultsProps.searchResults}
        />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/There was an error. Try again/i)
    ).toBeInTheDocument();
  });
});
