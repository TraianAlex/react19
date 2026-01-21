import { useState } from 'react';

import { calculateStatus, calculateWinner } from '../common/game-utils';

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares);

  const selectSquare = (square: number) => {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = calculateNextValue(squares);
    setSquares(squaresCopy);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
  };

  const renderSquare = (i: number) => {
    return (
      <button className='board-square' onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  };

  return (
    <div>
      <div className='game-status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        className='btn btn-outline-primary mt-2'
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
};

const calculateNextValue = (squares: any[]) => {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
};
