import { useCallback, useContext, Dispatch, SetStateAction } from 'react';

import TodoLocalContext, { Todo } from '../Context';

export const useLocalStorage = () => {
  const context = useContext(TodoLocalContext);
  if (!context) {
    throw new Error(`useLocalStorage must be used within a TodoLocalState`);
  }

  const todos = context[0] as unknown as Todo[];
  const setTodos = context[1] as unknown as Dispatch<SetStateAction<Todo[]>>;

  const createTodo = useCallback(
    (newTodo: Todo) => setTodos((oldTodos) => [...oldTodos, newTodo]),
    [setTodos]
  );

  const updateTodo = useCallback(
    (id: string, newTodo: Todo) => {
      const newTodos = todos.map((todo: Todo) => {
        if (todo.id === id) {
          return newTodo;
        }
        return todo;
      });
      // todos.forEach((todo: Todo, index: number) => {
      //   if (todo.id === id) {
      //     todos.splice(index, 1);
      //   }
      // });
      setTodos(newTodos);
    },
    [setTodos, todos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((oldTodos) => oldTodos.filter((todo: Todo) => todo.id !== id));
    },
    [setTodos]
  );

  return {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
