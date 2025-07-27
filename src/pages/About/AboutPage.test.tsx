import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import AboutPage from './AboutPage';
import { MemoryRouter } from 'react-router';

describe('About page', () => {
  test('should have link to the RS School React course', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    const link = screen
      .getAllByRole('link')
      .find(
        (element) =>
          element instanceof HTMLAnchorElement &&
          element.href === 'https://rs.school/courses/reactjs'
      );
    expect(link).toBeInTheDocument();
  });

  test('should have link to the github profile', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    const link = screen
      .getAllByRole('link')
      .find(
        (element) =>
          element instanceof HTMLAnchorElement &&
          element.href === 'https://github.com/binary-apple'
      );
    expect(link).toBeInTheDocument();
  });
});
