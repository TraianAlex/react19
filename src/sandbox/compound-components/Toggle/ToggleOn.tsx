import { useToggleContext } from './Toggle';

interface ToggleOnProps {
  children: React.ReactNode;
}

export default function ToggleOn({ children }: ToggleOnProps) {
  const { on } = useToggleContext();

  return on ? children : null;
}
