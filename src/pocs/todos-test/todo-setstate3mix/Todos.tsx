import TodoList from './TodoList';
import NewTodoForm from './NewTodo';
import { Container } from 'react-bootstrap';
import { Header } from './Header';
import { Count1 } from './Count1';
import { Footer } from './Footer';
import { Posts } from './Posts';

const Todos3mix = () => {
  console.log('render Todos');

  return (
    <Container>
      <Header />
      <NewTodoForm />
      <Count1 />
      <TodoList />
      <Footer />
      <Posts />
    </Container>
  );
};

export default Todos3mix;
