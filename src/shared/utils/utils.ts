// generate an id starting from 1 or from the last id
export const generateId = (list: any[]) => {
  if (list && list.length) {
    return Math.max(...list.map((t) => t.id)) + 1;
  } else {
    return 1;
  }
};

// display an error for 3 sec
export const displayError = (err: string, setErr: (err: string) => void) => {
  setErr(err);
  const clearTimer = setTimeout(() => setErr(''), 3000);
  return () => clearTimeout(clearTimer);
};

// not used yet
export const handleResponse = (response: Response) => {
  return response.json().then((json: any) => {
    if (response.ok) {
      return json;
    } else {
      let error = Object.assign({}, json, {
        status: response.status,
        statusText: response.statusText,
      });
      return Promise.reject(error);
    }
  });
};

// random number between min and max (both included)
export const randomRangeMaxId = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//random number between min (included) and max (excluded)
//return Math.floor(Math.random() * (max - min) ) + min;

// mask a number (credit card number)
export const maskedNumber = (creditCard: string) => {
  const lastFourDigits = creditCard.slice(-4);
  return lastFourDigits.padStart(creditCard.length, '*');
};

export const sleep = (duration = 500): Promise<undefined> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, duration);
  });

export function block(ms: number = 500) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

export const makeExpensive = <T extends (...args: any[]) => any>(
  fn: T,
  duration = 500
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    block(duration);
    return fn(...args);
  };
};
