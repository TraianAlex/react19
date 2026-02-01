import { Board } from './board';
import '../common/game.modules.scss';

export const Game4 = () => {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
    </div>
  );
};

export default Game4;
