import { screen } from '@testing-library/react';
import { renderWithStore } from '@/utils/test-utils';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders main page heading', () => {
    renderWithStore(<App />);
    expect(screen.getByRole('heading', { name: 'Forms' })).toBeInTheDocument();
  });
});
