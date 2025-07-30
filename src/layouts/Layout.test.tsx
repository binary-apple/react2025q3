import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Layout from './Layout';
import { MemoryRouter } from 'react-router';

describe('Layout', () => {
  test('renders header element', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('renders Main and About links', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('prevents default clicking on Main link', () => {
    const preventDefault = vi.fn();
    const originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = preventDefault;

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const mainLink = screen.getByText('Main');

    fireEvent.click(mainLink);
    expect(preventDefault).toBeCalled();
    Event.prototype.preventDefault = originalPreventDefault;
  });

  test('prevents default clicking on About link', () => {
    const preventDefault = vi.fn();
    const originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = preventDefault;

    Object.defineProperty(window, 'location', {
      value: { pathname: '/about' },
    });

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const aboutLink = screen.getByText('About');

    fireEvent.click(aboutLink);
    expect(preventDefault).toBeCalled();
    Event.prototype.preventDefault = originalPreventDefault;
  });
});
