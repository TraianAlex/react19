import { useAppContext } from './appContext';

export const ThemeControl = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div onClick={toggleTheme} className={`theme-${theme} p-2 border border-primary`}>
      Toggle the theme {theme}
    </div>
  );
};
