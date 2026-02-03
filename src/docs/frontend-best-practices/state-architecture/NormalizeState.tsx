import { useState } from 'react';

const NormalizeState = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>2. Normalize State Structure</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Nested structure</h5>
            </div>
            <div className='card-body'>
              <BadApproach />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Normalized structure</h5>
            </div>
            <div className='card-body'>
              <GoodApproach />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Explanation</h5>
            </div>
            <div className='card-body'>
              <p>
                Keep state flat and normalized. Avoid nested structures that make updates complex.
              </p>
              <p>
                Normalized state structure makes it easier to update individual items, reduces 
                duplication, and simplifies data access patterns.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Nested structure
const state = {
  users: [
    { id: 1, name: 'John', posts: [{ id: 1, title: 'Post 1' }] }
  ]
};

// ✅ Good: Normalized structure
const state = {
  users: {
    '1': { id: 1, name: 'John', postIds: [1] }
  },
  posts: {
    '1': { id: 1, title: 'Post 1', userId: 1 }
  }
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Nested structure
interface BadUser {
  id: number;
  name: string;
  posts: { id: number; title: string }[];
}

const BadApproach = () => {
  const [users, setUsers] = useState<BadUser[]>([
    { id: 1, name: 'John', posts: [{ id: 1, title: 'Post 1' }] },
  ]);

  const updatePost = (userId: number, postId: number, newTitle: string) => {
    // Complex nested update
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              posts: user.posts.map((post) =>
                post.id === postId ? { ...post, title: newTitle } : post
              ),
            }
          : user
      )
    );
  };

  return (
    <div>
      <div className='mb-3'>
        <h6>User: {users[0].name}</h6>
        <p className='text-muted'>Posts: {users[0].posts.length}</p>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => updatePost(1, 1, 'Updated Post 1')}
        >
          Update Post (Complex nested update)
        </button>
      </div>
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: Complex nested updates, harder to maintain, data duplication
        </small>
      </div>
    </div>
  );
};

// ✅ Good: Normalized structure
interface NormalizedUser {
  id: number;
  name: string;
  postIds: number[];
}

interface NormalizedPost {
  id: number;
  title: string;
  userId: number;
}

interface NormalizedState {
  users: Record<string, NormalizedUser>;
  posts: Record<string, NormalizedPost>;
}

const GoodApproach = () => {
  const [state, setState] = useState<NormalizedState>({
    users: {
      '1': { id: 1, name: 'John', postIds: [1] },
    },
    posts: {
      '1': { id: 1, title: 'Post 1', userId: 1 },
    },
  });

  const updatePost = (postId: number, newTitle: string) => {
    // Simple flat update
    setState({
      ...state,
      posts: {
        ...state.posts,
        [postId]: { ...state.posts[postId], title: newTitle },
      },
    });
  };

  const user = state.users['1'];
  const userPosts = user.postIds.map((id) => state.posts[id.toString()]);

  return (
    <div>
      <div className='mb-3'>
        <h6>User: {user.name}</h6>
        <p className='text-muted'>Posts: {userPosts.length}</p>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => updatePost(1, 'Updated Post 1')}
        >
          Update Post (Simple flat update)
        </button>
      </div>
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Simple flat updates, easier to maintain, no data duplication
        </small>
      </div>
    </div>
  );
};

export default NormalizeState;
