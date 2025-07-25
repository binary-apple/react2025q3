import { useEffect, useState } from 'react';

function useLocalStorage(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(localStorage.getItem(key) ?? '');

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
