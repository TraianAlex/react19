import { ComponentType } from 'react';

const HOC = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>25. Higher-Order Components (HOCs)</h1>

      <div className='row'>
        <div className='col-md-8'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: HOC pattern</h5>
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
                Use HOCs to share logic between components. Higher-order components are functions 
                that take a component and return a new component with additional functionality.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: HOC pattern
const withLoading = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & { loading?: boolean }) => {
    if (props.loading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
};

const UserProfile = ({ user }) => <div>{user.name}</div>;
const UserProfileWithLoading = withLoading(UserProfile);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: HOC pattern
interface WithLoadingProps {
  loading?: boolean;
}

const withLoading = <P extends object>(Component: ComponentType<P>) => {
  return (props: P & WithLoadingProps) => {
    if (props.loading) {
      return <div className='alert alert-info'>Loading...</div>;
    }
    const { loading, ...restProps } = props;
    return <Component {...(restProps as P)} />;
  };
};

interface UserProfileProps {
  user: {
    name: string;
    email: string;
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5>{user.name}</h5>
        <p className='mb-0'>{user.email}</p>
      </div>
    </div>
  );
};

const UserProfileWithLoading = withLoading(UserProfile);

const GoodApproach = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfileProps['user'] | null>(null);

  const toggleLoading = () => {
    setLoading(!loading);
    if (!loading) {
      setTimeout(() => {
        setUser({ name: 'John Doe', email: 'john@example.com' });
        setLoading(false);
      }, 2000);
    } else {
      setUser(null);
    }
  };

  return (
    <div>
      <button className='btn btn-primary mb-3' onClick={toggleLoading}>
        {loading ? 'Stop Loading' : 'Load User'}
      </button>
      {user && (
        <UserProfileWithLoading user={user} loading={loading} />
      )}
      {!user && !loading && (
        <div className='alert alert-secondary'>Click button to load user</div>
      )}
      <small className='text-muted mt-2 d-block'>
        Benefits: Reusable logic, separation of concerns, easy to compose
      </small>
    </div>
  );
};

import { useState } from 'react';

export default HOC;
