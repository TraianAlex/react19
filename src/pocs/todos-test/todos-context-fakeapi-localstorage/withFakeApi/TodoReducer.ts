import {
  SET_TODO_TITLE,
  GET_TODOS,
  CREATE_TODO,
  LOADING_TODO,
  ON_UPDATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  CLEAR_TODO_TITLE,
} from '../Types';
import { State, Action, Todo } from '../Context';

export default (state: State, { type, payload }: Action) => {
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        loading: false,
        todos: payload as Todo[],
      };
    case SET_TODO_TITLE:
      return {
        ...state,
        title: payload as string,
      };
    case LOADING_TODO:
      return {
        ...state,
        loading: payload as boolean,
      };
    case CREATE_TODO:
      return {
        ...state,
        loading: false,
        todos: [payload as Todo, ...state.todos],
      };
    case ON_UPDATE_TODO:
      return {
        ...state,
        todo: payload as Todo,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todo: null,
        loading: false,
        todos: [
          payload as Todo,
          ...state.todos.filter(
            (todo: Todo) => todo.id !== (payload as Todo).id
          ),
        ],
      };
    case CLEAR_TODO_TITLE:
      return {
        ...state,
        title: '',
      };
    case DELETE_TODO:
      return {
        ...state,
        loading: false,
        todos: state.todos.filter((todo: Todo) => todo.id !== payload),
      };
    default:
      return state;
  }
};
