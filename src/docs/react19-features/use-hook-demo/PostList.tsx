import { use } from 'react';
import { Post } from '../shared/types';

// Component that uses the new `use()` hook with promises
export function PostsList({ postsPromise }: { postsPromise: Promise<Post[]> }) {
  // React 19's new use() hook - can consume promises directly
  const posts = use(postsPromise);

  return (
    <div className='row'>
      {posts.slice(0, 6).map((post) => (
        <div key={post.id} className='col-md-6 col-lg-4 mb-3'>
          <div
            className='card h-100'
            data-post-id={post.id}
            style={{ cursor: 'pointer' }}
          >
            <div className='card-body'>
              <h6 className='card-title text-truncate'>{post.title}</h6>
              <p className='card-text small text-muted'>
                {post.body.substring(0, 100)}...
              </p>
              <small className='text-muted'>User ID: {post.userId}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
