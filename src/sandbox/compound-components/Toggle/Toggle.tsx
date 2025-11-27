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

export default function Toggle({ children, onToggle }: ToggleProps) {
  const [on, setOn] = useState(false);
  const hasToggledRef = useRef(false); // Track if toggle has been called at least once

  useEffect(() => {
    // Only call onToggle if the toggle has been used (not on initial mount)
    if (hasToggledRef.current && onToggle) {
      onToggle();
    }
  }, [on]);

  function toggle() {
    hasToggledRef.current = true; // Mark that toggle has been called
    setOn((prevOn) => !prevOn);
  }

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

/*
const ToggleContext = React.createContext()

export default function Toggle({ children, onToggle }) {
    const [on, setOn] = React.useState(false)
    const firstRender = true
    

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            onToggle()
        }
    }, [on])

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    )
}
*/
