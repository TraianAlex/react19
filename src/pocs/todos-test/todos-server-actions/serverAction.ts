'use server';

export interface TodoFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  category: string;
  tags: string;
}

export interface TodoActionState {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  category: string;
  tags: string;
  message: string;
  isSuccess: boolean;
  errors?: Record<string, string>;
}

const initialTodoState: TodoActionState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  completed: false,
  category: '',
  tags: '',
  message: '',
  isSuccess: false,
};

export async function createTodoAction(
  _: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const title = (formData.get('title') as string) || '';
  const description = (formData.get('description') as string) || '';
  const priority =
    (formData.get('priority') as 'low' | 'medium' | 'high') || 'medium';
  const dueDate = formData.get('dueDate') as string;
  const completed =
    formData.get('completed') === 'on' || formData.get('completed') === 'true';
  const category = (formData.get('category') as string) || '';
  const tags = (formData.get('tags') as string) || '';

  const errors: Record<string, string> = {};

  // Validation
  if (!title.trim()) {
    errors.title = 'Title is required';
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!description.trim()) {
    errors.description = 'Description is required';
  } else if (description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  if (!category) {
    errors.category = 'Category is required';
  }

  if (Object.keys(errors).length > 0) {
    return {
      ...initialTodoState,
      title,
      description,
      priority,
      dueDate,
      completed,
      category,
      tags,
      message: 'Please fix the errors below',
      isSuccess: false,
      errors,
    };
  }

  // Simulate saving to database
  console.log('Saving todo:', {
    title,
    description,
    priority,
    dueDate,
    completed,
    category,
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
  });

  return {
    ...initialTodoState,
    message: `Todo "${title}" created successfully!`,
    isSuccess: true,
  };
}

export const initialTodoActionState = initialTodoState;
