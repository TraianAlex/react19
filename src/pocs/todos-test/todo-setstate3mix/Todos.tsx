import { useEffect, useRef } from 'react';
import TodoList from './TodoList';
import NewTodoForm from './NewTodo';
import { Container } from 'react-bootstrap';
import { Header } from './Header';
import { Count1 } from './Count1';
import { List } from './List';
import { setSubTitle } from './actions';
import { Footer } from './Footer';
import { toCamelCase } from './utils';
import { Posts } from './Posts';

const initPageInfo = async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const response = await fetch(url);
  const body = await response.json();
  setSubTitle(toCamelCase(body.title));
};

const Todos3mix = () => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    initPageInfo();
    console.log('mounted');
  });

  console.log('render Todos');

  return (
    <Container>
      <Header />
      <List />
      {/* <NewTodoForm />
      <Count1 />
      <TodoList /> */}
      {/* <Footer /> */}
      <Posts />
    </Container>
  );
};

export default Todos3mix;
