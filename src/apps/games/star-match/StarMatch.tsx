import { useState } from 'react';
import { PlayNumber } from './PlayNumber';
import { StarsDisplay } from './StarsDisplay';
import { PlayAgain } from './PlayAgain';
import { utils } from './utils';
import { useGameState } from './use-game-state';
import './StarMatch.scss';

const Game = ({ startNewGame }: { startNewGame: () => void }) => {
  const { range, sum } = utils;
  // const [stars, setStars] = useState(random(1, 9));
  // const [availableNums, setAvailableNums] = useState(range(1, 9));
  // const [candidateNums, setCandidateNums] = useState([]);
  // const [secondsLeft, setSecondsLeft] = useState(3);

  // useEffect(() => {
  //   if (secondsLeft > 0 && availableNums.length > 0) {
  //     const timerId = setTimeout(() => {
  //       setSecondsLeft(secondsLeft - 1);
  //     }, 1000);
  //     return () => clearTimeout(timerId);
  //   }
  // });
  const { stars, availableNums, candidateNums, secondsLeft, setGameState } =
    useGameState();

  const candidatesAreWrong = sum(candidateNums) > stars;
  const gameStatus =
    availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number: number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if ((candidateNums as number[]).includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (
    number: number,
    currentStatus: 'available' | 'used' | 'wrong' | 'candidate'
  ) => {
    if (gameStatus !== 'active' || currentStatus === 'used') {
      return;
    }
    const newCandidatesNums =
      currentStatus === 'available'
        ? [...candidateNums, number]
        : candidateNums.filter((cn) => cn !== number);

    // if (sum(newCandidatesNums) !== stars) {
    //   setCandidateNums(newCandidatesNums);
    // } else {
    //   const newAvailableNums = availableNums.filter(
    //     (n) => !newCandidatesNums.includes(n)
    //   );
    //   setStars(randomSumIn(newAvailableNums, 9));
    //   setAvailableNums(newAvailableNums);
    //   setCandidateNums([]);
    // }
    setGameState(newCandidatesNums);
  };

  return (
    <div className='game'>
      <div className='pt-5'>
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className='body'>
        <div className='left'>
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className='right'>
          {range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className='timer'>Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);

  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default StarMatch;
//jsdrops.com/rgs3.1 - 9
