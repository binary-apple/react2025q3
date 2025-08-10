import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App component', () => {
  it('has default light theme', () => {
    render(<App />);
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('renders application', () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
  });
});
