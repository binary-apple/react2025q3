import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithStore } from '@/utils/test-utils';

import MainPage from './main-page';

vi.mock('@/components/forms', () => {
  return {
    ControlledForm: ({ onClose }: { onClose: VoidFunction }) => (
      <div>
        <div>Controlled form mock</div>
        <button onClick={onClose}>Close</button>
      </div>
    ),
    UncontrolledForm: ({ onClose }: { onClose: VoidFunction }) => (
      <div>
        <div>Uncontrolled form mock</div>
        <button onClick={onClose}>Close</button>
      </div>
    ),
  };
});

describe('MainPage', () => {
  it('renders title and header buttons', () => {
    renderWithStore(<MainPage />);

    expect(screen.getByRole('heading', { name: 'Forms' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Controlled form' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Uncontrolled form' })
    ).toBeInTheDocument();
  });

  it('opens and closes portal with ControlledForm', async () => {
    const user = userEvent.setup();
    renderWithStore(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'Controlled form' }));
    expect(screen.getByText('Controlled form mock')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Controlled form mock')).not.toBeInTheDocument();
  });

  it('opens and closes portal with UncontrolledForm', async () => {
    const user = userEvent.setup();
    renderWithStore(<MainPage />);

    await user.click(screen.getByRole('button', { name: 'Uncontrolled form' }));
    expect(screen.getByText('Uncontrolled form mock')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText('Uncontrolled form mock')
    ).not.toBeInTheDocument();
  });
});
