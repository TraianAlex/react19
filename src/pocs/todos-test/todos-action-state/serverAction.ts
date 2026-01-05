'use server';

import { generateId } from '../../../shared/utils/utils';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  date?: string; // Custom field for due date
}

export interface TodoActionState {
  todos: Todo[];
  error: string | null;
  message: string | null;
}

const initialState: TodoActionState = {
  todos: [],
  error: null,
  message: null,
};

// Fetch todos from API (GET)
export async function fetchTodosAction(): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}?_limit=10`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

export async function createTodoAction(
  prevState: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  const title = (formData.get('title') as string)?.trim() || '';
  const date = (formData.get('date') as string) || '';

  // Validation
  if (!title) {
    return {
      ...prevState,
      error: 'Title is required',
      message: null,
    };
  }

  if (!date) {
    return {
      ...prevState,
      error: 'Date is required',
      message: null,
    };
  }

  // Check if date is in the past
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return {
      ...prevState,
      error: 'Date cannot be in the past',
      message: null,
    };
  }

  try {
    // POST - Create new todo via API
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1,
        date, // Custom field
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }

    const newTodo: Todo = await response.json();
    // Add date to the response
    const todoWithDate: Todo = {
      ...newTodo,
      date,
      id: generateId(prevState.todos),
    };

    // Refresh todos list and add new todo
    // const updatedTodos = await fetchTodosAction();
    // Add the new todo to the list (since JSONPlaceholder doesn't persist, we add it locally)
    const allTodos = [todoWithDate, ...prevState.todos];

    return {
      todos: allTodos,
      error: null,
      message: `Todo "${title}" created successfully!`,
    };
  } catch (error) {
    return {
      ...prevState,
      error: 'Failed to create todo. Please try again.',
      message: null,
    };
  }
}

export async function deleteTodoAction(
  prevState: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  const id = formData.get('id') as string;

  if (!id) {
    return {
      ...prevState,
      error: 'Todo ID is required',
      message: null,
    };
  }

  try {
    // DELETE - Delete todo via API
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    // Remove from local state
    const updatedTodos = prevState.todos.filter(
      (todo) => todo.id.toString() !== id
    );

    return {
      todos: updatedTodos,
      error: null,
      message: 'Todo deleted successfully',
    };
  } catch (error) {
    return {
      ...prevState,
      error: 'Failed to delete todo',
      message: null,
    };
  }
}

export async function updateTodoAction(
  prevState: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  const id = formData.get('id') as string;
  const title = (formData.get('title') as string)?.trim() || '';
  const date = (formData.get('date') as string) || '';
  const completed =
    formData.get('completed') === 'true' || formData.get('completed') === 'on';

  if (!id) {
    return {
      ...prevState,
      error: 'Todo ID is required',
      message: null,
    };
  }

  if (!title) {
    return {
      ...prevState,
      error: 'Title is required',
      message: null,
    };
  }

  try {
    // PUT - Update todo via API
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: parseInt(id),
        title,
        completed,
        userId: 1,
        date,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    const updatedTodo: Todo = await response.json();
    const todoWithDate: Todo = { ...updatedTodo, date };

    // Update in local state
    const updatedTodos = prevState.todos.map((todo) =>
      todo.id.toString() === id ? todoWithDate : todo
    );

    return {
      todos: updatedTodos,
      error: null,
      message: 'Todo updated successfully',
    };
  } catch (error) {
    return {
      ...prevState,
      error: 'Failed to update todo',
      message: null,
    };
  }
}

// Refresh action to fetch todos from API
export async function refreshTodosAction(
  prevState: TodoActionState,
  _formData: FormData
): Promise<TodoActionState> {
  try {
    const todos = await fetchTodosAction();
    return {
      todos,
      error: null,
      message: null,
    };
  } catch (error) {
    return {
      ...prevState,
      error: 'Failed to refresh todos',
      message: null,
    };
  }
}

// Unified action that handles create, update, delete, and refresh
export async function todoAction(
  prevState: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  const action = formData.get('action') as string;

  if (action === 'delete') {
    return await deleteTodoAction(prevState, formData);
  }

  if (action === 'update') {
    return await updateTodoAction(prevState, formData);
  }

  if (action === 'refresh') {
    return await refreshTodosAction(prevState, formData);
  }

  // Default to create
  return await createTodoAction(prevState, formData);
}

// Helper function to get initial todos from API
export async function getInitialTodos(): Promise<Todo[]> {
  return await fetchTodosAction();
}

export const initialTodoActionState = initialState;
