import { useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

import { displayError } from '../../../../shared/utils/utils';
import { useFakeApi } from './useFakeApi';
import { Todo } from '../Context';

const TodoForm = () => {
  const [error, setError] = useState('');
  const { todo, title, setTodoTitle, createTodo, updateTodo, loading } =
    useFakeApi();

  const onCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '' || title.length < 2) {
      displayError('Please enter minimum 2 characters!', setError);
      return;
    }
    const newTodo = todo
      ? { id: todo.id, title, completed: false }
      : { title, completed: false };

    try {
      if (todo) {
        await updateTodo(newTodo as Todo);
        toast.success('Todo updated successfully');
      } else {
        await createTodo(newTodo as Todo);
        toast.success('Todo created successfully');
      }
    } catch (err) {
      displayError(err as string, setError);
    }
  };

  // set title directly in reducer ON_UPDATE_TODO
  // useEffect(() => {
  //   if (todo) {
  //     setTodoTitle(todo.title);
  //   }
  // }, [todo]);

  return (
    <>
      <form
        className='d-flex justify-content-center align-items-center mt-4'
        onSubmit={onCreateTodo}
      >
        <Form.Group
          as={Col}
          controlId='text'
          style={{ marginBottom: 0, paddingLeft: 0 }}
        >
          <Form.Control
            type='text'
            name='title'
            onChange={({ target }) => setTodoTitle(target.value)}
            value={title}
            placeholder='Things you wanna do...'
            required
            disabled={loading}
          />
        </Form.Group>
        <Button
          type='submit'
          variant='light'
          className='todo-item m-1'
          disabled={loading}
        >
          {loading ? (
            <span
              className='spinner-border spinner-border-sm me-2'
              role='status'
              aria-hidden='true'
            ></span>
          ) : null}
          Save
        </Button>
      </form>
      {error && (
        <Alert variant='danger' className='mt-2'>
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>
      )}
    </>
  );
};

export default TodoForm;
