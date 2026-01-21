import { useRef, useState, useCallback, lazy, Suspense } from 'react';
import './App.scss';
import useComponentSize from '@rehooks/component-size';
import { v4 as uuid } from 'uuid';
import { useLocalStorageState } from '../../hooks/useLocalStorage';
import { Card } from './Card';
import { AddButton } from './AddButton';
import { Summary } from './Summary';

const AddModal = lazy(() => import('./AddModal'));

const ModalLoader = () => (
  <div className="Modal-Loader w-100 h-100 bg-info">Loading</div>
);

interface CardType {
  id: string;
  label: string;
  position: {
    top: number;
    left: number;
  };
}

interface DragCardInfo {
  card: CardType;
  dragOffset: {
    x: number;
    y: number;
  };
}

const AppCards = () => {
  const [cards, setCards] = useLocalStorageState<Record<string, CardType>>('cards', {});
  const [dragCardInfo, setDragCardInfo] = useState<DragCardInfo | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const boardRef = useRef(null);
  const boardSize = useComponentSize(boardRef);
  const { height, width } = boardSize;

  const updateCardsOnMouseMove = (ev: { pageY: number; pageX: number; }) => {
    if (!dragCardInfo) {
      return;
    }
    const { card, dragOffset } = dragCardInfo;

    setCards({
      ...cards,
      [card.id]: {
        ...card,
        position: {
          top: ev.pageY - dragOffset.y,
          left: ev.pageX - dragOffset.x,
        },
      },
    });
  };

  const showDialog = useCallback(() => {
    // Blur any focused element to prevent aria-hidden violation
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsAddOpen(true);
  }, []);

  const addCard = (label: string) => {
    const id = uuid();

    return setCards({
      ...cards,
      [id]: {
        id,
        label,
        position: {
          left: width * 0.5,
          top: height * 0.5,
        },
      },
    });
  };

  const handleDelete = (card: CardType) => {
    delete cards[card.id];
    setCards({ ...cards });
  };

  const cardEls = Object.values(cards).map((card: CardType) => (
    <Card
      card={card}
      key={card.id}
      onDragStart={(dragOffset: { x: number; y: number }) => setDragCardInfo({ card, dragOffset })}
      onDragEnd={() => setDragCardInfo(null)}
      onDoubleClick={() => handleDelete(card)}
    />
  ));

  return (
    <div className="App-card" ref={boardRef} onMouseMove={updateCardsOnMouseMove}>
      {cardEls}
      <Summary cards={cards} />
      <AddButton onClick={showDialog} />
      {isAddOpen && (
        <Suspense fallback={<ModalLoader />}>
          <AddModal
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onAdd={cardText => addCard(cardText)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default AppCards;
