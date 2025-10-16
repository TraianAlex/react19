// @ts-nocheck
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducer';

const store = createStore(reducer);

const TodoListRedux = () => {
  return (
    <Provider store={store}>
      <div>
        <h2>Todo List</h2>
        <App />
      </div>
    </Provider>
  );
};

export default TodoListRedux;
