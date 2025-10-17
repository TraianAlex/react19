import { createContext } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  title: string;
  loading: boolean;
  setTodoTitle: (title: string) => void;
  createTodo: (title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export default createContext<TodoContextType>({
  todos: [],
  title: '',
  loading: false,
  setTodoTitle: (title: string) => {},
  createTodo: async (title: string) => {},
  deleteTodo: async (id: string) => {},
});
