import { useTodoContext, type TodoItem } from './TodoContext';

export const useTodo = (): {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
} => {
  const context = useTodoContext();
  const state = context.state;
  const dispatch = context.dispatch;

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    dispatch({ type: 'ADD', text: text });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE', id: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE', id: id });
  };

  return {
    todos: state,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
