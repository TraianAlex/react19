import { useContext } from 'react';

import TodoLocalContext, { Todo } from '../Context';

export const useLocalStorage = () => {
  const context = useContext(TodoLocalContext);
  if (!context) {
    throw new Error(`useLocalStorage must be used within a TodoLocalState`);
  }

  const todos = context[0] as unknown as Todo[];
  const setTodos = context[1] as unknown as (todos: Todo[]) => void;

  const createTodo = (newTodo: Todo) => setTodos([...todos, newTodo]);

  const updateTodo = (id: string, newTodo: Todo) => {
    todos.forEach((todo: Todo, index: number) => {
      if (todo.id === id) {
        todos.splice(index, 1);
      }
    });
    createTodo(newTodo);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo: Todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
