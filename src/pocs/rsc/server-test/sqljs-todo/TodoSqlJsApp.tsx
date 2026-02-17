import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { createTodo, getTodos, Todo } from './server/actions';
import { initialTodosState, TodosReducer } from './state';
import TodoList from './TodoList';

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
        </span>{loading && <span className='ms-2'>Working...</span>}
      </div>
      {error && <p className='text-danger mt-2'>{error}</p>}
      <TodoList
        dispatch={dispatch}
        todos={todos}
        editor={editor}
        loading={loading}
      />
    </div>
  );
};

export default TodoSqlJsApp;
