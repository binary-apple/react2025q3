import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('App', () => {
  test.skip('should render "hello forms"', () => {
    render(<App />);
    expect(screen.getByText(/hello forms!/i)).toBeInTheDocument();
  });
});
