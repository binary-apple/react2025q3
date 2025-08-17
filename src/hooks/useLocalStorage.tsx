import { useEffect, useState } from 'react';

function useLocalStorage(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(key) ?? '';
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
