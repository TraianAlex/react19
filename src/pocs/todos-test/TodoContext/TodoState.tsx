import { useEffect, useReducer, useRef } from 'react';

import TodoContext from './Context';
import TodoReducer from './Reducer';
import {
  SET_TODO_TITLE,
  GET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  CLEAR_TODO_TITLE,
} from './Types';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
  title: string;
  loading: boolean;
}

const TodoState = ({ children }: { children: React.ReactNode }) => {
  const initialState: State = {
    todos: [],
    title: '',
    loading: true,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const mountedRef = useRef(false);

  const setTodoTitle = (payload: string) => {
    dispatch({ type: SET_TODO_TITLE, payload });
  };

  const getTodos = async (): Promise<void> => {
    try {
      const todos = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5'
      );
      const toJSON = await todos.json();

      dispatch({ type: GET_TODOS, payload: toJSON });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const createTodo = async (title: string): Promise<void> => {
    const newTodo = {
      title,
      completed: false,
    };

    try {
      const todo = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const toJSON = await todo.json();

      dispatch({ type: CLEAR_TODO_TITLE });
      dispatch({ type: CREATE_TODO, payload: toJSON });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: DELETE_TODO, payload: id });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    getTodos();
  }, []);

  const { todos, title, loading } = state;

  return (
    <TodoContext.Provider
      value={{
        todos,
        title,
        loading,
        setTodoTitle,
        createTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
