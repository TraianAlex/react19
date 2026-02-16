import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import {
  Todo,
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodoText,
} from './server/actions';

interface TodosState {
  todos: Todo[];
  text: string;
  loading: boolean;
  error: string | null;
  editor: EditorState;
}

type EditorState = {
  id: number | null;
  value: string;
};

const initialEditor: EditorState = { id: null, value: '' };
const initialTodosState: TodosState = {
  todos: [],
  text: '',
  loading: false,
  error: null,
  editor: initialEditor,
};

const TodosReducer = (state: typeof initialTodosState, action: any) => {
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

const TodoSqlJsApp = () => {
  const [state, dispatch] = useReducer(TodosReducer, initialTodosState);
  const { todos, text, loading, error, editor } = state;

  const completedCount = useMemo(
    () => todos.filter((todo: Todo) => todo.completed).length,
    [todos],
  );

  const refreshTodos = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const list = await getTodos();
      dispatch({ type: 'SET_TODOS', todos: list });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to load todos',
      });
    }
  }, []);

  useEffect(() => {
    void refreshTodos();
  }, [refreshTodos]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      dispatch({ type: 'SET_ERROR', error: 'Todo text is required.' });
      return;
    }
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const created = await createTodo(trimmed);
      dispatch({ type: 'SET_TODOS', todos: [created, ...todos] });
      dispatch({ type: 'SET_TEXT', text: '' });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to create todo',
      });
    }
  };

  const handleToggle = async (id: number) => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const updated = await toggleTodo(id);
      dispatch({
        type: 'SET_TODOS',
        todos: todos.map((todo: Todo) => (todo.id === id ? updated : todo)),
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to update todo',
      });
    }
  };

  const handleDelete = async (id: number) => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      await deleteTodo(id);
      dispatch({
        type: 'SET_TODOS',
        todos: todos.filter((todo: Todo) => todo.id !== id),
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to delete todo',
      });
    }
  };

  const handleEditStart = (todo: Todo) => {
    dispatch({ type: 'SET_EDITOR', editor: { id: todo.id, value: todo.text } });
  };

  const handleEditCancel = () => {
    dispatch({ type: 'SET_EDITOR', editor: initialEditor });
  };

  const handleEditSave = async () => {
    if (editor.id === null) {
      return;
    }
    const trimmed = editor.value.trim();
    if (!trimmed) {
      dispatch({ type: 'SET_ERROR', error: 'Todo text is required.' });
      return;
    }
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const updated = await updateTodoText(editor.id, trimmed);
      dispatch({
        type: 'SET_TODOS',
        todos: todos.map((todo: Todo) =>
          todo.id === editor.id ? updated : todo,
        ),
      });
      dispatch({ type: 'SET_EDITOR', editor: initialEditor });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to update todo',
      });
    }
  };

  return (
    <div className='bg-light text-dark w-auto p-4'>
      <h2>sql.js Todo Demo</h2>
      <p className='text-muted'>
        SQLite runs in WASM and persists to localStorage.
      </p>

      <form className='d-flex gap-2' onSubmit={handleCreate}>
        <input
          type='text'
          className='form-control'
          value={text}
          onChange={(event) =>
            dispatch({ type: 'SET_TEXT', text: event.target.value })
          }
          placeholder='Add a todo'
        />
        <button className='btn btn-primary' type='submit' disabled={loading}>
          {loading ? 'Waiting...' : 'Add'}
        </button>
      </form>

      <div className='mt-3'>
        <span className='badge bg-secondary'>
          {completedCount}/{todos.length} completed
        </span>
      </div>

      {error && <p className='text-danger mt-2'>{error}</p>}
      {loading && <p className='mt-2'>Working...</p>}

      <ul className='list-group mt-3'>
        {todos.map((todo: Todo) => {
          const isEditing = editor.id === todo.id;
          return (
            <li
              key={todo.id}
              className='list-group-item d-flex align-items-center justify-content-between'
            >
              <div className='d-flex align-items-center gap-2 flex-grow-1'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                {isEditing ? (
                  <input
                    type='text'
                    className='form-control'
                    value={editor.value}
                    onChange={(event) =>
                      dispatch({
                        type: 'SET_EDITOR',
                        editor: { ...editor, value: event.target.value },
                      })
                    }
                  />
                ) : (
                  <span
                    className={
                      todo.completed ? 'text-decoration-line-through' : ''
                    }
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              <div className='d-flex gap-2'>
                {isEditing ? (
                  <>
                    <button
                      type='button'
                      className='btn btn-sm btn-success'
                      onClick={handleEditSave}
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-secondary'
                      onClick={handleEditCancel}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-primary'
                      onClick={() => handleEditStart(todo)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-danger'
                      onClick={() => handleDelete(todo.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoSqlJsApp;
