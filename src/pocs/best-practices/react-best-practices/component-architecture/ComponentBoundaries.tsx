import { useQuery } from '@tanstack/react-query';

// Free API: JSONPlaceholder
const fetchUser = async (userId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

const ComponentBoundaries = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>8. Component Boundaries</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Component knows too much</h5>
            </div>
            <div className='card-body'>
              <BadApproach userId={1} />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Clear boundaries</h5>
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
                Think in terms of component boundaries - not just breaking things into smaller pieces, 
                but creating the right boundaries. Components that handle styling shouldn't need to 
                understand your API structure.
              </p>
              <p>
                Components that know about business logic shouldn't also be responsible for styling 
                and layout. Components that handle styling and interaction shouldn't need to understand 
                your API structure.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Component knows too much
const UserCard = ({ userId }) => {
  const user = useQuery(['user', userId], fetchUser);
  return (
    <div className="card">
      <img src={user.data.avatar} />
      <h3>{user.data.name}</h3>
    </div>
  );
};

// ✅ Good: Clear boundaries
const UserCard = ({ user }) => {
  return (
    <Card>
      <Avatar src={user.avatar} />
      <Heading>{user.name}</Heading>
    </Card>
  );
};

// Container handles data fetching
const UserCardContainer = ({ userId }) => {
  const { data: user } = useQuery(['user', userId], fetchUser);
  return <UserCard user={user} />;
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Component knows too much
const BadApproach = ({ userId }: { userId: number }) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <div className='alert alert-info'>Loading...</div>;
  if (error) return <div className='alert alert-danger'>Error loading user</div>;

  return (
    <div className='card'>
      <div className='card-body'>
        <img
          src={`https://i.pravatar.cc/150?img=${userId}`}
          alt={user?.name}
          className='rounded-circle mb-3'
          style={{ width: '80px', height: '80px' }}
        />
        <h5>{user?.name}</h5>
        <p className='text-muted mb-0'>{user?.email}</p>
      </div>
    </div>
  );
};

// ✅ Good: Clear boundaries
const UserCard = ({ user }: { user: any }) => {
  if (!user) return null;

  return (
    <div className='card'>
      <div className='card-body'>
        <Avatar src={`https://i.pravatar.cc/150?img=${user.id}`} alt={user.name} />
        <Heading>{user.name}</Heading>
        <Text>{user.email}</Text>
      </div>
    </div>
  );
};

// Container handles data fetching
const UserCardContainer = ({ userId }: { userId: number }) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message='Error loading user' />;

  return <UserCard user={user} />;
};

// Presentational components with clear boundaries
const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    className='rounded-circle mb-3'
    style={{ width: '80px', height: '80px' }}
  />
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h5 className='mb-2'>{children}</h5>
);

const Text = ({ children }: { children: React.ReactNode }) => (
  <p className='text-muted mb-0'>{children}</p>
);

const LoadingSpinner = () => <div className='alert alert-info'>Loading...</div>;

const ErrorMessage = ({ message }: { message: string }) => (
  <div className='alert alert-danger'>{message}</div>
);

const GoodApproach = UserCardContainer;

export default ComponentBoundaries;
