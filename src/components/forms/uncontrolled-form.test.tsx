import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentProps } from 'react';

import UncontrolledForm from './uncontrolled-form';

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

  const GenderPicker = () => (
    <fieldset>
      <legend>Gender</legend>
      <label>
        <input type="radio" name="gender" value="male" /> Male
      </label>
      <label>
        <input type="radio" name="gender" value="female" /> Female
      </label>
      <label>
        <input type="radio" name="gender" value="other" /> Other
      </label>
    </fieldset>
  );

  return { Input, Checkbox, GenderPicker };
});

beforeEach(() => {
  submitSpy.mockClear();
  useSubmitMock.mockClear();
});

describe('UncontrolledForm', () => {
  it('renders title and inputs; useSubmit is called with "uncontrolled"', () => {
    const onClose = vi.fn();
    render(<UncontrolledForm onClose={onClose} />);

    expect(
      screen.getByRole('heading', { name: /uncontrolled form/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /accept t&c/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    expect(useSubmitMock).toHaveBeenCalledWith('uncontrolled');
  });

  it('submits correct data and closes modal', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<UncontrolledForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Name'), 'User');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'user@example.com');
    await user.click(screen.getByLabelText('Other'));
    await user.click(screen.getByRole('checkbox', { name: /accept t&c/i }));

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(submitSpy).toHaveBeenCalledWith({
      name: 'User',
      age: 25,
      email: 'user@example.com',
      gender: 'other',
      terms: true,
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
