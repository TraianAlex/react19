import { useCallback, useState } from 'react';

export const useSetState = (initialState: any) => {
  const [state, set] = useState(initialState);
  const setState = useCallback((patch: (arg0: any) => any) => {
    set((prevState: any) =>
      Object.assign(
        {},
        prevState,
        patch instanceof Function ? patch(prevState) : patch,
      ),
    );
  }, []);

  return [state, setState];
};
