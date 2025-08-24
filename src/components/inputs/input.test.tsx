import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './input';

describe('Input', () => {
  it('renders label and placeholder text', () => {
    render(<Input label="Name" placeholder="Enter name" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('has rest props (type/name/disabled/data)', () => {
    render(
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Email"
        disabled
        data-testid="input"
      />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toBeDisabled();
  });

  it('calls onChange when user types', async () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'Nia');

    expect(onChange).toHaveBeenCalled();
    expect(input.value).toBe('Nia');
  });
});
