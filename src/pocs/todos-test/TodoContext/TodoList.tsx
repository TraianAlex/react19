import { useContext } from 'react';

import TodoContext from './Context';

const TodoList = () => {
  const { todos, loading, deleteTodo } = useContext(TodoContext);

  return (
    <>
      {!loading &&
        todos &&
        todos.map((todo) => (
          <div
            key={todo.id}
            className='flex flex-row justify-between items-center todo-item'
          >
            <p>{todo.title}</p>
            <span className='remove-todo' onClick={() => deleteTodo(todo.id)}>
              &times;
            </span>
          </div>
        ))}
    </>
  );
};

export default TodoList;
