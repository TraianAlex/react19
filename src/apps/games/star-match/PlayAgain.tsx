import { Button } from 'react-bootstrap';

export const PlayAgain = ({
  gameStatus,
  onClick,
}: {
  gameStatus: 'won' | 'lost';
  onClick: () => void;
}) => (
  <div className='text-center'>
    <div
      className={`fs-3 fw-bold my-3 ${
        gameStatus === 'lost' ? 'text-danger' : 'text-success'
      }`}
    >
      {gameStatus === 'lost' ? 'Game Over' : 'Nice'}
    </div>
    <Button className='mt-4' onClick={onClick || (() => {})}>
      Play Again
    </Button>
  </div>
);
