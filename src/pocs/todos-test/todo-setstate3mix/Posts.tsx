import { Suspense, use, useMemo } from 'react';
import { fetchPosts } from './actions';
import LoadingSpinner from '../../../components/loading-spinner';

let cachedPostsPromise: Promise<any[]> | null = null;

function PostsContent() {
  const postsPromise = useMemo(() => {
    if (!cachedPostsPromise) {
      cachedPostsPromise = fetchPosts();
    }
    return cachedPostsPromise;
  }, []);
  const posts = use(postsPromise);

  return (
    <div className='mt-3'>
      {posts?.map((post: any) => (
        <div key={post.id}>
          <h5>{post.title}</h5>
          <div>{post.body}</div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export const Posts = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PostsContent />
    </Suspense>
  );
};