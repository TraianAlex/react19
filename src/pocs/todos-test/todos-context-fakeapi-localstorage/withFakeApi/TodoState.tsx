import { ReactNode, useMemo, useReducer } from 'react';
import TodoContext from '../Context';
import TodoReducer from './TodoReducer';

const TodoState = ({ children }: { children: ReactNode }) => {
  const initialState = {
    todos: [],
    title: '',
    loading: false,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const value = useMemo(
    () => [state, dispatch] as [any, (action: any) => void],
    [state]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoState;
