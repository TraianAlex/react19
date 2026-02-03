import { lazy, Suspense, useState } from 'react';

const CodeSplitting = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>19. Code Splitting at Feature Boundaries</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Code splitting with lazy loading</h5>
            </div>
            <div className='card-body'>
              <CodeSplittingExample />
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
                We think about the loading experience as part of the user interface. A fast, progressive 
                loading experience is often more important than shaving milliseconds off runtime performance.
              </p>
              <p>
                Code Splitting at feature boundaries. Split code at feature boundaries. Use lazy loading 
                for routes and large components.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Route-level splitting
const UserProfile = lazy(() => import('../features/userProfile'));
const AdminPanel = lazy(() => import('../features/admin'));

// Component-level splitting for large features
const AdvancedCharts = lazy(() => import('./AdvancedCharts'));

const Dashboard = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div>
      <BasicStats />
      {showAdvanced && (
        <Suspense fallback={<ChartSkeleton />}>
          <AdvancedCharts />
        </Suspense>
      )}
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

// Lazy load heavy component
const HeavyChart = lazy(() =>
  import('./HeavyChart').catch(() => ({
    default: () => <div className='alert alert-danger'>Failed to load chart</div>,
  }))
);

const CodeSplittingExample = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <div className='mb-3'>
        <h5>Dashboard</h5>
        <p>Basic stats are always loaded.</p>
        <div className='card'>
          <div className='card-body'>
            <h6>Basic Stats</h6>
            <p className='mb-0'>Total Users: 1,234</p>
            <p className='mb-0'>Active Sessions: 567</p>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? 'Hide' : 'Show'} Advanced Charts
        </button>
        <p className='text-muted mt-2'>
          Advanced charts are only loaded when needed (code splitting).
          Check Network tab to see the chunk being loaded.
        </p>
      </div>

      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}

      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Benefits:</strong>
          <ul className='mb-0 mt-2'>
            <li>Initial bundle size is smaller</li>
            <li>Heavy components only load when needed</li>
            <li>Better initial page load performance</li>
            <li>Check Network tab to see lazy-loaded chunks</li>
          </ul>
        </small>
      </div>
    </div>
  );
};

const ChartSkeleton = () => {
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='placeholder-glow'>
          <span className='placeholder col-12 placeholder-lg'></span>
          <span className='placeholder col-12 placeholder-lg mt-2'></span>
          <span className='placeholder col-12 placeholder-lg mt-2'></span>
        </div>
      </div>
    </div>
  );
};

export default CodeSplitting;
