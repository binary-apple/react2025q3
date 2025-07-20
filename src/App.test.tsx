import '@testing-library/jest-dom/vitest';
import { fireEvent } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, afterEach } from 'vitest';
import App from './App';
import { getResponse } from './api/api';

const mocks = vi.hoisted(() => {
  return {
    getResponse: vi.fn(() =>
      Promise.resolve({
        json: async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return [];
        },
      })
    ),
  };
});

vi.mock('./api/api', () => {
  return {
    getResponse: mocks.getResponse,
  };
});

describe('Integration Tests:', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('Makes initial API call on component mount', () => {
    render(<App />);
    expect(vi.mocked(getResponse)).toBeCalledWith('');
  });

  test('Handles search term from localStorage on initial load', () => {
    const mockSavedValue = 'alohomora';
    localStorage.setItem('searchString', mockSavedValue);
    render(<App />);
    expect(vi.mocked(getResponse)).toBeCalledWith(mockSavedValue);
  });

  test('Manages loading states during API calls', async () => {
    vi.useFakeTimers();
    render(<App />);
    expect(screen.queryByTestId('loader')).toBeInTheDocument();
  });
});

describe('User Interaction with Search component:', () => {
  const mockInputValue = 'alohomora';

  test('Saves search term to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');
    fireEvent.change(input, { target: { value: mockInputValue } });
    await user.click(button);
    expect(localStorage.getItem('searchString')).toBe(mockInputValue);
  });
});
