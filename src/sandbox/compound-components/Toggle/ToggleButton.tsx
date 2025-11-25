import { useContext } from 'react';
import { ToggleContext } from './Toggle';

interface ToggleButtonProps {
  children: React.ReactNode;
}

export default function ToggleButton({ children }: ToggleButtonProps) {
  const { toggle } = useContext(ToggleContext);
  return <div onClick={toggle}>{children}</div>;
}
