import { useEffect, useState } from 'react';

const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(mediaQueryList.matches);

  const listener = (event: MediaQueryListEvent) => {
    setDarkMode(event.matches);
  };

  useEffect(() => {
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return darkMode;
};
