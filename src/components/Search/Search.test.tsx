import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Search from './Search';

describe('Rendering Search:', () => {
  test('renders input', () => {
    render(<Search onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders "search" button', () => {
    render(<Search onSearch={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Search');
  });

  test('input has value from localStorage', () => {
    const key = 'searchString';
    const value = 'potter';
    localStorage.setItem(key, value);
    render(<Search onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  test('shows empty input when no saved term exists', () => {
    localStorage.clear();
    render(<Search onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
