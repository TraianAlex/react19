import { useState } from 'react';
import { Container } from 'react-bootstrap';

import './TodoApp.modules.scss';
import TodoLocalList from './useLocalStorage/TodoLocalList';
import TodoLocalForm from './useLocalStorage/TodoLocalForm';
import TodoLocalState from './useLocalStorage/TodoLocalState';
import TodoForm from './withFakeApi/TodoForm';
import TodoState from './withFakeApi/TodoState';
import TodoList from './withFakeApi/TodoList';

const TodoApp = () => {
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [toggle, setToggle] = useState(true);

  return (
    <Container className="d-flex flex-column pt-5 todo-context">
      <h3>Todo App with {toggle ? 'Local Storage' : 'Context and fakeAPI'}</h3>
      <span
        className="clearfix float-right font-weight-light text-black-50"
        onClick={() => setToggle(!toggle)}
      >
        Toggle local storage or fake api
      </span>
      {toggle ? (
        <TodoLocalState>
          <TodoLocalForm isEdit={isEdit as string} setIsEdit={setIsEdit} />
          <div className="mt-4">
            <TodoLocalList setIsEdit={setIsEdit} />
          </div>
        </TodoLocalState>
      ) : (
        <TodoState>
          <TodoForm />
          <div className="mt-4">
            <TodoList />
          </div>
        </TodoState>
      )}
    </Container>
  );
};

export default TodoApp;
