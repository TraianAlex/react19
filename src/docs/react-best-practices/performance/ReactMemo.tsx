import { useState, useCallback, memo } from 'react';

const ReactMemo = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>18. React.memo for Stable Props</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: React.memo with stable handlers</h5>
            </div>
            <div className='card-body'>
              <UserListExample />
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
                Use React.memo for components that receive the same props frequently but parent 
                re-renders often.
              </p>
              <p>
                React.memo for components that receive the same props frequently. But ensure handlers 
                are stable too.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Memoize components that receive stable props but parent re-renders often
const UserListItem = React.memo(({ user, onSelect }) => (
  <div onClick={() => onSelect(user.id)}>
    <img src={user.avatar} alt={user.name} />
    <span>{user.name}</span>
  </div>
));

// But ensure handlers are stable too
const UserList = ({ users }) => {
  const handleUserSelect = useCallback((userId) => {
    // handle selection
  }, []);
  
  return (
    <div>
      {users.map(user => (
        <UserListItem 
          key={user.id} 
          user={user} 
          onSelect={handleUserSelect}
        />
      ))}
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

interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Good: Memoize components with stable props
interface UserListItemProps {
  user: User;
  onSelect: (userId: number) => void;
}

const UserListItem = memo(({ user, onSelect }: UserListItemProps) => {
  console.log(`Rendering UserListItem: ${user.name}`);
  return (
    <div
      className='card mb-2'
      onClick={() => onSelect(user.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className='card-body'>
        <img
          src={`https://i.pravatar.cc/40?img=${user.id}`}
          alt={user.name}
          className='rounded-circle me-2'
        />
        <span>{user.name}</span>
      </div>
    </div>
  );
});

UserListItem.displayName = 'UserListItem';

// Ensure handlers are stable too
const UserListExample = () => {
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ]);
  const [counter, setCounter] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserSelect = useCallback((userId: number) => {
    setSelectedUserId(userId);
    alert(`Selected user: ${userId}`);
  }, []);

  return (
    <div>
      <div className='mb-3'>
        <button
          className='btn btn-primary'
          onClick={() => setCounter((c) => c + 1)}
        >
          Increment Counter: {counter}
        </button>
        <p className='text-muted mt-2'>
          Clicking this button causes parent to re-render, but UserListItem components
          won't re-render because props haven't changed (thanks to React.memo and useCallback)
        </p>
      </div>

      {selectedUserId && (
        <div className='alert alert-info'>
          Selected User ID: {selectedUserId}
        </div>
      )}

      <div className='mb-3'>
        <h6>User List (check console for re-renders):</h6>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} onSelect={handleUserSelect} />
        ))}
      </div>

      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Benefits:</strong>
          <ul className='mb-0 mt-2'>
            <li>UserListItem only re-renders when its props change</li>
            <li>handleUserSelect is stable thanks to useCallback</li>
            <li>Parent re-renders don't cause unnecessary child re-renders</li>
            <li>Check browser console to see render logs</li>
          </ul>
        </small>
      </div>
    </div>
  );
};

export default ReactMemo;
