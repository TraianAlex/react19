import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Free API: JSONPlaceholder
const fetchUser = async (userId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

const updateUser = async ({ userId, data }: { userId: number; data: any }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

const ContainerPresentational = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>6. Container vs Presentational Pattern</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Mixed responsibilities</h5>
            </div>
            <div className='card-body'>
              <BadApproach userId={1} />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Clear separation</h5>
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
                Components that know about business logic shouldn't also be responsible for styling 
                and layout. Separate containers (logic) from presentational components (UI).
              </p>
              <p>
                We often hear about "separation of concerns," but what does that actually look like 
                in a React application? You might have heard the term — "Component Boundaries". 
                Senior developers think in terms of Component boundaries ie. not just breaking things 
                into smaller pieces, but creating the right boundaries.
              </p>
              <p>
                Container vs. Presentational isn't dead, despite what some may claim. The pattern has 
                evolved, but the core insight remains valuable. Components that know about business 
                logic shouldn't also be responsible for styling and layout details. Components that 
                handle styling and interaction shouldn't need to understand your API structure.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ❌ Bad: Mixed responsibilities
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  const handleSave = async (data) => {
    await updateUser(userId, data);
    setUser(data);
    setEditing(false);
  };
  
  return (
    <div className="user-profile bg-white shadow-lg rounded-lg p-6">
      {editing ? (
        <UserEditForm user={user} onSave={handleSave} />
      ) : (
        <UserDisplay user={user} onEdit={() => setEditing(true)} />
      )}
    </div>
  );
};

// ✅ Good: Clear separation
const UserProfileContainer = ({ userId }) => {
  const { data: user } = useQuery(['user', userId], () => fetchUser(userId));
  const updateMutation = useMutation(updateUser);
  
  const handleSave = (data) => {
    updateMutation.mutate({ userId, data });
  };
  
  return <UserProfile user={user} onSave={handleSave} />;
};

const UserProfile = ({ user, onSave }) => {
  const [editing, setEditing] = useState(false);
  
  return (
    <Card>
      {editing ? (
        <UserEditForm user={user} onSave={onSave} />
      ) : (
        <UserDisplay user={user} onEdit={() => setEditing(true)} />
      )}
    </Card>
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

// ❌ Bad: Mixed responsibilities
const BadApproach = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async (data: any) => {
    setLoading(true);
    try {
      const updated = await updateUser({ userId, data });
      setUser(updated);
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return <div className='alert alert-info'>Loading...</div>;
  }

  return (
    <div className='user-profile bg-white shadow-lg rounded-lg p-6'>
      {editing ? (
        <UserEditForm user={user} onSave={handleSave} onCancel={() => setEditing(false)} />
      ) : (
        <UserDisplay user={user} onEdit={() => setEditing(true)} />
      )}
    </div>
  );
};

// ✅ Good: Clear separation
const UserProfileContainer = ({ userId }: { userId: number }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });

  const handleSave = (data: any) => {
    updateMutation.mutate({ userId, data });
  };

  if (isLoading) {
    return <div className='alert alert-info'>Loading...</div>;
  }

  return <UserProfile user={user} onSave={handleSave} />;
};

const UserProfile = ({ user, onSave }: { user: any; onSave: (data: any) => void }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className='card'>
      <div className='card-body'>
        {editing ? (
          <UserEditForm
            user={user}
            onSave={(data) => {
              onSave(data);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <UserDisplay user={user} onEdit={() => setEditing(true)} />
        )}
      </div>
    </div>
  );
};

// Presentational components
const UserDisplay = ({ user, onEdit }: { user: any; onEdit: () => void }) => {
  if (!user) return null;

  return (
    <div>
      <h5>{user.name}</h5>
      <p className='text-muted'>{user.email}</p>
      <p className='text-muted'>{user.phone}</p>
      <button onClick={onEdit} className='btn btn-sm btn-primary'>
        Edit
      </button>
    </div>
  );
};

const UserEditForm = ({
  user,
  onSave,
  onCancel,
}: {
  user: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='btn-group'>
        <button type='submit' className='btn btn-primary btn-sm'>
          Save
        </button>
        <button type='button' className='btn btn-secondary btn-sm' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const GoodApproach = UserProfileContainer;

export default ContainerPresentational;
