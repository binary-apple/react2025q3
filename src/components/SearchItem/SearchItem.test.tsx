import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SearchItem from './SearchItem';

const mockSearchItemProps = {
  fullName: 'Sir Nicholas de Mimsy-Porpington',
  nickname: 'Nearly Headless Nick',
  hogwartsHouse: ' Gryffindor',
  interpretedBy: 'John Marwood Cleese',
  children: [],
  image: 'test-image.jpg',
  birthdate: 'Between Jan 1, 1401 and Oct 31, 1475',
  index: 0,
};

describe('Search item', () => {
  render(
    <SearchItem
      fullName={mockSearchItemProps.fullName}
      nickname={mockSearchItemProps.nickname}
      hogwartsHouse={mockSearchItemProps.hogwartsHouse}
      interpretedBy={mockSearchItemProps.interpretedBy}
      // TODO: pass character's children
      image={mockSearchItemProps.image}
      birthdate={mockSearchItemProps.birthdate}
      index={mockSearchItemProps.index}
    />
  );

  test('renders full name', () => {
    expect(
      screen.queryByText(/sir nicholas de mimsy-porpington/i)
    ).toBeInTheDocument();
  });

  test('renders Hogwarts house', () => {
    expect(screen.queryByText(/gryffindor/i)).toBeInTheDocument();
  });

  test('renders birthday', () => {
    expect(
      screen.queryByText(/Between Jan 1, 1401 and Oct 31, 1475/i)
    ).toBeInTheDocument();
  });
});
