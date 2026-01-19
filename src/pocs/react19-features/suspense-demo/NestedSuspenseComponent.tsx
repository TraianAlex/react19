import { Suspense } from 'react';
import { PostComments } from './PostComments';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';
import { PostContent } from './PostContent';
import { jsonPlaceholderApi } from '../shared/api';
import { promiseCache } from './SuspenseDemo';

export function NestedSuspenseContent({ postId }: { postId: number }) {
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
