import { Suspense, useMemo } from 'react';
import { PostContent } from './PostContent';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import { jsonPlaceholderApi } from '../shared/api';

export function ConcurrentPosts() {
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
