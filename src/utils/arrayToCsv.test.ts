import { describe, test, expect } from 'vitest';
import { arrayToString } from './arrayToCsv';

describe('arrayToString', () => {
  test('returns empty string for empty array', () => {
    expect(arrayToString([])).toBe('');
  });

  test('returns correct string for objects array', () => {
    const data = [
      {
        nickname: 'Harry',
        index: 0,
      },
      {
        nickname: 'Hermione',
        index: 1,
      },
    ];

    expect(arrayToString(data)).toBe(`nickname;index\nHarry;0\nHermione;1`);
  });
});
