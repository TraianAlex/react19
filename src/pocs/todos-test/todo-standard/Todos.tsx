import { useCallback, useState } from 'react';

import TodoList from './TodoList';
import NewTodoForm from './NewTodo';
import { Decoration } from './Decoration';
import { Count } from './Count';
import { List } from './List';

interface TodoState {
  id: string;
  text: string;
}

const TodosBasic = () => {
  const [title] = useState<string>('Default state');
  const [todos, setTodos] = useState<TodoState[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [user,] = useState<string | undefined>('Alex');

  const todoAddHandler = useCallback((text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
    setCount((prevCount) => prevCount + 1);
  }, []);

  const createList = useCallback((text: string) => {
    setList((prevList) => [...prevList, text]);
  }, []);

  const todoDeleteHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
    setCount((prevCount) => prevCount - 1);
  }, []);

  console.log('render TodosBasic component');

  return (
    <div className='container-fluid'>
      <Decoration title={title} />
      <List list={list} />
      <NewTodoForm
        onAddTodo={todoAddHandler}
        createList={createList}
        user={user}
      />
      <Count count={count} />
      <TodoList todos={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default TodosBasic;
