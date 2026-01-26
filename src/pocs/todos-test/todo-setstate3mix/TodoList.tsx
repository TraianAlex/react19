import { TodosState } from './TodoStore';
import { useSelector, todoDeleteHandler } from './actions';

const TodoList = () => {
  const todos = useSelector<TodosState[]>((state) => state.todos);

  console.log('render TodoList');

  return (
    <ul className='list-group'>
      {todos?.map((todo: any) => (
        <li key={todo.id} className='list-group-item d-flex justify-content-between align-items-center'>
          <span className='flex-grow-1 me-2'>
            {todo.text} {crypto.randomUUID().slice(0, 5)}
          </span>
          <button className='btn btn-outline-danger btn-sm' onClick={todoDeleteHandler.bind(null, todo.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
