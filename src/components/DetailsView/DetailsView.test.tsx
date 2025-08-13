import '@testing-library/jest-dom/vitest';
import { useGetCharacterByIdQuery } from '@services/potterApi';
import { fireEvent, render, screen } from '@testing-library/react';
import { useOutletContext } from 'react-router';
import { afterEach, describe, expect, test, vi } from 'vitest';

import DetailsView from './DetailsView';

vi.mock('react-router', () => ({
  useOutletContext: vi.fn(),
}));

vi.mock('@services/potterApi', () => ({
  useGetCharacterByIdQuery: vi.fn(),
}));

const mockCharacterDetails = {
  fullName: 'Sir Nicholas de Mimsy-Porpington',
  nickname: 'Nearly Headless Nick',
  hogwartsHouse: ' Gryffindor',
  interpretedBy: 'John Marwood Cleese',
  children: [],
  image: 'test-image.jpg',
  birthdate: 'Between Jan 1, 1401 and Oct 31, 1475',
  index: 0,
};

const setExpandedId = vi.fn();

describe('Details view', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('returns null if expandedId is null', () => {
    vi.mocked(useOutletContext).mockReturnValue([null, setExpandedId]);
    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetCharacterByIdQuery>);
    const { container } = render(<DetailsView />);
    expect(container.firstChild).toBeNull();
  });

  test('renders character details if expandedId is not null', async () => {
    vi.mocked(useOutletContext).mockReturnValue([1, setExpandedId]);
    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: mockCharacterDetails,
      isFetching: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetCharacterByIdQuery>);

    render(<DetailsView />);

    expect(
      await screen.findByText(/Sir Nicholas de Mimsy-Porpington/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Between Jan 1, 1401 and Oct 31, 1475/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Gryffindor/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockCharacterDetails.image
    );
  });

  test('handles fetch error', async () => {
    vi.mocked(useOutletContext).mockReturnValue([1, vi.fn()]);
    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: true,
    } as unknown as ReturnType<typeof useGetCharacterByIdQuery>);

    render(<DetailsView />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  test('handles close-button click', async () => {
    vi.mocked(useOutletContext).mockReturnValue([1, setExpandedId]);
    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: mockCharacterDetails,
      isFetching: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetCharacterByIdQuery>);

    render(<DetailsView />);

    const closeButton = await screen.findByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(setExpandedId).toHaveBeenCalledWith(null);
  });
});
