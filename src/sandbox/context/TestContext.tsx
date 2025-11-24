import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const AppWithContext = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <PageWithContext />
    </ThemeContext.Provider>
  );
};

const PageWithContext = () => {
  return <SectionWithContext />;
};

const SectionWithContext = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`theme-${theme} p-2`} onClick={toggleTheme}>
      Content {theme}
    </div>
  );
};
