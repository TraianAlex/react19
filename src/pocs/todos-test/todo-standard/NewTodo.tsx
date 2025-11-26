import { useRef } from 'react';
import styled from 'styled-components';

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
  createList: (text: string) => void;
  user: string | undefined;
};

const NewTodoForm: React.FC<NewTodoProps> = ({
  onAddTodo,
  createList,
  user,
}) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const listInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const enteredText = formData.get('todo-text') as string;
    if (!enteredText || enteredText.trim() === '') {
      alert('Enter text');
      return;
    }
    onAddTodo(enteredText.trim());
    form.reset();
    textInputRef.current?.focus();
  };

  const createListHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const enteredText = formData.get('todo-list') as string;
    if (!enteredText || enteredText.trim() === '') {
      alert('Enter text');
      return;
    }
    createList(enteredText);
    form.reset();
    listInputRef.current?.focus();
  };

  console.log('render NewTodoForm component');

  return (
    <>
      <FormStyled onSubmit={createListHandler}>
        <div className='formControl'>
          <label htmlFor='todo-list' className='label'>
            Todo {user}
          </label>
          <input
            type='text'
            name='todo-list'
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
            name='todo-text'
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
