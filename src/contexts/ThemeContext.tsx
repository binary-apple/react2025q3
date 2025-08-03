import { createContext, useContext } from 'react';

export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: VoidFunction;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
