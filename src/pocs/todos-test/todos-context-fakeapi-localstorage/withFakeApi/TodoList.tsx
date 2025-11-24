import { useEffect } from 'react';

import { useFakeApi } from './useFakeApi';
import 'font-awesome/css/font-awesome.css';
import { Todo } from '../Context';
import { LoaderMessage } from '../../../../components/LoaderMessage';

const TodoList = () => {
  const { getTodos, todos, loading, onUpdateTodo, deleteTodo } = useFakeApi();

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return (
      <div>
        <LoaderMessage
          loadingMsg='Loading todos...'
          doneMsg='Todos loaded'
          isLoading={loading}
        />
      </div>
    );
  }

  return (
    <>
      {!loading &&
        todos &&
        todos.map((todo: Todo) => (
          <div
            key={todo.id}
            className='d-flex flex-row justify-content-between align-items-center mb-3 pt-2 pr-3 pb-0 pl-3 rounded todo-item'
          >
            <p className='ms-2'>{todo.title}</p>
            <span className='d-inline-flex'>
              <i
                className='edit-todo pr-2 pl-2 fa fa-edit me-2'
                onClick={() => onUpdateTodo(todo)}
              ></i>
              <i
                className='edit-todo pr-2 pl-2 fa fa-trash me-2'
                onClick={() => deleteTodo(todo.id)}
              ></i>
            </span>
          </div>
        ))}
    </>
  );
};

export default TodoList;
