import { useRef, useState, lazy, Suspense } from 'react';
import { v4 as uuid } from 'uuid';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import { Card } from './Card';
import { AddButton } from './AddButton';
import { TrashZone } from './TrashZone';

const AddModal = lazy(() => import('./AddModal'));

interface CardType {
  id: string;
  label: string;
  position: { top: number; left: number };
  size: { width: number; height: number };
}

type DragState = 
  | { type: 'drag'; card: CardType; offset: { x: number; y: number } }
  | { type: 'resize'; card: CardType; handle: string; startPos: { x: number; y: number }; startSize: { width: number; height: number } }
  | null;

const DEFAULT_SIZE = { width: 200, height: 150 };
const MIN_SIZE = { width: 100, height: 50 };
const HANDLE_OFFSET = 4;

const AppCards2 = () => {
  const [cards, setCards] = useLocalStorageState<Record<string, CardType>>('cards2', {});
  const [dragState, setDragState] = useState<DragState>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLDivElement>(null);

  const updateCard = (id: string, updates: Partial<CardType>) => {
    setCards({ ...cards, [id]: { ...cards[id], ...updates } });
  };

  const handleMouseMove = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState || !boardRef.current) return;

    const container = boardRef.current;
    const { clientWidth, clientHeight } = container;

    // Check if dragging over trash zone
    if (dragState.type === 'drag' && trashRef.current) {
      const trashRect = trashRef.current.getBoundingClientRect();
      const isOver = 
        ev.clientX >= trashRect.left &&
        ev.clientX <= trashRect.right &&
        ev.clientY >= trashRect.top &&
        ev.clientY <= trashRect.bottom;
      setIsOverTrash(isOver);
    }

    if (dragState.type === 'resize') {
      const { card, handle, startPos, startSize } = dragState;
      const deltaX = ev.pageX - startPos.x;
      const deltaY = ev.pageY - startPos.y;

      let width = startSize.width;
      let height = startSize.height;
      let left = card.position.left;
      let top = card.position.top;

      // Resize logic
      if (handle.includes('e')) width = Math.max(MIN_SIZE.width, startSize.width + deltaX);
      if (handle.includes('w')) {
        width = Math.max(MIN_SIZE.width, startSize.width - deltaX);
        left = Math.max(HANDLE_OFFSET, card.position.left + deltaX);
      }
      if (handle.includes('s')) height = Math.max(MIN_SIZE.height, startSize.height + deltaY);
      if (handle.includes('n')) {
        height = Math.max(MIN_SIZE.height, startSize.height - deltaY);
        top = Math.max(HANDLE_OFFSET, card.position.top + deltaY);
      }

      // Constrain to container
      width = Math.min(width, clientWidth - left - HANDLE_OFFSET);
      height = Math.min(height, clientHeight - top - HANDLE_OFFSET);
      left = Math.max(HANDLE_OFFSET, Math.min(left, clientWidth - width - HANDLE_OFFSET));
      top = Math.max(HANDLE_OFFSET, Math.min(top, clientHeight - height - HANDLE_OFFSET));

      updateCard(card.id, {
        position: { top, left },
        size: { width, height },
      });
    } else if (dragState.type === 'drag') {
      const { card, offset } = dragState;
      const containerRect = container.getBoundingClientRect();
      let top = ev.clientY - containerRect.top - offset.y;
      let left = ev.clientX - containerRect.left - offset.x;

      // Constrain to container
      top = Math.max(HANDLE_OFFSET, Math.min(top, clientHeight - card.size.height - HANDLE_OFFSET));
      left = Math.max(HANDLE_OFFSET, Math.min(left, clientWidth - card.size.width - HANDLE_OFFSET));

      updateCard(card.id, { position: { top, left } });
    }
  };

  const handleMouseUp = (ev: React.MouseEvent<HTMLDivElement>) => {
    // Delete card if dropped over trash zone
    if (dragState?.type === 'drag' && trashRef.current) {
      const trashRect = trashRef.current.getBoundingClientRect();
      const isOver = 
        ev.clientX >= trashRect.left &&
        ev.clientX <= trashRect.right &&
        ev.clientY >= trashRect.top &&
        ev.clientY <= trashRect.bottom;
      
      if (isOver) {
        deleteCard(dragState.card.id);
      }
    }
    setDragState(null);
    setIsOverTrash(false);
  };

  const addCard = (label: string) => {
    const container = boardRef.current;
    const id = uuid();
    const position = container
      ? { left: container.clientWidth * 0.5, top: container.clientHeight * 0.5 }
      : { left: 400, top: 300 };

    updateCard(id, {
      id,
      label,
      position,
      size: DEFAULT_SIZE,
    });
    setIsAddOpen(false);
  };

  const deleteCard = (id: string) => {
    const newCards = { ...cards };
    delete newCards[id];
    setCards(newCards);
  };

  return (
    <div
      className="position-fixed start-0 w-100 bg-light overflow-hidden"
      style={{ top: '56px', height: 'calc(100vh - 56px)' }}
      ref={boardRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {Object.values(cards).map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStart={(offset) => setDragState({ type: 'drag', card, offset })}
          onResizeStart={(handle, startPos) =>
            setDragState({
              type: 'resize',
              card,
              handle,
              startPos,
              startSize: card.size,
            })
          }
        />
      ))}
      <TrashZone ref={trashRef} isOverTrash={isOverTrash} />
      <AddButton onClick={() => setIsAddOpen(true)} />
      {isAddOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onAdd={addCard}
          />
        </Suspense>
      )}
    </div>
  );
};

export default AppCards2;
