import { lazy, Suspense, useState } from 'react';

const CodeSplitting = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>8. Code Splitting and Lazy Loading</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Lazy loading components</h5>
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
                Split code into smaller chunks and load them on demand to improve initial load time.
                This reduces the initial bundle size and improves the user experience.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Lazy loading components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);

// ✅ Good: Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simulated heavy component
const HeavyComponent = () => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5>Heavy Component Loaded!</h5>
        <p className='mb-0'>This component was loaded on demand.</p>
      </div>
    </div>
  );
};

// Lazy load the heavy component
const LazyHeavyComponent = lazy(() =>
  Promise.resolve({ default: HeavyComponent })
);

const GoodApproach = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <button
        className='btn btn-primary mb-3'
        onClick={() => setShowHeavy(!showHeavy)}
      >
        {showHeavy ? 'Hide' : 'Load'} Heavy Component
      </button>
      {showHeavy && (
        <Suspense fallback={<div className='alert alert-info'>Loading component...</div>}>
          <LazyHeavyComponent />
        </Suspense>
      )}
      <small className='text-muted mt-2 d-block'>
        Benefits: Smaller initial bundle, faster initial load, components loaded on demand
      </small>
    </div>
  );
};

export default CodeSplitting;
