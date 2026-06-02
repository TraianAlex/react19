import { FormEvent, useEffect, useMemo, useState } from 'react';
import { FLAG } from './flag';
import { getCellColor, loadSecretWord, MAX_GUESSES, WORD_LENGTH } from './utils';
import { HiddenWordSource } from './HiddenWordSource';

const Test1 = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState<'loading' | 'playing' | 'won' | 'lost' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const init = async () => {
      try {
        const normalized = await loadSecretWord();
        const expectedFlag = FLAG.trim().toUpperCase();

        if (normalized.length !== WORD_LENGTH || expectedFlag.length !== WORD_LENGTH) {
          throw new Error('Secret word must be 5 letters');
        }

        if (normalized !== expectedFlag) {
          throw new Error('FLAG does not match fetched word');
        }

        setSecretWord(normalized);
        setStatus('playing');
      } catch {
        setStatus('error');
      }
    };

    init();
  }, []);

  const message = useMemo(() => {
    if (status === 'won') return "You've won!";
    if (status === 'lost') return "You've lost!";
    if (status === 'error') return 'Could not load secret word.';
    return '';
  }, [status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== 'playing') return;

    const guess = currentGuess.trim().toUpperCase();
    if (guess.length !== WORD_LENGTH) return;

    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);
    setCurrentGuess('');

    if (guess === secretWord) {
      setStatus('won');
      return;
    }

    if (nextGuesses.length >= MAX_GUESSES) {
      setStatus('lost');
    }
  };

  return (
    <>
      <HiddenWordSource />
      {status === 'loading' ? <div>Loading</div> : null}
      {status !== 'loading' ? (
        <div>
          <div>
            {Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
              const guess = guesses[rowIndex] ?? '';
              return (
                <div key={rowIndex}>
                  {Array.from({ length: WORD_LENGTH }, (_, colIndex) => {
                    const char = guess[colIndex] ?? '';
                    return (
                      <span
                        key={colIndex}
                        style={{
                          display: 'inline-block',
                          width: 24,
                          height: 24,
                          margin: 2,
                          textAlign: 'center',
                          lineHeight: '24px',
                          border: '1px solid #ccc',
                          backgroundColor: getCellColor(secretWord, guess, colIndex),
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {message ? <p>{message}</p> : null}

          <form onSubmit={handleSubmit}>
            <input
              value={currentGuess}
              onChange={(event) => setCurrentGuess(event.target.value.slice(0, WORD_LENGTH))}
              disabled={status !== 'playing'}
              aria-label='Guess input'
            />
            <button type='submit' disabled={status !== 'playing'}>
              Guess
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Test1;
