import { useState } from 'react';

const AsyncErrorHandling = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>11. Async Error Handling</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: No error handling</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Proper error handling</h5>
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
                Always handle errors in async operations and provide user feedback. Unhandled errors 
                can lead to poor user experience and make debugging difficult.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: No error handling
const fetchData = async () => {
  const data = await api.getData();
  setData(data);
};

// ✅ Good: Proper error handling
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await api.getData();
    setData(data);
  } catch (err) {
    setError(err.message);
    // Show user-friendly error message
    toast.error('Failed to load data. Please try again.');
  } finally {
    setLoading(false);
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

// ❌ Bad: No error handling
const BadApproach = () => {
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    // Simulate API call that might fail
    const shouldFail = Math.random() > 0.5;
    if (shouldFail) {
      throw new Error('API request failed');
    }
    setData('Data loaded successfully');
  };

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={fetchData}>
        Fetch Data (No Error Handling)
      </button>
      {data && <div className='alert alert-success'>{data}</div>}
      <small className='text-muted mt-2 d-block'>
        Problems: Unhandled errors, no user feedback, app might crash
      </small>
    </div>
  );
};

// ✅ Good: Proper error handling
const GoodApproach = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call that might fail
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldFail = Math.random() > 0.5;
          if (shouldFail) {
            reject(new Error('Failed to load data. Please try again.'));
          } else {
            resolve('Data loaded successfully');
          }
        }, 1000);
      }).then((result) => {
        setData(result as string);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className='btn btn-primary mb-3'
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Data (With Error Handling)'}
      </button>
      {loading && <div className='alert alert-info'>Loading...</div>}
      {error && (
        <div className='alert alert-danger'>
          <strong>Error:</strong> {error}
        </div>
      )}
      {data && <div className='alert alert-success'>{data}</div>}
      <small className='text-muted mt-2 d-block'>
        Benefits: Graceful error handling, user feedback, better UX
      </small>
    </div>
  );
};

export default AsyncErrorHandling;
