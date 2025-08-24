import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenderPicker from './gender-radio';

describe('<GenderPicker />', () => {
  it('renders legend and all options', () => {
    render(<GenderPicker />);

    expect(screen.getByText('Gender')).toBeInTheDocument();

    expect(screen.getByRole('radio', { name: 'Male' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Female' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Other' })).toBeInTheDocument();
  });

  it('selects correct ontion when user click on label', async () => {
    const user = userEvent.setup();
    render(<GenderPicker />);

    const male = screen.getByRole('radio', { name: 'Male' });
    const female = screen.getByRole('radio', { name: 'Female' });
    const other = screen.getByRole('radio', { name: 'Other' });

    await user.click(screen.getByText('Male'));
    expect(male).toBeChecked();
    expect(female).not.toBeChecked();
    expect(other).not.toBeChecked();

    await user.click(screen.getByText('Female'));
    expect(male).not.toBeChecked();
    expect(female).toBeChecked();
    expect(other).not.toBeChecked();

    await user.click(screen.getByText('Other'));
    expect(male).not.toBeChecked();
    expect(female).not.toBeChecked();
    expect(other).toBeChecked();
  });
});
