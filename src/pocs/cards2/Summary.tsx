import { useState, useMemo, memo } from 'react';
import levenshtein from 'levenshtein';
import './Summary.scss';
import { CornerButton } from './CornerButton';

type Corner = 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';

interface Card {
  id: string;
  label: string;
  position: {
    top: number;
    left: number;
  };
}

interface SummaryProps {
  cards: Record<string, Card>;
}

export const Summary = memo<SummaryProps>(
  ({ cards }) => {
    const [position, setPosition] = useState<Corner>('top-right');

    const cardsArray = Object.values(cards);
    const cardsKeysLength = Object.keys(cards).length;

    const distances = useMemo(() => {
      const distanceCals = { max: 0, min: 100000 };
      cardsArray.forEach(currentCard => {
        cardsArray.forEach(compareCard => {
          if (compareCard === currentCard) {
            return;
          }
          const distance = new levenshtein(
            currentCard.label,
            compareCard.label,
          );

          distanceCals.max = Math.max(distanceCals.max, distance.distance);
          distanceCals.min = Math.min(distanceCals.min, distance.distance);
        });
      });
      return distanceCals;
    }, [cardsArray]);

    return (
      <div className={`mt-2 Summary Summary-${position}`}>
        <div>You have {cardsKeysLength} cards!</div>
        <div>Max difference in labels: {distances.max}</div>
        <div>Min difference in labels: {distances.min}</div>

        <CornerButton
          setPosition={setPosition}
          corner="top-right"
          position={position}
        />
        <CornerButton
          setPosition={setPosition}
          corner="top-left"
          position={position}
        />
        <CornerButton
          setPosition={setPosition}
          corner="bottom-left"
          position={position}
        />
        <CornerButton
          setPosition={setPosition}
          corner="bottom-right"
          position={position}
        />
      </div>
    );
  },
  (prevProps, newProps) =>
    Object.values(prevProps.cards).length ===
    Object.values(newProps.cards).length,
);
