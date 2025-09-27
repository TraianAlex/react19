import { Key } from 'react';

import { useLocalStorageState } from '../../../hooks/useLocalStorage';
import {
  calculateNextValue,
  calculateStatus,
  calculateWinner,
} from '../common/game-utils';
import { Board } from './board';
import '../common/game.scss';

export const Game6 = () => {
  const [history, setHistory] = useLocalStorageState({
    key: 'tic-tac-toe:history',
    defaultValue: [Array(9).fill(null)],
  });
  const [currentStep, setCurrentStep] = useLocalStorageState({
    key: 'tic-tac-toe:step',
    defaultValue: 0,
  });

  const currentSquares = history[currentStep];
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus(winner, currentSquares);

  const onSelectSquare = (square: number) => {
    if (winner || currentSquares[square]) {
      return;
    }

    const newHistory = history.slice(0, currentStep + 1);
    const squares = [...currentSquares];

    squares[square] = calculateNextValue(currentSquares);
    setHistory([...newHistory, squares]);
    setCurrentStep(newHistory.length);
  };

  const restart = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  };

  const moves = history.map(
    (stepSquares: any, step: Key | null | undefined) => {
      const desc = step ? `Go to move #${step}` : 'Go to game start';
      const isCurrentStep = step === currentStep;
      return (
        <li key={step}>
          <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
            {!isCurrentStep ? desc : ''}{' '}
            {isCurrentStep ? `Current #${step}` : null}
          </button>
        </li>
      );
    }
  );

  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <Board onClick={onSelectSquare} squares={currentSquares} />
          <button className='game-restart' onClick={restart}>
            Restart
          </button>
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      <div className='game-history'>
        <div className='game-history'>
          <ol>
            <li>history: {JSON.stringify(history)}</li>
            <li>currentStep: {currentStep}</li>
            <li>
              currentSquares: {currentSquares.join(', ')} (history[currentStep])
            </li>
            <li>newHistory: {JSON.stringify(history.slice(0, currentStep + 1))}</li>
            <li>squares: {[...currentSquares].join(', ')}</li>
            <li>nextValue: {calculateNextValue(currentSquares)}</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Game6;
