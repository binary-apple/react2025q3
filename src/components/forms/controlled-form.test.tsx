import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentProps } from 'react';

import ControlledForm from './controlled-form';

const { submitSpy, useSubmitMock } = vi.hoisted(() => {
  const submitSpy = vi.fn();
  const useSubmitMock = vi.fn(() => submitSpy);
  return { submitSpy, useSubmitMock };
});

vi.mock('@/hooks/useSubmit', () => ({
  default: useSubmitMock,
}));

vi.mock('@/components/inputs', () => {
  type InputProps = { label?: string } & ComponentProps<'input'>;
  const Input = ({ label, ...props }: InputProps) => (
    <label>
      {label && <span>{label}</span>}
      <input aria-label={label ?? props.placeholder} {...props} />
    </label>
  );

  type CheckboxProps = { label?: string } & ComponentProps<'input'>;
  const Checkbox = ({ label, ...props }: CheckboxProps) => (
    <label>
      <input type="checkbox" aria-label={label} {...props} />
      {label && <span>{label}</span>}
    </label>
  );

  const GenderPicker = () => <div data-testid="gender-picker" />;

  return { Input, Checkbox, GenderPicker };
});

beforeEach(() => {
  submitSpy.mockClear();
  useSubmitMock.mockClear();
});

describe('ControlledForm', () => {
  it('renders title and inputs; useSubmit is called with "uncontrolled"', () => {
    const onClose = vi.fn();
    render(<ControlledForm onClose={onClose} />);

    expect(
      screen.getByRole('heading', { name: 'Controlled form' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByTestId('gender-picker')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /accept t&c/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    expect(useSubmitMock).toHaveBeenCalledWith('controlled');
  });

  it('submits correct data and closes modal', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ControlledForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Name'), 'User');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'user@example.com');
    await user.click(screen.getByRole('checkbox', { name: /accept t&c/i }));

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(submitSpy).toHaveBeenCalledWith({
      name: 'User',
      age: 25,
      email: 'user@example.com',
      gender: '',
      terms: true,
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
