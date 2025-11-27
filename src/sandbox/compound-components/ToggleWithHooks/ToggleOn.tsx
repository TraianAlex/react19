import { useToggleWithHooksContext } from './ToggleWithHooks';

interface ToggleOnProps {
  children: React.ReactNode;
}

export default function ToggleOn({ children }: ToggleOnProps) {
  const { on } = useToggleWithHooksContext();

  return on ? children : null;
}
