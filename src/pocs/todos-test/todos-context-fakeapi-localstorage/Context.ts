import { createContext } from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface State {
  todos: Todo[];
  todo: Todo | null;
  title: string;
  loading: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export default createContext<[State, (action: Action) => void] | null>(null);
