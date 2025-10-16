import { useLocalStorage } from './useLocalStorage';
import { Todo } from '../Context';

export const TodoItem = ({
  todo,
  onSetCompleted,
  onUpdate,
}: {
  todo: Todo;
  onSetCompleted: (id: string) => void;
  onUpdate: (id: string) => void;
}) => {
  const { deleteTodo } = useLocalStorage();

  const lineThrough = (completed: boolean) =>
    completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' };

  return (
    <div
      className='d-flex flex-row justify-content-between align-items-center mb-3 pt-2 pr-3 pb-2 pl-3 rounded todo-item'
      data-testid='todo-item'
    >
      <span
        style={lineThrough(todo.completed)}
        onClick={() => onSetCompleted(todo.id)}
        data-testid='todo-text'
        className='ms-2'
      >
        {todo.title}
      </span>
      <span className='d-inline-flex'>
        <i
          className='edit-todo pr-2 pl-2 fa fa-edit me-2'
          onClick={() => onUpdate(todo.id)}
        ></i>
        <i
          className='edit-todo pr-2 pl-2 fa fa-trash me-2'
          onClick={() => deleteTodo(todo.id)}
          data-testid='delete-button'
        ></i>
      </span>
    </div>
  );
};
