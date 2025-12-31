import { createStore } from './store';

export interface TodosState {
  id: string;
  text: string;
}

type TodosType = {
  todos: TodosState[];
  title: string;
  count: number;
  user: string;
  list: string[];
};

const initialState: TodosType = {
  todos: [],
  title: 'SetState1',
  count: 0,
  user: '',
  list: [],
};

export const todoStore = createStore(initialState);
