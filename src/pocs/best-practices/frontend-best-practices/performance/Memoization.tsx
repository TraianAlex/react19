import { useState, useMemo, useCallback, memo } from 'react';

const Memoization = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>7. Memoization Strategy</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Unnecessary re-renders</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Memoized component</h5>
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
                Use React.memo, useMemo, and useCallback appropriately to prevent unnecessary re-renders.
                Don't memoize everything - only use it when profiling shows a real benefit.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Component re-renders on every parent update
const ExpensiveComponent = ({ data }) => {
  const processedData = expensiveCalculation(data);
  return <div>{processedData}</div>;
};

// ✅ Good: Memoized component
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(
    () => expensiveCalculation(data),
    [data]
  );
  return <div>{processedData}</div>;
});

// ✅ Good: Memoized callbacks
const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Stable reference

  return <Child onClick={handleClick} />;
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Expensive calculation simulation
const expensiveCalculation = (items: number[]): number => {
  return items.reduce((sum, item) => sum + item * item, 0);
};

// ❌ Bad: Component re-renders on every parent update
const BadExpensiveComponent = ({ data }: { data: number[] }) => {
  const processedData = expensiveCalculation(data);
  return (
    <div>
      <p>Sum of squares: {processedData}</p>
      <small className='text-muted'>Re-renders every time parent updates</small>
    </div>
  );
};

const BadApproach = () => {
  const [count, setCount] = useState(0);
  const [data] = useState([1, 2, 3, 4, 5]);

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={() => setCount(count + 1)}>
        Count: {count} (triggers re-render)
      </button>
      <BadExpensiveComponent data={data} />
      <small className='text-muted mt-2 d-block'>
        Problems: Unnecessary re-renders, wasted computation
      </small>
    </div>
  );
};

// ✅ Good: Memoized component
const GoodExpensiveComponent = memo(({ data }: { data: number[] }) => {
  const processedData = useMemo(() => expensiveCalculation(data), [data]);
  return (
    <div>
      <p>Sum of squares: {processedData}</p>
      <small className='text-muted'>Only re-renders when data changes</small>
    </div>
  );
});

const GoodChild = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <button className='btn btn-secondary' onClick={onClick}>
      Stable Callback
    </button>
  );
});

const GoodApproach = () => {
  const [count, setCount] = useState(0);
  const [data] = useState([1, 2, 3, 4, 5]);

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Stable reference

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={() => setCount(count + 1)}>
        Count: {count} (doesn't trigger expensive re-render)
      </button>
      <GoodExpensiveComponent data={data} />
      <div className='mt-3'>
        <GoodChild onClick={handleClick} />
      </div>
      <small className='text-muted mt-2 d-block'>
        Benefits: Prevents unnecessary re-renders, optimized performance
      </small>
    </div>
  );
};

export default Memoization;
