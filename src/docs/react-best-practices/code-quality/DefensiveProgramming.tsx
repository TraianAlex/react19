import { useQuery } from '@tanstack/react-query';

// Free API: JSONPlaceholder
const fetchUser = async (userId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

const DefensiveProgramming = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>28. Defensive Programming</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Assumes perfect data structure</h5>
            </div>
            <div className='card-body'>
              <BadApproach userId={1} />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Handles imperfect data gracefully</h5>
            </div>
            <div className='card-body'>
              <GoodApproach userId={1} />
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
                Handle imperfect data gracefully. Use optional chaining and default values.
              </p>
              <p>
                Defensive Programming for external data. Handles imperfect data gracefully.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Assumes perfect data structure
const UserCard = ({ user }) => (
  <div>
    <img src={user.profile.avatar.url} alt={user.name} />
    <h3>{user.name}</h3>
    <p>{user.profile.bio}</p>
  </div>
);

// Handles imperfect data gracefully
const UserCard = ({ user }) => {
  const avatarUrl = user?.profile?.avatar?.url;
  const bio = user?.profile?.bio;
  
  return (
    <div>
      {avatarUrl && (
        <img src={avatarUrl} alt={user?.name || 'User'} />
      )}
      <h3>{user?.name || 'Unknown User'}</h3>
      {bio && <p>{bio}</p>}
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Assumes perfect data structure
// NOTE: This code would crash if user.profile.avatar.url doesn't exist
// We're showing what NOT to do - accessing nested properties without checks
const BadApproach = ({ userId }: { userId: number }) => {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (!user) return null;

  // Simulating what happens when you assume the data structure
  // In real code, this would crash: user.profile.avatar.url
  // We're using a mock to demonstrate the problem
  const mockProfile = {
    avatar: { url: undefined },
    bio: undefined,
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='alert alert-danger mb-3'>
          <strong>❌ This code would crash:</strong>
          <pre className='mb-0 mt-2 bg-dark text-white p-2 rounded'>
            <code>{`<img src={user.profile.avatar.url} />`}</code>
          </pre>
          <small className='d-block mt-2'>
            Error: Cannot read properties of undefined (reading 'avatar')
          </small>
        </div>
        <div className='mb-3'>
          <h5>{user.name}</h5>
          <p className='text-muted'>{user.email}</p>
        </div>
        <div className='alert alert-warning'>
          <small>
            <strong>Problem:</strong> The code assumes <code>user.profile.avatar.url</code> and{' '}
            <code>user.profile.bio</code> exist, but the API doesn't return these fields. Without
            defensive programming, accessing these would cause a runtime error.
          </small>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Handles imperfect data gracefully
const GoodApproach = ({ userId }: { userId: number }) => {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  const avatarUrl = user?.address?.street; // Using available field as example
  const bio = user?.company?.catchPhrase; // Using available field as example

  return (
    <div className='card'>
      <div className='card-body'>
        {avatarUrl && (
          <div
            className='bg-secondary rounded-circle mb-3 d-flex align-items-center justify-content-center text-white'
            style={{ width: '80px', height: '80px' }}
          >
            {user?.name?.charAt(0) || '?'}
          </div>
        )}
        <h5>{user?.name || 'Unknown User'}</h5>
        <p className='text-muted'>{user?.email || 'No email available'}</p>
        {bio && <p>{bio}</p>}
        {user?.phone && (
          <p className='text-muted small'>
            <strong>Phone:</strong> {user.phone}
          </p>
        )}
      </div>
    </div>
  );
};

export default DefensiveProgramming;
