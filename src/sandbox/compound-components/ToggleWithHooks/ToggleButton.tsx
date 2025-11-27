import { useToggleWithHooksContext } from './ToggleWithHooks';

interface ToggleButtonProps {
  children: React.ReactNode;
}

export default function ToggleButton({ children }: ToggleButtonProps) {
  const { toggle } = useToggleWithHooksContext();

  return <div onClick={toggle}>{children}</div>;
}
