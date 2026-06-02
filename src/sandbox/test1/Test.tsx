import { FormEvent, useEffect, useMemo, useState } from 'react';
import { FLAG } from './flag';

const MAX_GUESSES = 5;
const WORD_LENGTH = 5;

/**
 * Bonus script used in browser console to extract the hidden URL:
 * const chars = [];
 * for (const section of document.querySelectorAll('section')) {
 *   const id = section.getAttribute('data-id') ?? '';
 *   if (!id.startsWith('92')) continue;
 *   for (const article of section.querySelectorAll('article')) {
 *     const dataClass = article.getAttribute('data-class') ?? '';
 *     if (!dataClass.endsWith('45')) continue;
 *     for (const div of article.querySelectorAll('div')) {
 *       const dataTag = div.getAttribute('data-tag') ?? '';
 *       if (!dataTag.includes('78')) continue;
 *       for (const b of div.querySelectorAll('b.ref[value]')) {
 *         chars.push(b.getAttribute('value') ?? '');
 *       }
 *     }
 *   }
 * }
 * const url = chars.join('');
 */
const extractHiddenUrlFromDom = () => {
  const chars: string[] = [];

  for (const section of document.querySelectorAll('section')) {
    const dataId = section.getAttribute('data-id') ?? '';
    if (!dataId.startsWith('92')) continue;

    for (const article of section.querySelectorAll('article')) {
      const dataClass = article.getAttribute('data-class') ?? '';
      if (!dataClass.endsWith('45')) continue;

      for (const div of article.querySelectorAll('div')) {
        const dataTag = div.getAttribute('data-tag') ?? '';
        if (!dataTag.includes('78')) continue;

        for (const b of div.querySelectorAll('b.ref[value]')) {
          chars.push(b.getAttribute('value') ?? '');
        }
      }
    }
  }

  return chars.join('');
};

const Test = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState<'loading' | 'playing' | 'won' | 'lost' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const fetchSecretWord = async () => {
      const url = extractHiddenUrlFromDom();
      if (!url) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to load secret word');
        }

        const contentType = response.headers.get('content-type') ?? '';
        const payload = contentType.includes('application/json')
          ? await response.json()
          : await response.text();

        const rawWord =
          typeof payload === 'string'
            ? payload
            : typeof payload?.word === 'string'
              ? payload.word
              : '';
        const normalized = rawWord.trim().toUpperCase();
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

    fetchSecretWord();
  }, []);

  const message = useMemo(() => {
    if (status === 'won') return "You've won!";
    if (status === 'lost') return "You've lost!";
    if (status === 'error') return 'Could not load secret word.';
    return '';
  }, [status]);

  const getCellColor = (guess: string, index: number) => {
    const char = guess[index];
    if (!char) return undefined;
    if (secretWord[index] === char) return 'green';
    if (secretWord.includes(char)) return 'yellow';
    return 'red';
  };

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

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  return (
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
                      backgroundColor: getCellColor(guess, colIndex),
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
  );
};

export default Test;
