export const API_ENDPOINTS = {
  jsonPlaceholder: 'https://jsonplaceholder.typicode.com',
  localServer: 'http://localhost:4000',
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// JSONPlaceholder API calls
export const jsonPlaceholderApi = {
  async getPosts() {
    await delay(1000);
    const response = await fetch(`${API_ENDPOINTS.jsonPlaceholder}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  async getPost(id: number) {
    await delay(800);
    const response = await fetch(
      `${API_ENDPOINTS.jsonPlaceholder}/posts/${id}`
    );
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  async createPost(post: { title: string; body: string; userId: number }) {
    await delay(1200);
    const response = await fetch(`${API_ENDPOINTS.jsonPlaceholder}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  async updatePost(
    id: number,
    post: Partial<{ title: string; body: string; userId: number }>
  ) {
    await delay(1000);
    const response = await fetch(
      `${API_ENDPOINTS.jsonPlaceholder}/posts/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      }
    );
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  async deletePost(id: number) {
    await delay(800);
    const response = await fetch(
      `${API_ENDPOINTS.jsonPlaceholder}/posts/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
  },
};

// Local server API calls (assuming json-server setup)
export const localApi = {
  async getTodos() {
    await delay(600);
    const response = await fetch(`${API_ENDPOINTS.localServer}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  async createTodo(todo: {
    todoText: string;
    completed: boolean;
    important?: boolean;
    sequence?: number;
  }) {
    await delay(800);
    const response = await fetch(`${API_ENDPOINTS.localServer}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...todo,
        id: Date.now(),
        important: todo.important || false,
        sequence: todo.sequence || 0,
      }),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  async updateTodo(
    id: number,
    updates: Partial<{
      todoText: string;
      completed: boolean;
      important: boolean;
      sequence: number;
    }>
  ) {
    await delay(700);
    const response = await fetch(`${API_ENDPOINTS.localServer}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  async deleteTodo(id: number) {
    await delay(500);
    const response = await fetch(`${API_ENDPOINTS.localServer}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.json();
  },
};
