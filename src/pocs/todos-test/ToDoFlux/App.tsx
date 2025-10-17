import { TodoList } from './TodoList';
import { connect } from './Provider';
import { CREATE_TODO, UPDATE_TODO } from './store';

const App = ({
  dispatch,
  newTodo,
  todos,
}: {
  dispatch?: any;
  newTodo: any;
  todos?: any;
}) => {
  const onChange = (e: { target: { value: string } }) => {
    dispatch({ type: UPDATE_TODO, todo: e.target.value });
  };

  const addTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newTodo === '') {
      alert('Enter text');
      return;
    }
    dispatch({ type: CREATE_TODO, todo: newTodo });
  };

  return (
    <div>
      <h2>To do List</h2>
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

export default connect((state: any) => state)(App);

/***************************************************
import { Component } from "react";
import TodoList from "./TodoList";
import { connect } from "./Provider";
import { CREATE_TODO, UPDATE_TODO } from "./store";

class App extends Component {
  onChange = (e) => {
    this.props.dispatch({ type: UPDATE_TODO, todo: e.target.value });
  };

  addTodo = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: CREATE_TODO, todo: this.props.newTodo });
  };

  render() {
    const { todos, newTodo } = this.props;

    return (
      <div>
        <h2>To do List</h2>
        <form onSubmit={this.addTodo.bind(this)}>
          <input value={newTodo} onChange={this.onChange.bind(this)} />
          <label>
            Create todo: <span>{newTodo}</span>
          </label>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default connect((state) => state)(App);
*/
