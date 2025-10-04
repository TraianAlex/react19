import { createContext } from 'react';
import useTheme from '../hooks/useTheme';

export const ThemeContext = createContext({
  darkTheme: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useTheme();

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
