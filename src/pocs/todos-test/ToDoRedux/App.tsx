import { connect } from 'react-redux';

import { TodoList } from './TodoList';
import * as actions from './actions';

export const App = ({
  updateTodo,
  createTodo,
  newTodo,
  todos,
}: {
  updateTodo: (arg0: any) => void;
  createTodo: (arg0: any) => void;
  newTodo: any;
  todos: any;
}) => {
  const onChange = (e: { target: { value: string } }) => {
    updateTodo(e.target.value);
  };

  const addTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createTodo(newTodo);
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <label className='form-label'>
          Create todo: <span>{newTodo}</span>
        </label>
        <input className='form-control' value={newTodo} onChange={onChange} />
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default connect((state: any) => state.toJS(), actions)(App);
