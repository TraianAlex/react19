import { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from './actions';
import { todoAddHandler, createList, setCount, setCount2 } from './actions';

const NewTodoForm = () => {
  // const [user] = useStore('user');
  const user = useSelector<string>((state) => state.user);
  const textInputRef = useRef<HTMLInputElement>(null);
  const listInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const enteredText = formData.get('todo-text') as string;
    if (enteredText === '') {
      todoAddHandler('test');
      return;
    }
    todoAddHandler(enteredText);
    form.reset();
    textInputRef.current?.focus();
  };

  const createListHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const enteredText = formData.get('todo-list') as string;
    if (enteredText === '') {
      createList('test');
      return;
    }
    createList(enteredText);
    form.reset();
    listInputRef.current?.focus();
  };

  const handleClick1 = () => {
    setCount(1);
  };

  const handleClick2 = () => {
    setCount2(1);
  };

  console.log('render NewTodoForm');

  return (
    <>
    <FormStyled onSubmit={createListHandler}>
        <div className="formControl">
          <label htmlFor="todo-text" className="label">
            Todo {user}
          </label>
          <input
            type="text"
            name="todo-list"
            ref={listInputRef}
            className="input"
            placeholder='add something or just click Add To List button'
          />
        </div>
        <button type="submit" className="btn btn-outline-primary ms-2">
          ADD TO LIST
        </button>
      </FormStyled>
      <FormStyled onSubmit={todoSubmitHandler}>
        <div className="formControl">
          <label htmlFor="todo-text" className="label">
            Todo {user}
          </label>
          <input
            type="text"
            name="todo-text"
            ref={textInputRef}
            className="input"
            placeholder='add something or just click Add Todo button'
          />
        </div>
        <button type="submit" className="btn btn-outline-primary ms-2">
          ADD TODO
        </button>
      </FormStyled>
      <FormStyled>
        <button onClick={handleClick1} type="button" className="btn btn-outline-primary ms-2">
            COUNT1
          </button>
          <button onClick={handleClick2} type="button" className="btn btn-outline-primary ms-2">
            COUNT2
          </button>
        </FormStyled>
    </>
  );
};

export default NewTodoForm;

const FormStyled = styled.form`
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 40rem;
  margin: 1rem auto;

  .formControl {
    display: flex;
    align-items: center;
    flex: 1;
  }

  label,
  input {
    margin-right: 0.5rem;
  }

  label {
    font-weight: bold;
  }

  input {
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.25rem;
  }

  input:focus {
    outline: none;
    border-color: #50005a;
  }
`;
