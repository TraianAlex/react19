import { useState } from 'react';

const StateMachines = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>3. Use State Machines for Complex State</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Multiple boolean flags</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: State machine</h5>
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
                For complex state transitions, use state machines to make the flow explicit and 
                prevent invalid states.
              </p>
              <p>
                Multiple boolean flags can lead to invalid states (e.g., isLoading and isError both 
                true). State machines ensure only valid state transitions are possible.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Multiple boolean flags
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// ✅ Good: State machine
type State = 'idle' | 'loading' | 'success' | 'error';

const [state, setState] = useState<State>('idle');

const fetchData = async () => {
  setState('loading');
  try {
    await api.fetch();
    setState('success');
  } catch {
    setState('error');
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

// ❌ Bad: Multiple boolean flags
const BadApproach = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setIsLoading(false);
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      <div>
        {isLoading && <div className='alert alert-info'>Loading...</div>}
        {isError && <div className='alert alert-danger'>Error occurred</div>}
        {isSuccess && <div className='alert alert-success'>Success!</div>}
      </div>
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: Can have invalid states (e.g., isLoading and isError both true), 
          harder to reason about state transitions
        </small>
      </div>
    </div>
  );
};

// ✅ Good: State machine
type State = 'idle' | 'loading' | 'success' | 'error';

const GoodApproach = () => {
  const [state, setState] = useState<State>('idle');

  const fetchData = async () => {
    setState('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setState('success');
    } catch {
      setState('error');
    }
  };

  const reset = () => setState('idle');

  return (
    <div>
      <button
        className='btn btn-primary mb-3'
        onClick={fetchData}
        disabled={state === 'loading'}
      >
        {state === 'loading' ? 'Loading...' : 'Fetch Data'}
      </button>
      <div>
        {state === 'loading' && <div className='alert alert-info'>Loading...</div>}
        {state === 'error' && (
          <div className='alert alert-danger'>
            Error occurred
            <button className='btn btn-sm btn-secondary ms-2' onClick={reset}>
              Reset
            </button>
          </div>
        )}
        {state === 'success' && (
          <div className='alert alert-success'>
            Success!
            <button className='btn btn-sm btn-secondary ms-2' onClick={reset}>
              Reset
            </button>
          </div>
        )}
      </div>
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Only valid states possible, explicit state transitions, easier to reason about
        </small>
      </div>
    </div>
  );
};

export default StateMachines;
