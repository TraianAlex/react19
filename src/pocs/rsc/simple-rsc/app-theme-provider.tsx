'use client';

import { createContext, useState } from 'react';

export const ThemeContext = createContext<{
  darkTheme: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
}>({
  darkTheme: false,
  setDarkTheme: () => {},
});

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <ThemeContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
