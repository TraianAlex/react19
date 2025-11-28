import { useState } from 'react';
// import useEffectOnUpdate from './useEffectOnUpdate';

export default function useToggle({
  initialValue = false,
  onToggle = () => {},
}: {
  initialValue?: boolean;
  onToggle?: () => void;
}) {
  const [on, setOn] = useState(initialValue);

  function toggle() {
    setOn((prevOn) => !prevOn);
    onToggle();
  }

  // useEffectOnUpdate(onToggle, []);

  return [on, toggle] as const;
}
