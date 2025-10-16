import { useMemo } from 'react';

import { useLocalStorageState } from '../../../../hooks/useLocalStorage';
import TodoLocalContext from '../Context';

const TodoLocalState = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useLocalStorageState({
    key: 'todos',
    defaultValue: [],
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const value = useMemo(() => [state, setState], [setState, state]);

  return (
    <TodoLocalContext.Provider value={value as [any, (action: any) => void]}>
      {children}
    </TodoLocalContext.Provider>
  );
};

export default TodoLocalState;
