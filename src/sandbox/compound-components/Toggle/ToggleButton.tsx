import { useToggleContext } from './Toggle';

interface ToggleButtonProps {
  children: React.ReactNode;
}

export default function ToggleButton({ children }: ToggleButtonProps) {
  const { toggle } = useToggleContext();

  return <div onClick={toggle}>{children}</div>;
}
