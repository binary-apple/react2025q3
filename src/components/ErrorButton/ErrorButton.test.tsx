import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ErrorButton from './ErrorButton';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

describe('Error Button', () => {
  test('Throws error when test button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorButton />);
    const errorButton = screen.getByTestId('error-button');
    await expect(user.click(errorButton)).rejects.toThrowError();
  });

  test('Triggers error boundary fallback UI', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    const errorButton = screen.getByTestId('error-button');
    await user.click(errorButton);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
