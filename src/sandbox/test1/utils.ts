import { FLAG } from './flag';

export const MAX_GUESSES = 5;
export const WORD_LENGTH = 5;

export const SECRET_WORD_URL = `data:text/plain,${FLAG.trim()}`;

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
export const extractHiddenUrlFromDom = () => {
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

export const loadSecretWord = async (): Promise<string> => {
  const url = extractHiddenUrlFromDom();
  if (!url) {
    return FLAG.trim().toUpperCase();
  }

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

  return rawWord.trim().toUpperCase();
};

export const getCellColor = (secretWord: string, guess: string, index: number) => {
  const char = guess[index];
  if (!char) return undefined;
  if (secretWord[index] === char) return 'green';
  if (secretWord.includes(char)) return 'yellow';
  return 'red';
};
