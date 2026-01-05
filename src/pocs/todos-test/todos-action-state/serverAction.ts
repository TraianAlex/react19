'use server';

export interface Todo {
  id: string;
  title: string;
  date: string;
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

// Simulate in-memory storage (in a real app, this would be a database)
let todosStorage: Todo[] = [];

export async function createTodoAction(
  prevState: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 500));

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
    // Create new todo
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      date,
    };

    // Add to storage
    todosStorage.push(newTodo);

    return {
      todos: [...todosStorage],
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
  await new Promise((resolve) => setTimeout(resolve, 300));

  const id = formData.get('id') as string;

  if (!id) {
    return {
      ...prevState,
      error: 'Todo ID is required',
      message: null,
    };
  }

  try {
    todosStorage = todosStorage.filter((todo) => todo.id !== id);

    return {
      todos: [...todosStorage],
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

// Unified action that handles both create and delete
export async function todoAction(
  prevState: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  const action = formData.get('action') as string;

  if (action === 'delete') {
    return deleteTodoAction(prevState, formData);
  }

  // Default to create
  return createTodoAction(prevState, formData);
}

// Helper function to get current todos (for initial state)
export function getTodos(): Todo[] {
  return [...todosStorage];
}

export const initialTodoActionState = initialState;
