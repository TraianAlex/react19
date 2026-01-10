import { Suspense, useState, use, useMemo } from 'react';
import { jsonPlaceholderApi } from '../shared/api';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import {
  ErrorBoundary,
  UseErrorBoundary,
} from '../shared/components/ErrorBoundary';
import type { Post, Comment } from '../shared/types';

// Component that fetches and displays post
function PostContent({ postPromise }: { postPromise: Promise<Post> }) {
  const post = use(postPromise);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{post.title}</h5>
        <p className='card-text'>{post.body}</p>
        <small className='text-muted'>By User {post.userId}</small>
      </div>
    </div>
  );
}

// Simple cache to prevent infinite loops
const promiseCache = new Map<string, Promise<any>>();

// Component that fetches comments for a post
function PostComments({ postId }: { postId: number }) {
  const cacheKey = `comments-${postId}`;

  if (!promiseCache.has(cacheKey)) {
    promiseCache.set(
      cacheKey,
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      ).then((res) => res.json())
    );
  }

  const comments = use(promiseCache.get(cacheKey)!);

  return (
    <div className='mt-3'>
      <h6>Comments ({comments.length})</h6>
      <div className='d-flex flex-column gap-2'>
        {comments.slice(0, 3).map((comment: Comment) => (
          <div key={comment.id} className='card card-body py-2'>
            <div className='d-flex justify-content-between align-items-start'>
              <div>
                <strong className='small'>{comment.name}</strong>
                <p className='mb-1 small'>{comment.body}</p>
                <small className='text-muted'>{comment.email}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Nested suspense component
function NestedSuspenseContent({ postId }: { postId: number }) {
  const cacheKey = `post-${postId}`;

  if (!promiseCache.has(cacheKey)) {
    promiseCache.set(cacheKey, jsonPlaceholderApi.getPost(postId));
  }

  const postPromise = promiseCache.get(cacheKey)!;

  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='sm' text='Loading post...' />}>
        <PostContent postPromise={postPromise} />

        {/* Nested Suspense for comments */}
        <Suspense
          fallback={<LoadingSpinner size='sm' text='Loading comments...' />}
        >
          <PostComments postId={postId} />
        </Suspense>
      </Suspense>
    </div>
  );
}

// Component that demonstrates multiple concurrent suspense boundaries
function ConcurrentPosts() {
  const post1Promise = useMemo(() => jsonPlaceholderApi.getPost(1), []);
  const post2Promise = useMemo(() => jsonPlaceholderApi.getPost(2), []);
  const post3Promise = useMemo(() => jsonPlaceholderApi.getPost(3), []);

  return (
    <div className='row'>
      <div className='col-md-4'>
        <Suspense
          fallback={<LoadingSpinner size='sm' text='Loading post 1...' />}
        >
          <PostContent postPromise={post1Promise} />
        </Suspense>
      </div>
      <div className='col-md-4'>
        <Suspense
          fallback={<LoadingSpinner size='sm' text='Loading post 2...' />}
        >
          <PostContent postPromise={post2Promise} />
        </Suspense>
      </div>
      <div className='col-md-4'>
        <Suspense
          fallback={<LoadingSpinner size='sm' text='Loading post 3...' />}
        >
          <PostContent postPromise={post3Promise} />
        </Suspense>
      </div>
    </div>
  );
}

// Simple promise cache for the slow component
const slowComponentCache = new Map<string, Promise<string>>();

// Component that simulates slow loading with error possibility
function SlowComponent({ shouldError }: { shouldError: boolean }) {
  const cacheKey = `slow-component-${shouldError}`;

  console.log(
    'SlowComponent render with shouldError:',
    shouldError,
    'cacheKey:',
    cacheKey
  );

  // Create promise only if not in cache
  if (!slowComponentCache.has(cacheKey)) {
    console.log('Creating new promise for cacheKey:', cacheKey);
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => {
        console.log(
          'Promise resolving for cacheKey:',
          cacheKey,
          'shouldError:',
          shouldError
        );
        if (shouldError) {
          resolve('ERROR_STATE'); // Special marker for error
        } else {
          resolve('Slow component loaded successfully!');
        }
      }, 3000);
    });

    slowComponentCache.set(cacheKey, promise);
  }

  const result = use(slowComponentCache.get(cacheKey)!);

  console.log('Component got result:', result);

  // Handle the error case by throwing an error that Error Boundary can catch
  if (result === 'ERROR_STATE') {
    console.log('Throwing error for Error Boundary to catch');
    throw new Error('Simulated error in slow component');
  }

  return (
    <div className='alert alert-success'>
      <h6 className='alert-heading'>Slow Component Result:</h6>
      <p className='mb-0'>{result}</p>
    </div>
  );
}

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
