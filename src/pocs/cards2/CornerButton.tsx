import { memo } from 'react';

type Corner = 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';

interface CornerButtonProps {
  corner: Corner;
  setPosition: (corner: Corner) => void;
  position: Corner;
}

export const CornerButton = memo<CornerButtonProps>(({ corner, setPosition, position }) => {
  return (
    <div
      onClick={() => setPosition(corner)}
      className={`arrow arrow-${corner} ${position === corner ? 'd-none' : ''}`}
    />
  );
});
