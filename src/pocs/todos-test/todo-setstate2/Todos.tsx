import TodoList from './TodoList';
import NewTodoForm from './NewTodo';
import { Container } from 'react-bootstrap';
import { Decoration } from './Decoration';
import { Count } from './Count';
import { List } from './List';

const TodosSetState2 = () => {
  console.log('render Todos');

  return (
    <Container>
      <Decoration />
      <List />
      <NewTodoForm />
      <Count />
      <TodoList />
    </Container>
  );
};

export default TodosSetState2;
