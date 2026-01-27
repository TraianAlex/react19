import { useState, useEffect } from 'react';

const CustomHooks = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>14. Custom Hooks for Logic Reuse</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Custom hook</h5>
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
                Extract reusable logic into custom hooks. Custom hooks allow you to share stateful 
                logic between components while keeping components clean and focused.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Custom hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Search API call with debounced value
    searchAPI(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Custom hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const GoodApproach = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>
      <div className='mb-3'>
        <label className='form-label'>Search (debounced by 500ms):</label>
        <input
          type='text'
          className='form-control'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Type to search...'
        />
      </div>
      <div className='alert alert-info'>
        <strong>Current input:</strong> {searchTerm || '(empty)'}
      </div>
      <div className='alert alert-success'>
        <strong>Debounced value:</strong> {debouncedSearchTerm || '(empty)'}
      </div>
      <small className='text-muted mt-2 d-block'>
        Benefits: Reusable logic, clean components, consistent behavior across app
      </small>
    </div>
  );
};

export default CustomHooks;
