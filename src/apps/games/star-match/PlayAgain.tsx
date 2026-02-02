import { Button } from 'react-bootstrap';

export const PlayAgain = ({
  gameStatus,
  onClick,
}: {
  gameStatus: 'won' | 'lost';
  onClick: () => void;
}) => (
  <div className='game-done'>
    <div
      className='message'
      style={{ color: gameStatus === 'lost' ? 'red' : 'green' }}
    >
      {gameStatus === 'lost' ? 'Game Over' : 'Nice'}
    </div>
    <Button className='mt-4' onClick={onClick || (() => {})}>
      Play Again
    </Button>
  </div>
);
