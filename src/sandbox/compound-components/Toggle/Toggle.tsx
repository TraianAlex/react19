import { createContext, useContext, useEffect, useState } from 'react';

interface ToggleProps {
  children: React.ReactNode;
  onToggle?: (on: boolean) => void;
}

const ToggleContext = createContext({
  on: false,
  toggle: () => {},
});

export const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggleContext must be used within a ToggleProvider');
  }
  return context;
};

export default function Toggle({ children, onToggle }: ToggleProps) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (onToggle) {
      onToggle(on);
    }
  }, [on, onToggle]);

  function toggle() {
    setOn((prevOn) => !prevOn);
  }

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}
