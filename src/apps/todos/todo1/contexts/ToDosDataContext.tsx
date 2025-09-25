import { createContext } from 'react';

import useTodosData from '../hooks/useTodosData';

export const ToDosDataContext = createContext({
  todoList: [] as any[],
  loadingStatus: '',
  createTodo: (rec: any, callbackDone: () => void) => {},
  updateTodo: (rec: any, callbackDone: () => void) => {},
  deleteTodo: (id: any, callbackDone: () => void) => {},
  reFetch: (callbackDone: () => void) => Promise.resolve(),
});

export const TodosDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    todoList,
    loadingStatus,
    createTodo,
    updateTodo,
    deleteTodo,
    reFetch,
  } = useTodosData();

  const value = {
    todoList,
    loadingStatus,
    createTodo,
    updateTodo,
    deleteTodo,
    reFetch,
  };

  return (
    <ToDosDataContext.Provider value={value}>
      {children}
    </ToDosDataContext.Provider>
  );
};
