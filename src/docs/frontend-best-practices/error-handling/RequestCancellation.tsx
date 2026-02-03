import { useState, useEffect } from 'react';

const RequestCancellation = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>12. Request Cancellation</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Request cancellation with AbortController</h5>
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
                Cancel in-flight requests when components unmount or dependencies change to prevent 
                memory leaks and race conditions. This ensures that stale responses don't update 
                component state.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Request cancellation with AbortController
useEffect(() => {
  const abortController = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: abortController.signal
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => {
    abortController.abort();
  };
}, [url]);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GoodApproach = () => {
  const [userId, setUserId] = useState(1);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setCancelled(false);
      setData(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          {
            signal: abortController.signal,
          }
        );
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error:', err);
        } else {
          setCancelled(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return (
    <div>
      <div className='mb-3'>
        <label className='form-label'>User ID:</label>
        <input
          type='number'
          className='form-control'
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          min={1}
          max={10}
        />
        <small className='text-muted'>
          Change the ID quickly to see the previous request being cancelled
        </small>
      </div>
      {loading && <div className='alert alert-info'>Loading user {userId}...</div>}
      {cancelled && (
        <div className='alert alert-warning'>
          Previous request was cancelled (as expected)
        </div>
      )}
      {data && !loading && (
        <div className='card'>
          <div className='card-body'>
            <h5>{data.name}</h5>
            <p className='mb-0'>{data.email}</p>
          </div>
        </div>
      )}
      <small className='text-muted mt-2 d-block'>
        Benefits: Prevents memory leaks, avoids race conditions, better performance
      </small>
    </div>
  );
};

export default RequestCancellation;
