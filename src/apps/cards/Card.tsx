import { memo } from 'react';

interface CardType {
  id: string;
  label: string;
  position: {
    top: number;
    left: number;
  };
}

interface CardProps {
  card: CardType;
  onDragStart: (dragOffset: { x: number; y: number }) => void;
  onDragEnd: () => void;
  onDoubleClick: () => void;
}

export const Card = memo<CardProps>(({ card, onDragStart, onDragEnd, onDoubleClick }) => {
  const setClickOffset = (ev: { clientX: number; clientY: number; currentTarget: { style: { left: string; top: string; }; }; }) => {
    const clickOffset = {
      x: ev.clientX - parseFloat(ev.currentTarget.style.left),
      y: ev.clientY - parseFloat(ev.currentTarget.style.top),
    };
    onDragStart(clickOffset);
  };

  return (
    <div
      onMouseDown={setClickOffset}
      onMouseUp={onDragEnd}
      onDoubleClick={onDoubleClick}
      className="p-3 bg-white text-break"
      style={{
        maxWidth: '250px',
        position: 'absolute',
        left: card.position.left,
        top: card.position.top,
        cursor: 'move',
        userSelect: 'none',
        fontSize: '18px'
      }}
      key={card.id}
    >
      {card.label}
    </div>
  );
});
