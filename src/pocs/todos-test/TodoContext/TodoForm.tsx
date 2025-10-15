import React, { useContext } from 'react';

import TodoContext from './Context';

const TodoForm = () => {
  const { setTodoTitle, createTodo, title } = useContext(TodoContext);

  const onCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '') {
      alert('Fill the form');
      return;
    }
    createTodo(title);
  };

  return (
    <form
      className='flex justify-center items-center mt-4'
      onSubmit={onCreateTodo}
    >
      <input
        type='text'
        name='title'
        className='input'
        onChange={({ target }) => setTodoTitle(target.value)}
        value={title}
        placeholder='Things you wanna do...'
      />
      <button type='submit' className='btn btn-primary'>
        Save
      </button>
    </form>
  );
};

export default TodoForm;
