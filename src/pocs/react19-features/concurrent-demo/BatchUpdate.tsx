import { startTransition, useState } from 'react';

// Batch updates demonstration
export default function BatchUpdatesDemo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // This will cause multiple renders in React 17, but batched in React 19
  const handleMultipleUpdates = () => {
    setCount1((prev) => prev + 1);
    setCount2((prev) => prev + 1);
    setCount3((prev) => prev + 1);
    setRenderCount((prev) => prev + 1);
  };

  // This uses startTransition to batch updates
  const handleTransitionUpdates = () => {
    startTransition(() => {
      setCount1((prev) => prev + 10);
      setCount2((prev) => prev + 10);
      setCount3((prev) => prev + 10);
      setRenderCount((prev) => prev + 1);
    });
  };

  return (
    <div className='card p-3'>
      <h6>Automatic Batching Demo</h6>
      <div className='row mb-3'>
        <div className='col-3'>
          <div className='text-center'>
            <div className='h4 text-primary'>{count1}</div>
            <small>Counter 1</small>
          </div>
        </div>
        <div className='col-3'>
          <div className='text-center'>
            <div className='h4 text-success'>{count2}</div>
            <small>Counter 2</small>
          </div>
        </div>
        <div className='col-3'>
          <div className='text-center'>
            <div className='h4 text-warning'>{count3}</div>
            <small>Counter 3</small>
          </div>
        </div>
        <div className='col-3'>
          <div className='text-center'>
            <div className='h4 text-info'>{renderCount}</div>
            <small>Renders</small>
          </div>
        </div>
      </div>

      <div className='d-flex gap-2'>
        <button
          className='btn btn-outline-primary btn-sm'
          onClick={handleMultipleUpdates}
        >
          Multiple Updates
        </button>
        <button
          className='btn btn-outline-success btn-sm'
          onClick={handleTransitionUpdates}
        >
          Transition Updates
        </button>
        <button
          className='btn btn-outline-secondary btn-sm'
          onClick={() => {
            setCount1(0);
            setCount2(0);
            setCount3(0);
            setRenderCount(0);
          }}
        >
          Reset
        </button>
      </div>

      <small className='text-muted mt-2'>
        React 19 automatically batches all updates, reducing unnecessary renders
      </small>
    </div>
  );
}
