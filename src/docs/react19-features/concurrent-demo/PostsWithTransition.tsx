import { useState, useTransition } from 'react';
import { Post } from '../shared/types';
import { jsonPlaceholderApi } from '../shared/api';

// Component that demonstrates useTransition for non-urgent updates
export default function PostsWithTransition() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();

  const loadPosts = () => {
    startTransition(async () => {
      try {
        const fetchedPosts = await jsonPlaceholderApi.getPosts();
        setPosts(fetchedPosts.slice(0, 20));
        setFilteredPosts(fetchedPosts.slice(0, 20));
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Use startTransition for non-urgent filtering
    startTransition(() => {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(term.toLowerCase()) ||
          post.body.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPosts(filtered);
    });
  };

  return (
    <div>
      <div className='d-flex gap-2 mb-3'>
        <button
          className='btn btn-primary btn-sm'
          onClick={loadPosts}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Load Posts'}
        </button>

        <input
          type='text'
          className='form-control form-control-sm'
          placeholder='Search posts...'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: '200px' }}
        />

        {isPending && (
          <span className='badge bg-info align-self-center'>Filtering...</span>
        )}
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredPosts.map((post) => (
          <div key={post.id} className='card mb-2'>
            <div className='card-body py-2'>
              <h6 className='card-title small'>{post.title}</h6>
              <p className='card-text small text-muted mb-1'>
                {post.body.substring(0, 100)}...
              </p>
              <small className='text-muted'>User {post.userId}</small>
            </div>
          </div>
        ))}

        {posts.length > 0 && filteredPosts.length === 0 && (
          <div className='text-center text-muted'>
            No posts match your search
          </div>
        )}
      </div>
    </div>
  );
}
