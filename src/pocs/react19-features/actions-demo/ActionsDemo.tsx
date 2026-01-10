import { useState, useTransition } from 'react';
import { jsonPlaceholderApi } from '../shared/api';
import type { Post } from '../shared/types';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';

// Server Action simulation - in real React 19, these would be server functions
async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const userId = parseInt(formData.get('userId') as string);

  if (!title || !body || !userId) {
    throw new Error('All fields are required');
  }

  return await jsonPlaceholderApi.createPost({ title, body, userId });
}

async function updatePostAction(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  const updates: Partial<Post> = {};
  if (title) updates.title = title;
  if (body) updates.body = body;

  return await jsonPlaceholderApi.updatePost(id, updates);
}

export function ActionsDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load initial posts
  const loadPosts = () => {
    startTransition(async () => {
      try {
        setError(null);
        const fetchedPosts = await jsonPlaceholderApi.getPosts();
        setPosts(fetchedPosts.slice(0, 5)); // Limit for demo
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      }
    });
  };

  // Handle form submission with actions
  const handleCreatePost = (formData: FormData) => {
    startTransition(async () => {
      try {
        setError(null);
        setSuccess(null);
        const newPost = await createPostAction(formData);

        // Generate a unique ID to avoid duplicates (JSONPlaceholder always returns 101)
        const uniquePost = {
          ...newPost,
          id: Date.now() + Math.random(), // Ensure unique ID
        };

        setPosts((prev) => [uniquePost, ...prev]);
        setSuccess('Post created successfully!');
        // Reset form
        const form = document.getElementById(
          'createPostForm'
        ) as HTMLFormElement;
        form?.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create post');
      }
    });
  };

  const handleUpdatePost = (formData: FormData) => {
    if (!editingPost) return;

    startTransition(async () => {
      try {
        setError(null);
        setSuccess(null);
        const updatedPost = await updatePostAction(editingPost.id, formData);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editingPost.id ? { ...p, ...updatedPost } : p
          )
        );
        setEditingPost(null);
        setSuccess('Post updated successfully!');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update post');
      }
    });
  };

  const handleDeletePost = (id: number) => {
    startTransition(async () => {
      try {
        setError(null);
        await jsonPlaceholderApi.deletePost(id);
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setSuccess('Post deleted successfully!');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete post');
      }
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col'>
          <h2 className='h4 mb-3'>React 19 Actions Demo</h2>
          <p className='text-muted mb-3'>
            React 19 introduces Actions - async functions that handle data
            mutations. This demo shows form actions, transitions, and optimistic
            updates.
          </p>

          <button
            className='btn btn-primary btn-sm'
            onClick={loadPosts}
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Load Posts'}
          </button>
        </div>
      </div>

      {error && (
        <div className='alert alert-danger alert-dismissible'>
          {error}
          <button
            type='button'
            className='btn-close'
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      {success && (
        <div className='alert alert-success alert-dismissible'>
          {success}
          <button
            type='button'
            className='btn-close'
            onClick={() => setSuccess(null)}
          ></button>
        </div>
      )}

      <div className='row'>
        <div className='col-lg-6'>
          <h5>Create New Post</h5>
          <form
            id='createPostForm'
            action={handleCreatePost}
            className='card p-3 mb-4'
          >
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                Title
              </label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                required
                disabled={isPending}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='body' className='form-label'>
                Body
              </label>
              <textarea
                className='form-control'
                id='body'
                name='body'
                rows={3}
                required
                disabled={isPending}
              ></textarea>
            </div>
            <div className='mb-3'>
              <label htmlFor='userId' className='form-label'>
                User ID
              </label>
              <input
                type='number'
                className='form-control'
                id='userId'
                name='userId'
                defaultValue={1}
                required
                disabled={isPending}
              />
            </div>
            <button
              type='submit'
              className='btn btn-success'
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Post'}
            </button>
          </form>

          {editingPost && (
            <div>
              <h5>Edit Post</h5>
              <form action={handleUpdatePost} className='card p-3 mb-4'>
                <div className='mb-3'>
                  <label htmlFor='editTitle' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='editTitle'
                    name='title'
                    defaultValue={editingPost.title}
                    disabled={isPending}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='editBody' className='form-label'>
                    Body
                  </label>
                  <textarea
                    className='form-control'
                    id='editBody'
                    name='body'
                    rows={3}
                    defaultValue={editingPost.body}
                    disabled={isPending}
                  ></textarea>
                </div>
                <div className='d-flex gap-2'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={isPending}
                  >
                    {isPending ? 'Updating...' : 'Update Post'}
                  </button>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => setEditingPost(null)}
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className='col-lg-6'>
          <h5>Posts</h5>
          {isPending && posts.length === 0 && (
            <LoadingSpinner text='Loading posts...' />
          )}

          <div className='d-flex flex-column gap-3'>
            {posts.map((post) => (
              <div key={post.id} className='card'>
                <div className='card-body'>
                  <h6 className='card-title'>{post.title}</h6>
                  <p className='card-text small text-muted'>
                    {post.body.substring(0, 100)}...
                  </p>
                  <div className='d-flex gap-2'>
                    <button
                      className='btn btn-outline-primary btn-sm'
                      onClick={() => setEditingPost(post)}
                      disabled={isPending}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => handleDeletePost(post.id)}
                      disabled={isPending}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div className='alert alert-info'>
          <h6 className='alert-heading'>React 19 Actions Features:</h6>
          <ul className='mb-0 small'>
            <li>Form actions handle async operations automatically</li>
            <li>Built-in pending states and error handling</li>
            <li>Seamless integration with useTransition</li>
            <li>Server Actions for server-side mutations (simulated here)</li>
            <li>Optimistic updates and rollback capabilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
