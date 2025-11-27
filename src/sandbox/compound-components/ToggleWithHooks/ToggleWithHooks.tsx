import { createContext, useContext, useState } from 'react';
import useEffectOnUpdate from '../../hooks/useEffectOnUpdate';

interface ToggleWithHooksProps {
  children: React.ReactNode;
  onToggle: () => void;
}

const ToggleWithHooksContext = createContext({
  on: false,
  toggle: () => {},
});

export const useToggleWithHooksContext = () => {
  const context = useContext(ToggleWithHooksContext);
  if (!context) {
    throw new Error('useToggleWithHooksContext must be used within a ToggleWithHooksProvider');
  }
  return context;
};

export default function ToggleWithHooks({
  children,
  onToggle,
}: ToggleWithHooksProps) {
  const [on, setOn] = useState(false);

  function toggle() {
    setOn((prevOn) => !prevOn);
  }

  useEffectOnUpdate(onToggle, [on]);

  return (
    <ToggleWithHooksContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleWithHooksContext.Provider>
  );
}

/*
const ToggleContext = React.createContext()

export default function Toggle({ children, onToggle = () => {}}) {
    const [on, setOn] = React.useState(false)

    function toggle() {
        setOn(prevOn => !prevOn)
    }
    
    useEffectOnUpdate(onToggle, [on])

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    )
}
*/
