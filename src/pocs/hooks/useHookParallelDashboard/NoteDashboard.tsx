import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import NoteDashboardContent, { NoteDashboardProps } from './NoteDashboardContent';

/**
 * Note Dashboard Component
 *
 * Demonstrates EXAMPLE 3: Multiple Async Resources (Parallel Loading)
 *
 */
export default function NoteDashboard({ noteId }: NoteDashboardProps) {
  return (
    <div>
      <header className='text-center mb-4 pb-3 border-bottom'>
        <h1 className='display-4 mb-2'>📊 Note Dashboard</h1>
        <p className='text-muted'>
          Demonstrating React 19's{' '}
          <code className='bg-light px-2 py-1 rounded'>use()</code> hook with{' '}
          <strong>Parallel Loading</strong> (EXAMPLE 3)
        </p>
      </header>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DashboardSkeleton />}>
          <NoteDashboardContent noteId={noteId} />
        </Suspense>
      </ErrorBoundary>

      <footer className='mt-5 pt-4 border-top text-center text-muted'>
        <p className='small'>
          This dashboard demonstrates <strong>parallel loading</strong> - all
          API requests start simultaneously, making the page load faster than
          sequential (waterfall) loading.
        </p>
      </footer>
    </div>
  );
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className='alert alert-warning m-4' role='alert'>
      <h2 className='alert-heading'>Something went wrong:</h2>
      <pre className='bg-white p-3 rounded border'>{error.message}</pre>
      <button onClick={resetErrorBoundary} className='btn btn-warning mt-3'>
        Try again
      </button>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className='container-fluid mt-4' style={{ maxWidth: '1400px' }}>
      <div className='row g-4'>
        <div className='col-lg-8'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <div className='placeholder-glow mb-4'>
                <span className='placeholder col-8 placeholder-lg mb-3'></span>
                <div className='d-flex gap-3'>
                  <span className='placeholder col-3'></span>
                  <span className='placeholder col-4'></span>
                </div>
              </div>
              <div className='placeholder-glow'>
                <span className='placeholder col-12 mb-2'></span>
                <span className='placeholder col-12 mb-2'></span>
                <span className='placeholder col-10'></span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='card shadow-sm mb-4'>
            <div className='card-body'>
              <div className='placeholder-glow'>
                <span className='placeholder col-6 mb-3'></span>
                <span className='placeholder col-4 mb-3'></span>
                <span className='placeholder col-5'></span>
              </div>
            </div>
          </div>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <div className='placeholder-glow'>
                <span className='placeholder col-8 mb-2'></span>
                <span className='placeholder col-10 mb-2'></span>
                <span className='placeholder col-7'></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
