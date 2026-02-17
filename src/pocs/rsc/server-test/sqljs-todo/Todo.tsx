import { Dispatch } from 'react';
import { deleteTodo, Todo as TodoType, toggleTodo, updateTodoText } from './server/actions';
import { EditorState, initialEditor, TodosAction } from './state';

type TodoProps = {
  dispatch: Dispatch<TodosAction>;
  todo: TodoType;
  todos: TodoType[];
  editor: EditorState;
  loading: boolean;
};

const Todo = ({ dispatch, todo, todos, editor, loading }: TodoProps) => {
  const isEditing = editor.id === todo.id;

  const handleToggle = async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const updated = await toggleTodo(todo.id);
      dispatch({
        type: 'SET_TODOS',
        todos: todos.map((item) => (item.id === todo.id ? updated : item)),
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to update todo',
      });
    }
  };

  const handleEditStart = () => {
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
        todos: todos.map((item) => (item.id === editor.id ? updated : item)),
      });
      dispatch({ type: 'SET_EDITOR', editor: initialEditor });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to update todo',
      });
    }
  };

  const handleDelete = async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      await deleteTodo(todo.id);
      dispatch({
        type: 'SET_TODOS',
        todos: todos.filter((item) => item.id !== todo.id),
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Failed to delete todo',
      });
    }
  };

  return (
    <li
      className='list-group-item d-flex align-items-center justify-content-between'
    >
      <div className='d-flex align-items-center gap-2 flex-grow-1'>
        <input type='checkbox' checked={todo.completed} onChange={handleToggle} />
        {isEditing ? (
          <input
            type='text'
            className='form-control'
            value={editor.value}
            onChange={(event) => handleEditorValueChange(event.target.value)}
          />
        ) : (
          <span
            className={todo.completed ? 'text-decoration-line-through' : ''}
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
              onClick={handleEditStart}
              disabled={loading}
            >
              Edit
            </button>
            <button
              type='button'
              className='btn btn-sm btn-outline-danger'
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Todo;
