import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModalContent from './modal-content';

describe('ModalContent', () => {
  it('renders with correct role and children', () => {
    const onClose = vi.fn();
    render(
      <ModalContent onClose={onClose}>
        <div>Content</div>
      </ModalContent>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ModalContent onClose={onClose}>
        <div>Content</div>
      </ModalContent>
    );

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
