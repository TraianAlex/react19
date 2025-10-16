import { createContext } from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

export default createContext<[any, (action: Action) => void] | null>(null);
