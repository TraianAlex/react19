import { useState, useEffect } from 'react';
import { utils } from './utils';

export const useGameState = () => {
  const { random, range, sum, randomSumIn } = utils;
  const [stars, setStars] = useState(random(1, 9));
  const [availableNums, setAvailableNums] = useState(range(1, 9));
  const [candidateNums, setCandidateNums] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(12);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidatesNums: number[]) => {
    if (sum(newCandidatesNums) !== stars) {
      setCandidateNums(newCandidatesNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidatesNums.includes(n)
      );
      setStars(randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};
