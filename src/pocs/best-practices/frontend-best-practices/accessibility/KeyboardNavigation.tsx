import { useState } from 'react';

const KeyboardNavigation = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>20. Keyboard Navigation</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Keyboard support</h5>
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
                Ensure all interactive elements are keyboard accessible. Users should be able to 
                navigate and interact with your application using only the keyboard.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Keyboard support
const CustomButton = ({ onClick, children }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GoodApproach = () => {
  const [count, setCount] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCount(count + 1);
    }
  };

  return (
    <div>
      <div className='mb-3'>
        <p>Try using Tab to focus and Enter/Space to activate:</p>
        <div
          role='button'
          tabIndex={0}
          onClick={() => setCount(count + 1)}
          onKeyDown={handleKeyDown}
          className='btn btn-primary'
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          Click me (Keyboard accessible)
        </div>
      </div>
      <div className='alert alert-info'>
        Count: <strong>{count}</strong>
      </div>
      <small className='text-muted mt-2 d-block'>
        Benefits: Keyboard users can interact, better accessibility, follows WCAG guidelines
      </small>
    </div>
  );
};

export default KeyboardNavigation;
