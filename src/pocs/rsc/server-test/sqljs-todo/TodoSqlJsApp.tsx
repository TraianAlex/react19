import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Todo,
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodoText,
} from './server/actions';

type EditorState = {
  id: number | null;
  value: string;
};

const initialEditor: EditorState = { id: null, value: '' };

const TodoSqlJsApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>(initialEditor);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  const refreshTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getTodos();
      setTodos(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshTodos();
  }, [refreshTodos]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Todo text is required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const created = await createTodo(trimmed);
      setTodos((prev) => [created, ...prev]);
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = (todo: Todo) => {
    setEditor({ id: todo.id, value: todo.text });
  };

  const handleEditCancel = () => {
    setEditor(initialEditor);
  };

  const handleEditSave = async () => {
    if (editor.id === null) {
      return;
    }
    const trimmed = editor.value.trim();
    if (!trimmed) {
      setError('Todo text is required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTodoText(editor.id, trimmed);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === editor.id ? updated : todo))
      );
      setEditor(initialEditor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-light text-dark w-auto p-4'>
      <h2>sql.js Todo Demo</h2>
      <p className='text-muted'>SQLite runs in WASM and persists to localStorage.</p>

      <form className='d-flex gap-2' onSubmit={handleCreate}>
        <input
          type='text'
          className='form-control'
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder='Add a todo'
        />
        <button className='btn btn-primary' type='submit' disabled={loading}>
          Add
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
        {todos.map((todo) => {
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
                      setEditor((prev) => ({ ...prev, value: event.target.value }))
                    }
                  />
                ) : (
                  <span className={todo.completed ? 'text-decoration-line-through' : ''}>
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
