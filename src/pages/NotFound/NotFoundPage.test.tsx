import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router';

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
