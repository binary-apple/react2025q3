import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailsView from './DetailsView';
import { useOutletContext } from 'react-router';
import { getCharacterById } from '../../api/api';

vi.mock('react-router', () => ({
  useOutletContext: vi.fn(),
}));

vi.mock('../../api/api', () => ({
  getCharacterById: vi.fn(),
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

const setSelectedId = vi.fn();

describe('Details view', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('returns null if selectedId is null', () => {
    vi.mocked(useOutletContext).mockReturnValue([null, setSelectedId]);
    const { container } = render(<DetailsView />);
    expect(container.firstChild).toBeNull();
  });

  test('renders character details if selectedId is not null', async () => {
    vi.mocked(useOutletContext).mockReturnValue([1, setSelectedId]);
    vi.mocked(getCharacterById).mockResolvedValue({
      json: () => Promise.resolve(mockCharacterDetails),
      ok: true,
      status: 200,
      statusText: 'OK',
    } as Response);

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
    vi.mocked(getCharacterById).mockRejectedValue(new Error());

    const { container } = render(<DetailsView />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  test('handles close-button click', async () => {
    vi.mocked(useOutletContext).mockReturnValue([1, setSelectedId]);
    vi.mocked(getCharacterById).mockResolvedValue({
      json: () => Promise.resolve(mockCharacterDetails),
      ok: true,
      status: 200,
      statusText: 'OK',
    } as Response);

    render(<DetailsView />);

    const closeButton = await screen.findByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(setSelectedId).toHaveBeenCalledWith(null);
  });
});
