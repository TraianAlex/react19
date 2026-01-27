import { useState } from 'react';

const DiscriminatedUnions = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>17. Discriminated Unions</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Discriminated union</h5>
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
                Use discriminated unions for type-safe state management. TypeScript can narrow the 
                type based on the discriminator property, ensuring type safety throughout your code.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Discriminated union
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

const Component = () => {
  const [state, setState] = useState<AsyncState<User>>({ status: 'idle' });

  // TypeScript knows the shape based on status
  if (state.status === 'success') {
    console.log(state.data); // ✅ Type-safe
  }
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Discriminated union
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

interface User {
  id: number;
  name: string;
  email: string;
}

const GoodApproach = () => {
  const [state, setState] = useState<AsyncState<User>>({ status: 'idle' });

  const fetchUser = async () => {
    setState({ status: 'loading' });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const user = await response.json();
      setState({ status: 'success', data: user });
    } catch (error) {
      setState({ status: 'error', error: 'Failed to fetch user' });
    }
  };

  const reset = () => setState({ status: 'idle' });

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={fetchUser} disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Loading...' : 'Fetch User'}
      </button>

      {state.status === 'idle' && (
        <div className='alert alert-secondary'>Click button to fetch user</div>
      )}

      {state.status === 'loading' && (
        <div className='alert alert-info'>Loading user...</div>
      )}

      {state.status === 'success' && (
        <div className='alert alert-success'>
          <h5>User: {state.data.name}</h5>
          <p className='mb-0'>{state.data.email}</p>
          <button className='btn btn-sm btn-secondary mt-2' onClick={reset}>
            Reset
          </button>
        </div>
      )}

      {state.status === 'error' && (
        <div className='alert alert-danger'>
          <strong>Error:</strong> {state.error}
          <button className='btn btn-sm btn-secondary mt-2 ms-2' onClick={reset}>
            Reset
          </button>
        </div>
      )}

      <small className='text-muted mt-2 d-block'>
        Benefits: Type-safe state, TypeScript narrows types automatically, prevents invalid states
      </small>
    </div>
  );
};

export default DiscriminatedUnions;
