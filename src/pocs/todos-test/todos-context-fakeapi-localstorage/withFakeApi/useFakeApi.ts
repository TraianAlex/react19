import { useContext, useEffect, useRef } from 'react';

import TodoContext from '../Context';
import {
  SET_TODO_TITLE,
  GET_TODOS,
  CREATE_TODO,
  LOADING_TODO,
  ON_UPDATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  CLEAR_TODO_TITLE,
} from '../Types';
import { Todo } from '../Context';
import { generateId, sleep } from '../../../../shared/utils/utils';

let lastInitAt = 0;

export const useFakeApi = () => {
  const skipAbortRef = useRef(false);

  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(`useFakeApi must be used within a TodoState`);
  }

  const [state, dispatch] = context;

  const setTodoTitle = (payload: any) => {
    dispatch({ type: SET_TODO_TITLE, payload });
  };

  const getTodos = async (signal?: AbortSignal) => {
    try {
      dispatch({ type: LOADING_TODO, payload: true });

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5',
        { signal },
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch todos: ${response.status} ${response.statusText}`,
        );
      }
      const toJSON = await response.json();

      await sleep(1000);

      if (signal?.aborted) return;

      if (toJSON && Array.isArray(toJSON)) {
        dispatch({ type: GET_TODOS, payload: toJSON });
      } else {
        dispatch({ type: GET_TODOS, payload: [] as Todo[] });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Request was cancelled');
        return;
      }
      dispatch({ type: LOADING_TODO, payload: false });
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      // You can dispatch an error action here if you add one to your reducer
      throw errorMessage; // Re-throw to allow caller to handle
    }
  };

  useEffect(() => {
    const now = Date.now();
    if (now - lastInitAt < 500) return;
    lastInitAt = now;

    const abortController = new AbortController();

    const getData = async () => {
      await getTodos(abortController.signal);
    };

    skipAbortRef.current = true;
    getData();

    return () => {
      if (skipAbortRef.current) {
        skipAbortRef.current = false;
        return;
      }
      abortController.abort();
    };
  }, []);

  const createTodo = async (newTodo: Todo) => {
    try {
      dispatch({ type: LOADING_TODO, payload: true });

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        },
      );
      if (!response.ok) {
        throw new Error(
          `Failed to create todo: ${response.status} ${response.statusText}`,
        );
      }
      const toJSON = await response.json();
      const data = { ...toJSON, id: generateId(state.todos) };

      dispatch({ type: CLEAR_TODO_TITLE });

      await sleep(1000);

      dispatch({ type: CREATE_TODO, payload: data });
    } catch (err: unknown) {
      dispatch({ type: LOADING_TODO, payload: false });
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      throw errorMessage; // Re-throw to allow caller to handle
    }
  };

  const onUpdateTodo = (todo: Todo) =>
    dispatch({
      type: ON_UPDATE_TODO,
      payload: todo,
    });

  const updateTodo = async (newTodo: Todo) => {
    try {
      dispatch({ type: LOADING_TODO, payload: true });

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${newTodo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        },
      );
      if (!response.ok) {
        throw new Error(
          `Failed to update todo: ${response.status} ${response.statusText}`,
        );
      }
      const toJSON = await response.json();

      await sleep(1000);

      dispatch({ type: CLEAR_TODO_TITLE });
      dispatch({ type: UPDATE_TODO, payload: toJSON });
    } catch (err: unknown) {
      dispatch({ type: LOADING_TODO, payload: false });
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      throw errorMessage; // Re-throw to allow caller to handle
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      dispatch({ type: LOADING_TODO, payload: true });

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error(
          `Failed to delete todo: ${response.status} ${response.statusText}`,
        );
      }

      await sleep(1000);

      dispatch({ type: DELETE_TODO, payload: id });
    } catch (err: unknown) {
      dispatch({ type: LOADING_TODO, payload: false });
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      throw errorMessage; // Re-throw to allow caller to handle
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
