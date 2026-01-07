import { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from './store';
import { todoAddHandler, createList } from './TodoStore';
import { todoStore } from './TodoStore';

const NewTodoForm: React.FC = () => {
  const user = useSelector(todoStore, 'user');
  const textInputRef = useRef<HTMLInputElement>(null);
  const listInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    if (enteredText === '') {
      alert('Enter text');
      return;
    }
    todoAddHandler(enteredText);
    textInputRef.current!.value = '';
  };

  const createListHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = listInputRef.current!.value;
    if (enteredText === '') {
      alert('Enter text');
      return;
    }
    createList(enteredText);
    listInputRef.current!.value = '';
  };

  console.log('render NewTodoForm');

  return (
    <>
      <FormStyled onSubmit={createListHandler}>
        <div className='formControl'>
          <label htmlFor='todo-text' className='label'>
            Todo {user}
          </label>
          <input
            type='text'
            id='todo-text'
            ref={listInputRef}
            className='input'
          />
        </div>
        <button type='submit' className='button'>
          ADD TO LIST
        </button>
      </FormStyled>
      <FormStyled onSubmit={todoSubmitHandler}>
        <div className='formControl'>
          <label htmlFor='todo-text' className='label'>
            Todo {user}
          </label>
          <input
            type='text'
            id='todo-list'
            ref={textInputRef}
            className='input'
          />
        </div>
        <button type='submit' className='button'>
          ADD TODO
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
  margin: 2rem auto;

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

  button {
    background: #50005a;
    border: 1px solid #50005a;
    color: white;
    padding: 0.3rem 1rem;
    cursor: pointer;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active {
    background: #6a0a77;
    border-color: #6a0a77;
  }
`;
