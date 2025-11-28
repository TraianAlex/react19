interface Todo {
  title: string;
}

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  console.log('render TodoList component');

  const todoItems = todos.map((todo, i) => (
    <li className='list-group-item' key={i}>
      {todo.title}
    </li>
  ));

  return <ul className='list-group mt-2'>{todoItems}</ul>;
};

/**********************************************************

export default function TodoList({ todos }) {
  const todoItems = todos.map((todo, i) => <li key={i}>{todo.title}</li>);

  return <ul>{todoItems}</ul>;
}
 */
