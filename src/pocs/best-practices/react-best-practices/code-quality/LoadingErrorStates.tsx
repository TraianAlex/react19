import { useQuery } from '@tanstack/react-query';

// Free API: JSONPlaceholder
const fetchUser = async (userId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

const LoadingErrorStates = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>29. Loading & Error States</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: First-class loading and error states</h5>
            </div>
            <div className='card-body'>
              <UserProfile userId={1} />
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
                Treat loading and error states as first-class UI concerns. Provide meaningful 
                feedback to users.
              </p>
              <p>
                Loading and Error States as first-class UI concerns. Treat loading and error states 
                as first-class UI concerns.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`const UserProfile = ({ userId }) => {
  const { data: user, isLoading, error } = useQuery(
    ['user', userId], 
    () => fetchUser(userId)
  );
  
  if (isLoading) {
    return <UserProfileSkeleton />;
  }
  
  if (error) {
    return (
      <ErrorCard 
        title="Unable to load profile"
        message="Please try again in a moment"
        onRetry={() => queryClient.invalidateQueries(['user', userId])}
      />
    );
  }
  
  if (!user) {
    return (
      <EmptyState 
        title="User not found"
        message="This user profile doesn't exist or has been removed"
      />
    );
  }
  
  return <UserProfileContent user={user} />;
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfile = ({ userId }: { userId: number }) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (error) {
    return (
      <ErrorCard
        title='Unable to load profile'
        message='Please try again in a moment'
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!user) {
    return (
      <EmptyState
        title='User not found'
        message="This user profile doesn't exist or has been removed"
      />
    );
  }

  return <UserProfileContent user={user} />;
};

const UserProfileSkeleton = () => {
  return (
    <div>
      <div className='placeholder-glow'>
        <span className='placeholder col-12 placeholder-lg mb-2'></span>
        <span className='placeholder col-6 placeholder-lg mb-2'></span>
        <span className='placeholder col-8 placeholder-lg'></span>
      </div>
      <div className='text-center mt-3'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  );
};

const ErrorCard = ({
  title,
  message,
  onRetry,
}: {
  title: string;
  message: string;
  onRetry: () => void;
}) => {
  return (
    <div className='alert alert-danger'>
      <h5>{title}</h5>
      <p className='mb-3'>{message}</p>
      <button className='btn btn-primary' onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

const EmptyState = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className='text-center py-5'>
      <div className='mb-3'>
        <svg
          width='64'
          height='64'
          fill='currentColor'
          viewBox='0 0 16 16'
          className='text-muted'
        >
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
        </svg>
      </div>
      <h5>{title}</h5>
      <p className='text-muted'>{message}</p>
    </div>
  );
};

const UserProfileContent = ({ user }: { user: any }) => {
  return (
    <div>
      <h5>{user.name}</h5>
      <p className='text-muted'>{user.email}</p>
      <p className='text-muted'>{user.phone}</p>
      <div className='card mt-3'>
        <div className='card-body'>
          <h6>Company</h6>
          <p className='mb-0'>{user.company?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingErrorStates;
