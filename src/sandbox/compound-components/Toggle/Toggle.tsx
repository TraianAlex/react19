import { createContext, useContext, useState } from 'react';

interface ToggleProps {
  children: React.ReactNode;
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

export default function Toggle({ children }: ToggleProps) {
  const [on, setOn] = useState(false);

  function toggle() {
    setOn((prevOn) => !prevOn);
  }

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}
