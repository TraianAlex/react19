import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const SectionContext = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={`theme-${theme} p-2 border border-primary`}
      onClick={toggleTheme}
    >
      Content {theme}
    </div>
  );
};
