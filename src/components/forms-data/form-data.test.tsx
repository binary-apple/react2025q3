import { screen } from '@testing-library/react';
import { renderWithStore } from '@/utils/test-utils';
import FormDataList from './form-data';

describe('FormDataList', () => {
  it('renders empty list by default', () => {
    renderWithStore(<FormDataList />);

    expect(
      screen.getByText('No forms have been submitted yet...')
    ).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('renders a single item', () => {
    renderWithStore(<FormDataList />, {
      preloadedState: {
        form: [
          {
            formType: 'controlled',
            name: 'User',
            email: 'user@example.com',
            age: 25,
            gender: 'other',
            terms: true,
          },
        ],
      },
    });

    expect(
      screen.getByText('Results from controlled form')
    ).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('other')).toBeInTheDocument();
  });

  it('highlights the last item', () => {
    renderWithStore(<FormDataList />, {
      preloadedState: {
        form: [
          {
            formType: 'controlled',
            name: 'User',
            email: 'user@example.com',
            age: 25,
            gender: 'other',
            terms: true,
          },
          {
            formType: 'uncontrolled',
            name: 'Tester',
            email: 'tester@example.com',
            age: 30,
            gender: 'male',
            terms: false,
          },
        ],
      },
    });

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);

    expect(items[0]).toHaveClass('border');
    expect(items[0]).not.toHaveClass('border-2', 'border-primary');

    expect(items[1]).toHaveClass('border-2', 'border-primary', 'shadow-md');
    expect(items[1]).not.toHaveClass('border');
  });
});
