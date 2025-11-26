import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface ToggleProps {
  children: React.ReactNode;
  onToggle?: () => void;
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

export default function Toggle({ children, onToggle = () => {} }: ToggleProps) {
  const [on, setOn] = useState(false);
  const firstRender = useRef(true); // to prevent the onToggle from being called on the first render

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      onToggle();
    }
  }, [on]);

  function toggle() {
    setOn((prevOn) => !prevOn);
  }

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}
