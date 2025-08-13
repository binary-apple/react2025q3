import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import NotFoundPage from './NotFoundPage';

describe('Not found page', () => {
  test('should display 404 code', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.queryByText('404')).toBeInTheDocument();
  });
});
