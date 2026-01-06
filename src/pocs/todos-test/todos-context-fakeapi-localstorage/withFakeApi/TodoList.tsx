import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import 'font-awesome/css/font-awesome.css';

import { useFakeApi } from './useFakeApi';
import { Todo } from '../Context';
import { LoaderMessage } from '../../../../components/LoaderMessage';
import { displayError } from '../../../../shared/utils/utils';

const TodoList = () => {
  const [error, setError] = useState<string | null>(null);
  const { getTodos, todos, loading, onUpdateTodo, deleteTodo } = useFakeApi();

  useEffect(() => {
    const getData = async () => {
      try {
        await getTodos();
      } catch (err) {
        displayError(err as string, setError);
      }
    };
    getData();
  }, []);

  const onDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      toast.success('Todo deleted successfully');
    } catch (err) {
      displayError(err as string, setError);
    }
  };

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
      {error && <Alert variant='danger'>{error}</Alert>}
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
                onClick={() => onDeleteTodo(todo.id)}
              ></i>
            </span>
          </div>
        ))}
    </>
  );
};

export default TodoList;
