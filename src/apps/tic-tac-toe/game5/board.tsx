import { useLocalStorageState } from '../../../hooks/useLocalStorage';
import {
  calculateNextValue,
  calculateStatus,
  calculateWinner,
} from '../common/game-utils';

export const Board = () => {
  const [squares, setSquares] = useLocalStorageState({
    key: 'squares',
    defaultValue: () => Array(9).fill(null),
  });

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
      <button className='game-restart' onClick={restart}>
        Restart
      </button>
    </div>
  );
};
