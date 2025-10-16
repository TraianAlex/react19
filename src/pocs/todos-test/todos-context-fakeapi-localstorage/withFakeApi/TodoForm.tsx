import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { displayError } from '../../../../shared/utils/utils';
import { useFakeApi } from './useFakeApi';

const TodoForm = () => {
  const [error, setError] = useState('');
  const { todo, title, setTodoTitle, createTodo, updateTodo } = useFakeApi();

  const onCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === '' || title.length < 2) {
      displayError('Please enter a todo!', setError);
      return;
    }

    const newTodo = todo
      ? { id: todo.id, title, completed: false }
      : { title, completed: false };

    todo ? updateTodo(newTodo) : createTodo(newTodo);
  };

  useEffect(() => {
    if (todo) {
      setTodoTitle(todo.title);
    }
  }, [todo]);

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
          />
        </Form.Group>
        <Button type='submit' variant='light' className='todo-item'>
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
