import { memo, useState } from 'react';

interface CardType {
  id: string;
  label: string;
  position: {
    top: number;
    left: number;
  };
  size: {
    width: number;
    height: number;
  };
}

type ResizeHandle = 'se' | 'sw' | 'ne' | 'nw' | 'e' | 'w' | 'n' | 's';

interface CardProps {
  card: CardType;
  onDragStart: (dragOffset: { x: number; y: number }) => void;
  onResizeStart: (handle: ResizeHandle, startPos: { x: number; y: number }) => void;
}

export const Card = memo<CardProps>(({ card, onDragStart, onResizeStart }) => {
  const setClickOffset = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    const clickOffset = {
      x: ev.clientX - card.position.left,
      y: ev.clientY - card.position.top,
    };
    onDragStart(clickOffset);
  };

  const handleResizeStart = (handle: ResizeHandle) => (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
    onResizeStart(handle, { x: ev.pageX, y: ev.pageY });
  };

  const resizeHandles: ResizeHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseDown={setClickOffset}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-3 bg-white text-break position-absolute border rounded shadow-sm"
      style={{
        left: card.position.left,
        top: card.position.top,
        width: card.size.width,
        height: card.size.height,
        minWidth: '6.25rem',
        minHeight: '3.125rem',
        cursor: 'move',
        userSelect: 'none',
        fontSize: '1.125rem',
      }}
      key={card.id}
    >
      {card.label}
      {resizeHandles.map((handle) => {
        const isCorner = handle.length === 2;
        const handleStyle: React.CSSProperties = {
          position: 'absolute',
          backgroundColor: '#ccc',
          zIndex: 10,
          opacity: 0,
          transition: 'opacity 0.2s',
        };

        if (isCorner) {
          // Corner handles
          handleStyle.width = '0.75rem';
          handleStyle.height = '0.75rem';
          if (handle === 'nw') {
            handleStyle.top = '-0.25rem';
            handleStyle.left = '-0.25rem';
            handleStyle.cursor = 'nw-resize';
          } else if (handle === 'ne') {
            handleStyle.top = '-0.25rem';
            handleStyle.right = '-0.25rem';
            handleStyle.cursor = 'ne-resize';
          } else if (handle === 'se') {
            handleStyle.bottom = '-0.25rem';
            handleStyle.right = '-0.25rem';
            handleStyle.cursor = 'se-resize';
          } else if (handle === 'sw') {
            handleStyle.bottom = '-0.25rem';
            handleStyle.left = '-0.25rem';
            handleStyle.cursor = 'sw-resize';
          }
        } else {
          // Edge handles
          if (handle === 'n') {
            handleStyle.top = '-0.25rem';
            handleStyle.left = '0';
            handleStyle.right = '0';
            handleStyle.height = '0.5rem';
            handleStyle.cursor = 'n-resize';
          } else if (handle === 's') {
            handleStyle.bottom = '-0.25rem';
            handleStyle.left = '0';
            handleStyle.right = '0';
            handleStyle.height = '0.5rem';
            handleStyle.cursor = 's-resize';
          } else if (handle === 'e') {
            handleStyle.top = '0';
            handleStyle.right = '-0.25rem';
            handleStyle.bottom = '0';
            handleStyle.width = '0.5rem';
            handleStyle.cursor = 'e-resize';
          } else if (handle === 'w') {
            handleStyle.top = '0';
            handleStyle.left = '-0.25rem';
            handleStyle.bottom = '0';
            handleStyle.width = '0.5rem';
            handleStyle.cursor = 'w-resize';
          }
        }

        return (
          <div
            key={handle}
            onMouseDown={handleResizeStart(handle)}
            style={{
              ...handleStyle,
              opacity: isHovered ? 0.8 : 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = isHovered ? '0.8' : '0';
            }}
          />
        );
      })}
    </div>
  );
});
