import { todoStore, TodosState } from './TodoStore';
import TodoList from './TodoList';
import NewTodoForm from './NewTodo';
import { Container } from 'react-bootstrap';
import { Decoration } from './Decoration';
import { Count } from './Count';
import { List } from './List';

// const { getState, setState } = todoStore;

// setState({ user: 'Alex' });

// export const todoAddHandler = (text: string) => {
//   setState({
//     todos: [...getState().todos, { id: Math.random().toString(), text: text }],
//     count: getState().count + 1,
//   });
// };

// export const createList = (text: string) => {
//   setState({
//     list: [...getState().list, text],
//   });
// };

// export const todoDeleteHandler = (todoId: string) => {
//   setState({
//     todos: [
//       ...getState().todos.filter((todo: TodosState) => todo.id !== todoId),
//     ],
//     count: getState().count - 1,
//   });
// };

export const TodosSetState1: React.FC = () => {
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

export default TodosSetState1;
