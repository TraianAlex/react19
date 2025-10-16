import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';

import { displayError, generateId } from '../../../../shared/utils/utils';
import { useLocalStorage } from './useLocalStorage';
import { Todo } from '../Context';

const TodoLocalForm = ({
  isEdit,
  setIsEdit,
}: {
  isEdit: string;
  setIsEdit: (id: string) => void;
}) => {
  const { todos, createTodo, updateTodo } = useLocalStorage();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const onCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === '' || title.length < 2) {
      displayError('Please enter a todo!', setError);
      return;
    }

    const newTodo = {
      id: generateId(todos).toString() as string,
      title,
      completed: false,
    } as Todo;

    isEdit ? updateTodo(isEdit, newTodo) : createTodo(newTodo);

    setTitle('');
    setIsEdit('');
  };

  useEffect(() => {
    if (isEdit) {
      const todo = todos.find((todo: Todo) => todo.id === isEdit);
      if (todo) {
        setTitle(todo.title);
      }
    }
  }, [isEdit]);

  return (
    <>
      <Form
        className='d-flex justify-content-center align-items-center mt-4'
        onSubmit={onCreateTodo}
        data-testid='todo-form'
      >
        <Form.Group
          as={Col}
          controlId='text'
          style={{ marginBottom: 0, paddingLeft: 0 }}
        >
          <Form.Control
            type='text'
            name='title'
            data-testid='todo-input'
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            placeholder='Things you wanna do...'
            required
          />
        </Form.Group>
        <Button
          type='submit'
          role='submit'
          variant='light'
          className='todo-item rotate-center'
        >
          Save
        </Button>
      </Form>
      {error && (
        <Alert variant='danger' className='mt-2' data-testid='todo-error'>
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>
      )}
    </>
  );
};

export default TodoLocalForm;
