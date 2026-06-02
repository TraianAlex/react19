import { createContext, useReducer, useContext, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodosContextType {
  state: TodoItem[];
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string };

const initialTodos: TodoItem[] = [
  {
    id: '1',
    text: 'Buy groceries',
    completed: false,
  },
];

const todoReducer = (state: TodoItem[], action: Action): TodoItem[] => {
  switch (action.type) {
    case 'ADD':
      if (!action.text.trim()) return state;
      const newTodo: TodoItem = {
        id: uuidv4(),
        text: action.text,
        completed: false,
      };
      return [...state, newTodo];
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};

export const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  return <TodosContext.Provider value={{ state, dispatch }}>{children}</TodosContext.Provider>;
};

export const useTodoContext = (): TodosContextType => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
