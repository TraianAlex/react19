import { useAppContext } from './appContext';

export const Content = () => {
  const { theme } = useAppContext();

  return (
    <div className={`theme-${theme} p-2 border border-primary`}>
      <h1>Content</h1>
    </div>
  );
};
