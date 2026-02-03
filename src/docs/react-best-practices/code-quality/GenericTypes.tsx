import { useState, useEffect } from 'react';

const GenericTypes = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>31. Generic Types for Reusable Patterns</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Generic types for reusable patterns</h5>
            </div>
            <div className='card-body'>
              <GenericTypesExample />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Explanation</h5>
            </div>
            <div className='card-body'>
              <p>
                Use generic types to create reusable patterns that work with different data types.
              </p>
              <p>
                Generic Types for reusable patterns. Use generic types to create reusable patterns 
                that work with different data types.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Reusable async state pattern
interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// API response wrapper
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
}

// Generic hook for async data
const useAsyncData = <T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncData<T> => {
  // Implementation
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Reusable async state pattern
interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// ✅ Good: API response wrapper
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
}

// Generic hook for async data
const useAsyncData = <T,>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error('Unknown error')))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
};

// Example usage with different types
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const GenericTypesExample = () => {
  const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  };

  const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  };

  const usersState = useAsyncData<User[]>(fetchUsers, []);
  const postsState = useAsyncData<Post[]>(fetchPosts, []);

  return (
    <div>
      <div className='mb-4'>
        <h5>Users (Generic Type: User[])</h5>
        {usersState.loading && <div className='alert alert-info'>Loading users...</div>}
        {usersState.error && (
          <div className='alert alert-danger'>Error: {usersState.error.message}</div>
        )}
        {usersState.data && (
          <ul className='list-group'>
            {usersState.data.slice(0, 3).map((user) => (
              <li key={user.id} className='list-group-item'>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='mb-4'>
        <h5>Posts (Generic Type: Post[])</h5>
        {postsState.loading && <div className='alert alert-info'>Loading posts...</div>}
        {postsState.error && (
          <div className='alert alert-danger'>Error: {postsState.error.message}</div>
        )}
        {postsState.data && (
          <ul className='list-group'>
            {postsState.data.map((post) => (
              <li key={post.id} className='list-group-item'>
                <strong>{post.title}</strong>
                <p className='mb-0 small'>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Benefits:</strong>
          <ul className='mb-0 mt-2'>
            <li>Same hook works with different data types</li>
            <li>Type-safe - TypeScript knows the data type</li>
            <li>Reusable pattern across the application</li>
            <li>Compile-time type checking</li>
          </ul>
        </small>
      </div>
    </div>
  );
};

export default GenericTypes;
