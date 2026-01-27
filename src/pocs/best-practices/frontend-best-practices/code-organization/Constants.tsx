const Constants = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>15. Constants and Configuration</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Magic numbers and strings</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Named constants</h5>
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
                Extract magic numbers and strings into constants. This makes code more maintainable, 
                easier to understand, and reduces the chance of errors from typos or inconsistent values.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Magic numbers and strings
const timeout = setTimeout(() => {}, 5000);
if (status === 'pending') { }

// ✅ Good: Named constants
const API_TIMEOUT = 5000;
const STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

const timeout = setTimeout(() => {}, API_TIMEOUT);
if (status === STATUS.PENDING) { }`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Magic numbers and strings
const BadApproach = () => {
  const checkStatus = (status: string) => {
    if (status === 'pending') {
      return 'Processing...';
    }
    if (status === 'success') {
      return 'Done!';
    }
    return 'Unknown';
  };

  return (
    <div>
      <div className='mb-2'>
        <strong>Status check:</strong>
      </div>
      <div>pending: {checkStatus('pending')}</div>
      <div>success: {checkStatus('success')}</div>
      <small className='text-muted mt-2 d-block'>
        Problems: Magic strings, typos possible, hard to refactor
      </small>
    </div>
  );
};

// ✅ Good: Named constants
const API_TIMEOUT = 5000;
const STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

const GoodApproach = () => {
  const checkStatus = (status: typeof STATUS[keyof typeof STATUS]) => {
    if (status === STATUS.PENDING) {
      return 'Processing...';
    }
    if (status === STATUS.SUCCESS) {
      return 'Done!';
    }
    return 'Unknown';
  };

  return (
    <div>
      <div className='mb-2'>
        <strong>Status check (using constants):</strong>
      </div>
      <div>STATUS.PENDING: {checkStatus(STATUS.PENDING)}</div>
      <div>STATUS.SUCCESS: {checkStatus(STATUS.SUCCESS)}</div>
      <div className='mt-2'>
        <small className='text-muted'>API_TIMEOUT: {API_TIMEOUT}ms</small>
      </div>
      <small className='text-muted mt-2 d-block'>
        Benefits: Type-safe, no typos, easy to refactor, self-documenting
      </small>
    </div>
  );
};

export default Constants;
