import { Dispatch } from 'react';
import { deleteTodo, Todo, toggleTodo, updateTodoText } from './server/actions';
import { EditorState, initialEditor, TodosAction } from './state';

type TodoListProps = {
  dispatch: Dispatch<TodosAction>;
  todos: Todo[];
  editor: EditorState;
  loading: boolean;
};

const TodoList = ({ dispatch, todos, editor, loading }: TodoListProps) => {
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

  const handleEditStart = (todo: Todo) => {
    dispatch({ type: 'SET_EDITOR', editor: { id: todo.id, value: todo.text } });
  };

  const handleEditCancel = () => {
    dispatch({ type: 'SET_EDITOR', editor: initialEditor });
  };

  const handleEditorValueChange = (value: string) => {
    dispatch({
      type: 'SET_EDITOR',
      editor: { ...editor, value },
    });
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

  return (
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
                    handleEditorValueChange(event.target.value)
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
  );
};

export default TodoList;
