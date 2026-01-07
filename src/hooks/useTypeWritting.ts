import { useState, useEffect } from 'react';

export const useTypeWritting = (words: string[]) => {
  const [text, setText] = useState<string>('');
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [typeSpeed, setTypeSpeed] = useState<number>(3000);

  const type = (): void => {
    const current = wordIndex % words.length;
    const fullTxt = words[current];

    isDeleting
      ? setText(fullTxt.substring(0, text.length - 1))
      : setText(fullTxt.substring(0, text.length + 1));

    setTypeSpeed(300);

    if (isDeleting) {
      setTypeSpeed(150);
    }

    if (!isDeleting && text === fullTxt) {
      setTypeSpeed(3000);
      setIsDeleting(true);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      words.length > 1
        ? setWordIndex(wordIndex === words.length - 1 ? 0 : wordIndex + 1)
        : setWordIndex(0);
      setTypeSpeed(500);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => type(), typeSpeed);
    return () => clearTimeout(id);
  });

  return text;
};
