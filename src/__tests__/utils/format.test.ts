import { describe, it, expect } from 'vitest';
import format from '@/utils/format';

describe('format', () => {
  it('returns "N/A" for undefined', () => {
    expect(format(undefined)).toBe('N/A');
  });

  it('returns string as it is', () => {
    expect(format('test')).toBe('test');
  });

  it('formats integer number with space separators', () => {
    expect(format(12)).toBe('12');
    expect(format(1234)).toBe('1 234');
    expect(format(1234567)).toBe('1 234 567');
  });

  it('rounds with precision and formats with space separators', () => {
    expect(format(1234.5678, 0)).toBe('1 235');
    expect(format(1234.5658, 1)).toBe('1 234.6');
    expect(format(1234.5678, 2)).toBe('1 234.57');
    expect(format(1234.5678, 3)).toBe('1 234.568');
  });
});
