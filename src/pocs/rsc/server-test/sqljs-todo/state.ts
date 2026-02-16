import { Todo } from './server/actions';

interface TodosState {
  todos: Todo[];
  text: string;
  loading: boolean;
  error: string | null;
  editor: EditorState;
}

export type EditorState = {
  id: number | null;
  value: string;
};

export const initialEditor: EditorState = { id: null, value: '' };
export const initialTodosState: TodosState = {
  todos: [],
  text: '',
  loading: false,
  error: null,
  editor: initialEditor,
};

export type TodosAction =
  | { type: 'SET_TODOS'; todos: Todo[] }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_EDITOR'; editor: EditorState };

export const TodosReducer = (
  state: typeof initialTodosState,
  action: TodosAction
) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.todos, loading: false };
    case 'SET_TEXT':
      return { ...state, text: action.text };
    case 'SET_LOADING':
      return { ...state, loading: action.loading, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    case 'SET_EDITOR':
      return { ...state, editor: action.editor };
    default:
      return state;
  }
};
