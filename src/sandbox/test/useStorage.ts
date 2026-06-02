import { SetStateAction, useEffect, useState } from 'react';

export const useStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: SetStateAction<T>) => void] => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      setState(JSON.parse(item) as T);
    }
  }, [key]);

  const setStoredState = (value: SetStateAction<T>) => {
    setState((prev) => {
      const next =
        typeof value === 'function'
          ? (value as (prevState: T) => T)(prev)
          : value;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return [state, setStoredState];
};
