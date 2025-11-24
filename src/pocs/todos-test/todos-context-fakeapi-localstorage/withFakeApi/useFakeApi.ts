import { useContext } from 'react';

import TodoContext from '../Context';
import {
  SET_TODO_TITLE,
  GET_TODOS,
  CREATE_TODO,
  ON_UPDATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  CLEAR_TODO_TITLE,
} from '../Types';
import { Todo } from '../Context';
import { mockDelay } from '../../../../shared/utils/utils';

const getRandomId = () => `${Math.random()}-${Math.random()}`;

export const useFakeApi = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(`useFakeApi must be used within a TodoState`);
  }

  const [state, dispatch] = context;

  const setTodoTitle = (payload: any) => {
    dispatch({ type: SET_TODO_TITLE, payload });
  };

  const getTodos = async () => {
    try {
      const todos = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5'
      );
      const toJSON = await todos.json();

      await mockDelay(1000);

      dispatch({ type: GET_TODOS, payload: toJSON });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const createTodo = async (newTodo: Todo) => {
    try {
      const todo = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const toJSON = await todo.json();
      const data = { ...toJSON, id: getRandomId() };

      dispatch({ type: CLEAR_TODO_TITLE });
      dispatch({ type: CREATE_TODO, payload: data });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onUpdateTodo = (todo: Todo) =>
    dispatch({
      type: ON_UPDATE_TODO,
      payload: todo,
    });

  const updateTodo = async (newTodo: Todo) => {
    try {
      const todo = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${newTodo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        }
      );
      const toJSON = await todo.json();

      dispatch({ type: CLEAR_TODO_TITLE });
      dispatch({ type: UPDATE_TODO, payload: toJSON });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: DELETE_TODO, payload: id });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const { todo, todos, title, loading } = state;

  return {
    todo,
    todos,
    title,
    loading,
    getTodos,
    setTodoTitle,
    createTodo,
    onUpdateTodo,
    updateTodo,
    deleteTodo,
  };
};
