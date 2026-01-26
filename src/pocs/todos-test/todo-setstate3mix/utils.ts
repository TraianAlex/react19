export const randomString = () => Math.random().toString(36).slice(2);

export const uppercaseWords = (str: string) =>
  str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

export const toCamelCase = (str: string) =>
  str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

export const rgbToHex = (r: number, g: number, b: number) =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

export const clearCookies = () =>
  document.cookie
    .split(';')
    .forEach(
      (c) =>
        (document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)),
    );

export const pause = (millis: number) =>
  new Promise((resolve) => setTimeout(resolve, millis));

export const randomColor = () =>
  `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

export const dayOfYear = (date: Date) =>
  Math.floor(
    (+date - +new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
  );

export const randomOneToTwenty = () => Math.floor(Math.random() * 20) + 1;
