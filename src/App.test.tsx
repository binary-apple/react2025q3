import '@testing-library/jest-dom/vitest';
import { fireEvent } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import App from './App';

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
