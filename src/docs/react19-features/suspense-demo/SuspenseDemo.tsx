import { Suspense, useState } from 'react';
import {
  ErrorBoundary,
  UseErrorBoundary,
} from '../shared/components/ErrorBoundary';
import { NestedSuspenseContent } from './NestedSuspenseComponent';
import { ConcurrentPosts } from './ConcurentPosts';
import { SlowComponent } from './SlowComponent';

// Simple cache to prevent infinite loops
export const promiseCache = new Map<string, Promise<any>>();
// Simple promise cache for the slow component
export const slowComponentCache = new Map<string, Promise<string>>();

export function SuspenseDemo() {
  const [selectedDemo, setSelectedDemo] = useState<string>('nested');
  const [selectedPostId, setSelectedPostId] = useState(1);
  const [shouldError, setShouldError] = useState(false);
  const [key, setKey] = useState(0); // For forcing re-render

  const resetDemo = () => {
    // Clear all promise caches to force fresh data
    promiseCache.clear();
    slowComponentCache.clear();
    setKey((prev) => prev + 1);
    setShouldError(false);
  };

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col'>
          <h2 className='h4 mb-3'>React 19 Suspense Improvements Demo</h2>
          <p className='text-muted mb-3'>
            React 19 improves Suspense with better error boundaries, nested
            suspense handling, and enhanced integration with the new use() hook
            and concurrent features.
          </p>

          <div className='d-flex gap-2 mb-3 flex-wrap'>
            <button
              className={`btn btn-sm ${
                selectedDemo === 'nested'
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => setSelectedDemo('nested')}
            >
              Nested Suspense
            </button>
            <button
              className={`btn btn-sm ${
                selectedDemo === 'concurrent'
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => setSelectedDemo('concurrent')}
            >
              Concurrent Loading
            </button>
            <button
              className={`btn btn-sm ${
                selectedDemo === 'error' ? 'btn-primary' : 'btn-outline-primary'
              }`}
              onClick={() => setSelectedDemo('error')}
            >
              Error Handling
            </button>
            <button
              className='btn btn-outline-secondary btn-sm'
              onClick={resetDemo}
            >
              Reset Demo
            </button>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          {selectedDemo === 'nested' && (
            <div>
              <h5>Nested Suspense Boundaries</h5>
              <p className='text-muted mb-3'>
                Different parts of the UI can have their own loading states with
                nested Suspense boundaries.
              </p>

              <div className='mb-3'>
                <label className='form-label'>Select Post ID:</label>
                <select
                  className='form-select w-auto d-inline-block ms-2'
                  value={selectedPostId}
                  onChange={(e) => setSelectedPostId(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((id) => (
                    <option key={id} value={id}>
                      Post {id}
                    </option>
                  ))}
                </select>
              </div>

              <ErrorBoundary>
                <NestedSuspenseContent
                  key={`${selectedPostId}-${key}`}
                  postId={selectedPostId}
                />
              </ErrorBoundary>
            </div>
          )}

          {selectedDemo === 'concurrent' && (
            <div>
              <h5>Concurrent Suspense Boundaries</h5>
              <p className='text-muted mb-3'>
                Multiple Suspense boundaries can load concurrently, each with
                independent loading states.
              </p>

              <ErrorBoundary>
                <ConcurrentPosts key={key} />
              </ErrorBoundary>
            </div>
          )}

          {selectedDemo === 'error' && (
            <div>
              <h5>Suspense with Error Boundaries</h5>
              <p className='text-muted mb-3'>
                Suspense works seamlessly with Error Boundaries for
                comprehensive error handling.
              </p>

              <div className='mb-3'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='errorCheck'
                    checked={shouldError}
                    onChange={(e) => setShouldError(e.target.checked)}
                  />
                  <label className='form-check-label' htmlFor='errorCheck'>
                    Simulate error in slow component
                  </label>
                </div>
              </div>

              <UseErrorBoundary key={`error-boundary-${shouldError}-${key}`}>
                <Suspense
                  fallback={
                    <div className='alert alert-info'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='spinner-border spinner-border-sm me-2'
                          role='status'
                        >
                          <span className='visually-hidden'>Loading...</span>
                        </div>
                        <span>Loading slow component (3 seconds)...</span>
                      </div>
                    </div>
                  }
                >
                  <SlowComponent
                    key={`${shouldError}-${key}`}
                    shouldError={shouldError}
                  />
                </Suspense>
              </UseErrorBoundary>
            </div>
          )}
        </div>
      </div>

      <div className='mt-4'>
        <div className='alert alert-info'>
          <h6 className='alert-heading'>React 19 Suspense Improvements:</h6>
          <ul className='mb-0 small'>
            <li>
              <strong>Better Error Integration:</strong> Seamless work with
              Error Boundaries
            </li>
            <li>
              <strong>Nested Boundaries:</strong> Independent loading states for
              different UI parts
            </li>
            <li>
              <strong>use() Hook Integration:</strong> Direct promise
              consumption in components
            </li>
            <li>
              <strong>Concurrent Loading:</strong> Multiple boundaries can load
              simultaneously
            </li>
            <li>
              <strong>Improved Performance:</strong> Better handling of
              component updates during suspense
            </li>
            <li>
              <strong>Server Components:</strong> Enhanced support for
              server-side rendering (not shown here)
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-3'>
        <div className='card'>
          <div className='card-body'>
            <h6 className='card-title'>Demo Features:</h6>
            <div className='row'>
              <div className='col-md-4'>
                <strong>Nested Suspense:</strong>
                <ul className='small mb-0'>
                  <li>Post loads first</li>
                  <li>Comments load separately</li>
                  <li>Independent loading states</li>
                </ul>
              </div>
              <div className='col-md-4'>
                <strong>Concurrent Loading:</strong>
                <ul className='small mb-0'>
                  <li>Three posts load simultaneously</li>
                  <li>Each has its own loading state</li>
                  <li>No blocking between components</li>
                </ul>
              </div>
              <div className='col-md-4'>
                <strong>Error Handling:</strong>
                <ul className='small mb-0'>
                  <li>Simulated slow loading</li>
                  <li>Optional error simulation</li>
                  <li>Graceful error recovery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
