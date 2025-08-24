import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import Portal from './portal';

vi.mock('./modal-content', () => ({
  default: ({
    children,
    onClose,
  }: {
    children?: ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="dialog" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  ),
}));

describe('Portal', () => {
  it('renders when isOpen === true', () => {
    const onClose = vi.fn();
    render(
      <Portal isOpen={true} onClose={onClose}>
        Dialog content
      </Portal>
    );
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('does not render when isOpen === false', () => {
    const onClose = vi.fn();
    render(
      <Portal isOpen={false} onClose={onClose}>
        Dialog content
      </Portal>
    );
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Portal isOpen onClose={onClose}>
        Dialog content
      </Portal>
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('close button in modal triggers onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Portal isOpen onClose={onClose}>
        Dialog content
      </Portal>
    );

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
