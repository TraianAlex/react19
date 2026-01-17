import { use } from 'react';
import { Comment } from '../shared/types';
import { promiseCache } from './SuspenseDemo';

// Component that fetches comments for a post
export function PostComments({ postId }: { postId: number }) {
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
