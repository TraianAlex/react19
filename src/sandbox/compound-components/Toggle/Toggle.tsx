import { createContext, useState } from 'react';

interface ToggleProps {
  children: React.ReactNode;
}

const ToggleContext = createContext({
  on: false,
  toggle: () => {},
});

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

export { ToggleContext };
