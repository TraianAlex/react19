export const TodoList = ({ todos }: { todos: { title: string }[] }) => {
  console.log('render TodoList component');

  const todoItems = todos.map((todo, i) => (
    <li className='list-group-item' key={i}>
      {todo.title}
    </li>
  ));

  return <ul className='list-group mt-2'>{todoItems}</ul>;
};
