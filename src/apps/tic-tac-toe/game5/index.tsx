import { Board } from './board';
import '../common/game.scss';

export default function Game5() {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
    </div>
  );
}
