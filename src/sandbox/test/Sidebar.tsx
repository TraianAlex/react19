import { ThemeControl } from './ThemeControl';
import { useAppContext } from './appContext';

export const Sidebar = () => {
  const { theme } = useAppContext();

  return (
    <div className={`theme-${theme} p-2 border border-primary`}>
      <h3>Sidebar</h3>
      <ThemeControl />
    </div>
  );
};
