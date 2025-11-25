import { useContext } from 'react';
import { ToggleContext } from './Toggle';

interface ToggleDisplayProps {
  children: (on: boolean, toggle: () => void) => React.ReactNode | null;
}

export default function ToggleDisplay({ children }: ToggleDisplayProps) {
  const { on, toggle } = useContext(ToggleContext);

  if (!children || typeof children !== 'function') {
    throw new Error('You must pass ToggleDisplay a function as a child');
  }

  return children(on, toggle);
}
