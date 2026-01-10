// Shared types for React 19 feature demos

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Todo {
  id: number;
  todoText: string;
  completed: boolean;
  important: boolean;
  sequence: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Form state types
export interface FormState {
  pending: boolean;
  error: string | null;
  success: boolean;
}

// Action result types
export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
