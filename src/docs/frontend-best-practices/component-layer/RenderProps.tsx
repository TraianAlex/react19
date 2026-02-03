import { useState, useEffect, ReactNode } from 'react';

const RenderProps = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>6. Render Props Pattern</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Render props pattern</h5>
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
                Share code between components using a prop whose value is a function. This pattern 
                allows you to share stateful logic while giving the consumer full control over rendering.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Render props pattern
const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(position);
};

// Usage
<MouseTracker
  render={({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Render props pattern
interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: MousePosition) => ReactNode;
}

const MouseTracker = ({ render }: MouseTrackerProps) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <>{render(position)}</>;
};

const GoodApproach = () => {
  return (
    <div>
      <div className='mb-4'>
        <h6>Mouse Position Tracker</h6>
        <MouseTracker
          render={({ x, y }) => (
            <div className='alert alert-info'>
              Mouse position: <strong>{x}</strong>, <strong>{y}</strong>
            </div>
          )}
        />
      </div>

      <div className='mb-4'>
        <h6>Custom Display</h6>
        <MouseTracker
          render={({ x, y }) => (
            <div className='card'>
              <div className='card-body'>
                <p className='mb-0'>
                  X coordinate: <span className='badge bg-primary'>{x}</span>
                </p>
                <p className='mb-0'>
                  Y coordinate: <span className='badge bg-success'>{y}</span>
                </p>
              </div>
            </div>
          )}
        />
      </div>

      <small className='text-muted mt-2 d-block'>
        Benefits: Share stateful logic, full control over rendering, flexible and reusable
      </small>
    </div>
  );
};

export default RenderProps;
