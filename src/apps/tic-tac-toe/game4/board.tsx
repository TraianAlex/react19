import { useEffect, useState } from 'react';

import {
  calculateNextValue,
  calculateStatus,
  calculateWinner,
} from '../common/game-utils';

export const Board = () => {
  const [squares, setSquares] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('squares') || 'null') ||
      Array(9).fill(null)
  );

  // antipatern - this is not necessary since this depends on user event
  // It causes an unnecessary render when squares change and introduces 
  // complexity where state can be directly computed during render or during an user event
  // useEffect(() => {
  //   window.localStorage.setItem('squares', JSON.stringify(squares));
  // }, [squares]);

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares);

  const selectSquare = (square: number) => {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = calculateNextValue(squares);
    setSquares(squaresCopy);
    window.localStorage.setItem('squares', JSON.stringify(squares));
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
      <button className='btn btn-outline-primary mt-2' onClick={restart}>
        Restart
      </button>
    </div>
  );
};
