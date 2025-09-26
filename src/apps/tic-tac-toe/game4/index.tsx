import { Board } from './board';
import '../common/game.scss';

export default function Game4() {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
    </div>
  );
}
