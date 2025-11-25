import { useContext } from 'react';
import { ToggleContext } from './Toggle';

interface ToggleOnProps {
  children: React.ReactNode;
}

export default function ToggleOn({ children }: ToggleOnProps) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
}
