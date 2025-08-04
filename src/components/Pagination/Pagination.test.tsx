import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('renders current page', () => {
    render(
      <Pagination currentPage={2} hasMorePages={true} onButtonClick={vi.fn()} />
    );
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  test('disables Prev button on the first page', () => {
    render(
      <Pagination currentPage={1} hasMorePages={true} onButtonClick={vi.fn()} />
    );
    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  test('disables Next button on the last page', () => {
    render(
      <Pagination
        currentPage={2}
        hasMorePages={false}
        onButtonClick={vi.fn()}
      />
    );
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls onButtonClick with next page number when Next is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Pagination
        currentPage={2}
        hasMorePages={true}
        onButtonClick={handleClick}
      />
    );
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(handleClick).toHaveBeenCalledWith(3);
  });

  test('calls onButtonClick with previous page number when Prev is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Pagination
        currentPage={2}
        hasMorePages={true}
        onButtonClick={handleClick}
      />
    );
    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);
    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
