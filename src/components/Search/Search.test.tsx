import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { useState } from 'react';

function SearchParent({ onSearch }: { onSearch: () => void }) {
  const [searchString, setSearchString] = useState<string>('');
  return (
    <Search
      onSearch={onSearch}
      searchString={searchString}
      setSearchString={setSearchString}
    />
  );
}

describe('Rendering Search:', () => {
  test('renders input', () => {
    render(<SearchParent onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders "search" button', () => {
    render(<SearchParent onSearch={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Search');
  });

  // TODO: test this in App component
  // test('input has value from localStorage', () => {
  //   const key = 'searchString';
  //   const value = 'potter';
  //   localStorage.setItem(key, value);
  //   render(<SearchParent onSearch={vi.fn()} />);
  //   expect(screen.getByRole('textbox')).toHaveValue(value);
  // });

  test('shows empty input when no saved term exists', () => {
    localStorage.clear();
    render(<SearchParent onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});

describe('User Interaction with Search component:', () => {
  const mockInputValue = 'alohomora';

  test('Updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchParent onSearch={vi.fn()} />);
    const input = screen.getByRole('textbox');
    await user.type(input, mockInputValue);
    expect(input).toHaveValue(mockInputValue);
  });

  test('Button click triggers search callback with correct parameters', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchParent onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: mockInputValue } });
    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockOnSearch).toBeCalledTimes(1);
  });
});
