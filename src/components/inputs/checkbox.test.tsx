import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './checkbox';

describe('Checkbox', () => {
  it('renders checkbox with label', () => {
    render(<Checkbox label="Accept" />);
    const input = screen.getByRole('checkbox', { name: /Accept/i });
    expect(input).toBeInTheDocument();
  });

  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept" />);
    const input = screen.getByRole('checkbox', { name: /Accept/i });

    await user.click(input);
    expect(input).toBeChecked();

    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it('has default value when provided', () => {
    render(<Checkbox label="Accept" defaultChecked />);
    const input = screen.getByRole('checkbox', { name: /Accept/i });
    expect(input).toBeChecked();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Accept" disabled onChange={onChange} />);

    const input = screen.getByRole('checkbox', { name: /accept/i });
    expect(input).toBeDisabled();

    await user.click(input);
    expect(input).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });
});
