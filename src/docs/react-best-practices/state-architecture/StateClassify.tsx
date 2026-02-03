import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Free API: JSONPlaceholder
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

const StateClassify = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>1. Classify State by Layer</h1>
      
      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Junior Approach</h5>
            </div>
            <div className='card-body'>
              <p className='text-muted'>
                Treating server data like local state - manual loading/error handling
              </p>
              <JuniorApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Senior Approach</h5>
            </div>
            <div className='card-body'>
              <p className='text-muted'>
                Using React Query for server state - automatic caching, refetching, error handling
              </p>
              <SeniorApproach />
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
                Not all state is the same. Classify state into layers: server state, global client state, 
                local component state, and URL state. Each has a natural home and appropriate tooling.
              </p>
              <p>
                A toggle, a text input, an API response, a set of filters — everything gets dropped into 
                a single bucket of "state." For starting, it is fine. In smaller apps, you don't notice 
                much difference. But as the app grows, this approach starts to create friction. The 
                boundaries blur, complexity creeps in, and managing state becomes harder than it needs to be.
              </p>
              <p>
                Experienced developers think about state differently. Instead of lumping it all together, 
                they classify it into layers, each belonging to a natural part of the system.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Junior approach - treating server data like local state
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ✅ Senior approach - recognizing server state
const { data: users, isLoading, error } = useQuery('users', fetchUsers);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Junior approach - treating server data like local state
const JuniorApproach = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLoadUsers} className='btn btn-primary mb-3' disabled={loading}>
        {loading ? 'Loading...' : 'Load Users'}
      </button>
      {error && <div className='alert alert-danger'>{error}</div>}
      {users.length > 0 && (
        <ul className='list-group'>
          {users.map((user: { id: number; name: string; email: string }) => (
            <li key={user.id} className='list-group-item'>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
      <div className='mt-3'>
        <small className='text-muted'>
          Issues: Manual state management, no caching, no automatic refetching, 
          more boilerplate code
        </small>
      </div>
    </div>
  );
};

// ✅ Senior approach - recognizing server state
const SeniorApproach = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div>
      {isLoading && <div className='alert alert-info'>Loading users...</div>}
      {error && (
        <div className='alert alert-danger'>
          Error: {error instanceof Error ? error.message : 'Failed to load users'}
        </div>
      )}
      {users && users.length > 0 && (
        <ul className='list-group'>
          {users.map((user: { id: number; name: string; email: string }) => (
            <li key={user.id} className='list-group-item'>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Automatic caching, background refetching, error handling, 
          loading states, less boilerplate
        </small>
      </div>
    </div>
  );
};

export default StateClassify;
