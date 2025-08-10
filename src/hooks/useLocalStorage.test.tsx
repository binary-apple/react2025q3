import { renderHook } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns value from localStorage', () => {
    localStorage.setItem('key', 'value');

    const { result } = renderHook(() => useLocalStorage('key'));

    expect(result.current[0]).toBe('value');
  });

  test('returns empty string if there is no saved value', () => {
    const { result } = renderHook(() => useLocalStorage('key'));

    expect(result.current[0]).toBe('');
  });
});
