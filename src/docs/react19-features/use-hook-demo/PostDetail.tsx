import { use } from 'react';
import { Post } from '../shared/types';

// Component demonstrating use() with context-like behavior
export function PostDetail({ postPromise }: { postPromise: Promise<Post> }) {
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
