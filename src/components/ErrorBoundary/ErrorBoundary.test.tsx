import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
  type MockInstance,
} from 'vitest';
import ErrorBoundary from './ErrorBoundary';

describe('Error Boundary', () => {
  let consoleMock: MockInstance<(...data: unknown[]) => void>;
  beforeEach(() => {
    consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  const ThrowError = () => {
    throw new Error();
  };

  test('renders children when no errors thrown', () => {
    render(
      <ErrorBoundary>
        <div>No errors!</div>
      </ErrorBoundary>
    );
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    expect(screen.getByText('No errors!')).toBeInTheDocument();
  });

  test('catches errors in child components and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('Logs error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(consoleMock).toBeCalled();
  });
});
