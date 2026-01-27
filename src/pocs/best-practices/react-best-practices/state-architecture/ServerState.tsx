import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Free API: JSONPlaceholder
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

const ServerState = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>2. Server State Management</h1>
      
      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Managing server state with useState</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Using React Query for server state</h5>
            </div>
            <div className='card-body'>
              <GoodApproach />
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
                Server state belongs in libraries like React Query, SWR, or Apollo. Server state has 
                unique characteristics: it can become stale, needs to stay in sync with backend, and 
                often needs to be shared across multiple parts of the app.
              </p>
              <p>
                Trying to manage it with useState is technically possible, but it won't be a good fit, 
                right? An analogy would be — trying to carve wood with a butter knife.
              </p>
              <p>
                By drawing clear boundaries between kinds of state, you end up with code that feels 
                lighter, easier to reason about, and more resilient as your app and team grows.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Managing server state with useState
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetchUsers()
    .then(setUsers)
    .finally(() => setLoading(false));
}, []);

// ✅ Good: Using React Query for server state
const { data: users, isLoading, error } = useQuery('users', fetchUsers);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Managing server state with useState
const BadApproach = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <button onClick={handleRefresh} className='btn btn-sm btn-secondary mb-3' disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
      {loading && <div className='alert alert-info'>Loading...</div>}
      {error && <div className='alert alert-danger'>{error}</div>}
      {posts.length > 0 && (
        <ul className='list-group'>
          {posts.map((post: { id: number; title: string }) => (
            <li key={post.id} className='list-group-item'>
              {post.title}
            </li>
          ))}
        </ul>
      )}
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: No caching, manual refetching, no stale-while-revalidate,
          duplicate requests if multiple components need same data
        </small>
      </div>
    </div>
  );
};

// ✅ Good: Using React Query for server state
const GoodApproach = () => {
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000, // Consider data fresh for 5 seconds
  });

  return (
    <div>
      <button onClick={() => refetch()} className='btn btn-sm btn-secondary mb-3' disabled={isLoading}>
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </button>
      {isLoading && <div className='alert alert-info'>Loading...</div>}
      {error && (
        <div className='alert alert-danger'>
          {error instanceof Error ? error.message : 'Failed to load posts'}
        </div>
      )}
      {posts && posts.length > 0 && (
        <ul className='list-group'>
          {posts.map((post: { id: number; title: string }) => (
            <li key={post.id} className='list-group-item'>
              {post.title}
            </li>
          ))}
        </ul>
      )}
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Automatic caching, background refetching, shared cache across components,
          stale-while-revalidate pattern, request deduplication
        </small>
      </div>
    </div>
  );
};

export default ServerState;
