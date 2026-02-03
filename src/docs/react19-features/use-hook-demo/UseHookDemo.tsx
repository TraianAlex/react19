import { Suspense, useState } from 'react';
import { jsonPlaceholderApi } from '../shared/api';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';
import { PostsList } from './PostList';
import { PostDetail } from './PostDetail';

export function UseHookDemo() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [postsPromise, setPostsPromise] = useState(() =>
    jsonPlaceholderApi.getPosts()
  );

  const refreshPosts = () => {
    setPostsPromise(jsonPlaceholderApi.getPosts());
    setSelectedPostId(null);
  };

  const selectedPostPromise = selectedPostId
    ? jsonPlaceholderApi.getPost(selectedPostId)
    : null;

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col'>
          <h2 className='h4 mb-3'>React 19 use() Hook Demo</h2>
          <p className='text-muted mb-3'>
            The new <code>use()</code> hook can consume promises and context
            directly in components. This demo shows promise consumption with
            automatic suspense integration.
          </p>

          <div className='d-flex gap-2 mb-3'>
            <button className='btn btn-primary btn-sm' onClick={refreshPosts}>
              Refresh Posts
            </button>
            {selectedPostId && (
              <button
                className='btn btn-outline-secondary btn-sm'
                onClick={() => setSelectedPostId(null)}
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-8'>
          <h5>Posts List (using use() hook)</h5>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner text='Loading posts...' />}>
              <div
                onClick={(e) => {
                  const card = (e.target as Element).closest('.card');
                  if (card) {
                    const postId = parseInt(
                      card.getAttribute('data-post-id') || '0'
                    );
                    if (postId) setSelectedPostId(postId);
                  }
                }}
              >
                <PostsList postsPromise={postsPromise} />
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className='col-lg-4'>
          <h5>Selected Post Detail</h5>
          {selectedPostPromise ? (
            <ErrorBoundary>
              <Suspense
                fallback={<LoadingSpinner size='sm' text='Loading post...' />}
              >
                <PostDetail postPromise={selectedPostPromise} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <div className='card'>
              <div className='card-body text-center text-muted'>
                <p>Click on a post to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='mt-4'>
        <div className='alert alert-info'>
          <h6 className='alert-heading'>React 19 use() Hook Features:</h6>
          <ul className='mb-0 small'>
            <li>Can consume promises directly in components</li>
            <li>Automatically integrates with Suspense boundaries</li>
            <li>Handles loading and error states seamlessly</li>
            <li>Can also consume Context (alternative to useContext)</li>
            <li>Works with concurrent features and transitions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
