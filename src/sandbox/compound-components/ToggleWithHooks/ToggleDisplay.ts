import { useToggleWithHooksContext } from './ToggleWithHooks';

interface ToggleDisplayProps {
  children: (on: boolean, toggle: () => void) => React.ReactNode | null;
}

export default function ToggleDisplay({ children }: ToggleDisplayProps) {
  const { on, toggle } = useToggleWithHooksContext();

  if (!children || typeof children !== 'function') {
    throw new Error('You must pass ToggleDisplay a function as a child');
  }

  return children(on, toggle);
}
