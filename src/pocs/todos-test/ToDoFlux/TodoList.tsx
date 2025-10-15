interface Todo {
  title: string;
}

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  const todoItems = todos.map((todo, i) => (
    <li className='list-group-item' key={i}>
      {todo.title}
    </li>
  ));

  return <ul className='list-group mt-2'>{todoItems}</ul>;
};

/**********************************************************
import React from "react";

export default function TodoList({ todos }) {
  const todoItems = todos.map((todo, i) => <li key={i}>{todo.title}</li>);

  return <ul>{todoItems}</ul>;
}
 */
