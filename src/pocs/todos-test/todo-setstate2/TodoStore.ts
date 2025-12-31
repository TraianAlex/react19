import { createGlobalState } from './createGlobalState';

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
  title: 'SetState2',
  count: 0,
  user: '',
  list: [],
};

const { setGlobalState, useGlobalState } = createGlobalState(initialState);

setGlobalState('user', 'Alex2');

export const todoAddHandler = (text: string) => {
  setGlobalState('todos', (v) => [
    ...v,
    { id: Math.random().toString(), text: text },
  ]);
  setGlobalState('count', (v) => v + 1);
};

export const createList = (text: string) => {
  setGlobalState('list', (v) => [...v, text]);
};

export const todoDeleteHandler = (todoId: string) => {
  setGlobalState('todos', (v) =>
    v.filter((todo: TodosState) => todo.id !== todoId),
  );
  setGlobalState('count', (v) => v - 1);
};

export const setCount = (text: number) => {
  setGlobalState('count', (v) => v + 1);
};

export { useGlobalState };
