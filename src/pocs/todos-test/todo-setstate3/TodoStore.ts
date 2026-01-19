import { createStore, State } from './store';
import { uppercaseWords } from './utils';

/* CONFIG */
export interface TodosState {
  id: string;
  text: string;
}

type TodosType = {
  todos: TodosState[];
  title: string;
  subTitle: string;
  count: number;
  count2: number;
  user: string;
  list: string[];
  render: boolean;
};

const initialState: TodosType = {
  todos: [],
  title: 'SetState3',
  subTitle: '',
  count: 0,
  count2: 0,
  user: '',
  list: [],
  render: false,
};

const { setState, useSelector, useStore } = createStore(initialState);

/* USE */
setState('user', 'Alex');

export const setSubTitle = (text: string) => {
  setState('subTitle', uppercaseWords(text.slice(0, 20)));
};

export const todoAddHandler = (text: string) => {
  setState('todos', (p: State['count']) => [
    ...p,
    { id: Math.random().toString(), text: text },
  ]);
  setState('count', (p: State['count']) => p + 1);
};

export const createList = (text: string) => {
  setState('list', (p: State['list']) => [...p, text]);
};

export const todoDeleteHandler = (todoId: string) => {
  setState('todos', (p: State['todos']) => [
    ...p.filter((todo: TodosState) => todo.id !== todoId),
  ]);
  setState('count', (p: State['count']) => p - 1);
};

export const setCount = (nr: number) => {
  setState('count', (p: State['count']) => p + nr);
};

export const setCount2 = (nr: number) => {
  setState('count2', (p: State['count2']) => p + nr);
};

// export const setRender = (value: boolean) => {
//   setState('render', (p: State['render']) => !value);
// }

export { useSelector, useStore };
