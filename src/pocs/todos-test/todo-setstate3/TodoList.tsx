import styled from 'styled-components';
import { TodosState } from './TodoStore';
import { useSelector, todoDeleteHandler } from './actions';

const TodoList = () => {
  const todos = useSelector<TodosState[]>((state) => state.todos);

  console.log('render TodoList');

  return (
    <ListStyled>
      {todos?.map((todo: any, i: number) => (
        <li key={todo.id}>
          <span>
            {todo.text} {crypto.randomUUID().slice(0, 5)}
          </span>
          <button className='btn btn-outline-danger btn-sm' onClick={todoDeleteHandler.bind(null, todo.id)}>DELETE</button>
        </li>
      ))}
    </ListStyled>
  );
};

export default TodoList;

const ListStyled = styled.ul`
  list-style: none;
  width: 90%;
  max-width: 40rem;
  margin: 1rem auto;
  padding: 0;

  li {
    margin: 1rem 0;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
