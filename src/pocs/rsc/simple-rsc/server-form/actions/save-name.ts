'use server';

export async function saveNameAction(
  prevState: { ok: boolean } | null,
  formData: FormData,
): Promise<{ ok: boolean }> {
  const name = formData.get('name');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Saving name:', { name });

  return { ok: true };
}

let dataState = 'GET Some data from server';

export type SaveSomethingResult = {
  success: boolean;
  data: string;
};

export const saveSomething = async (
  data: string,
): Promise<SaveSomethingResult> => {
  console.log('SERVER: Action received with data:', data);
  dataState = data ?? 'POST Some data from server';
  await new Promise((resolve) => setTimeout(resolve, 2000));
  revalidate();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: dataState });
    }, 1000);
  });
};

const fetchData = async (): Promise<any> => {
  console.log('SERVER: Fetching data');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: dataState });
    }, 1000);
  });
}

let cachedResultsPromise: Map<string, Promise<SaveSomethingResult>> = new Map();

export const getFetcheddataWithCache = async (): Promise<any> => {
  if (cachedResultsPromise.has('GET')) {
    return cachedResultsPromise.get('GET')!;
  }
  const resultPromise = fetchData();
  cachedResultsPromise.set('GET', resultPromise);
  return resultPromise;
};

export const saveSomethingWithCache = (): Promise<SaveSomethingResult> => {
  if (cachedResultsPromise.has('POST')) {
    return cachedResultsPromise.get('POST')!;
  }
  const resultPromise = saveSomething('POST Some data from client');
  cachedResultsPromise.set('POST', resultPromise);
  return resultPromise;
};

export const revalidate = () => {
  cachedResultsPromise.clear();
};

export const prefetchDataWithCache = () => {
  const promise = fetchData();
  cachedResultsPromise.set('GET', promise);
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
};
