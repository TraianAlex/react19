import { useEffect, useState } from 'react';

import TodoList from './TodoList';
import NewTodoForm from './NewTodo';
import { Decoration } from './Decoration';
import { Count } from './Count';
import { List } from './List';

interface TodoState {
  id: string;
  text: string;
}

const TodosBasic: React.FC = () => {
  const [title] = useState<string>('Default state');
  const [todos, setTodos] = useState<TodoState[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [user, setUser] = useState<string | undefined>();

  useEffect(() => {
    setUser('Alex');
  }, []);

  const todoAddHandler = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
    setCount(count + 1);
  };

  const createList = (text: string) => {
    setList([...list, text]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
    setCount(count - 1);
  };

  console.log('render TodosBasic component');

  return (
    <>
      <Decoration title={title} />
      <List list={list} />
      <NewTodoForm
        onAddTodo={todoAddHandler}
        createList={createList}
        user={user}
      />
      <TodoList todos={todos} onDeleteTodo={todoDeleteHandler} />
      <Count count={count} />
    </>
  );
};

export default TodosBasic;
