import { Board } from './board';
import '../common/game.scss';

export const Game3 = () => {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
    </div>
  );
};

export default Game3;
