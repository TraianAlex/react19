const TypeSafety = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>30. Type Safety with TypeScript</h1>

      <div className='row'>
        <div className='col-md-6'>
          <div className='card border-danger mb-4'>
            <div className='card-header bg-danger text-white'>
              <h5 className='mb-0'>❌ Bad: Basic but incomplete</h5>
            </div>
            <div className='card-body'>
              <BadExample />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Expressive and comprehensive</h5>
            </div>
            <div className='card-body'>
              <GoodExample />
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
                Whether it's TypeScript or PropTypes, type safety is more than just preventing bugs. 
                It is a way to communicate clearly, as we discussed earlier. Types serve as 
                documentation for our assumptions and help catch inconsistencies before they make it 
                into production.
              </p>
              <p>
                When designing TypeScript interfaces, the focus is on expressing intent clearly. 
                Well-crafted types make it easier for everyone on the team to understand how data 
                flows through the app and what to expect at each step.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// Basic but incomplete
interface User {
  id: string;
  name: string;
  email: string;
}

// Expressive and comprehensive
interface User {
  readonly id: string;
  name: string;
  email: string;
  profile?: {
    avatar?: {
      url: string;
      alt?: string;
    };
    bio?: string;
    location?: string;
  };
  permissions: readonly Permission[];
  status: 'active' | 'suspended' | 'pending';
  createdAt: Date;
  lastLoginAt: Date | null;
}

// Component props that express relationships
interface UserProfileProps {
  user: User;
  currentUser?: User;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ❌ Bad: Basic but incomplete
interface BadUser {
  id: string;
  name: string;
  email: string;
}

const BadExample = () => {
  const user: BadUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  return (
    <div>
      <h6>{user.name}</h6>
      <p className='text-muted'>{user.email}</p>
      <div className='mt-3'>
        <small className='text-muted'>
          Problems: No readonly protection, no optional fields, no status tracking,
          no relationship information
        </small>
      </div>
    </div>
  );
};

// ✅ Good: Expressive and comprehensive
interface Permission {
  id: string;
  name: string;
}

interface UserProfile {
  avatar?: {
    url: string;
    alt?: string;
  };
  bio?: string;
  location?: string;
}

interface GoodUser {
  readonly id: string;
  name: string;
  email: string;
  profile?: UserProfile;
  permissions: readonly Permission[];
  status: 'active' | 'suspended' | 'pending';
  createdAt: Date;
  lastLoginAt: Date | null;
}

interface UserProfileProps {
  user: GoodUser;
  currentUser?: GoodUser;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

const GoodExample = () => {
  const user: GoodUser = {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    profile: {
      avatar: {
        url: 'https://i.pravatar.cc/150?img=1',
        alt: 'Jane Doe',
      },
      bio: 'Software developer',
      location: 'San Francisco, CA',
    },
    permissions: [
      { id: '1', name: 'read' },
      { id: '2', name: 'write' },
    ],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
  };

  const props: UserProfileProps = {
    user,
    canEdit: true,
    canDelete: false,
  };

  return (
    <div>
      <div className='mb-2'>
        <span
          className={`badge ${
            user.status === 'active'
              ? 'bg-success'
              : user.status === 'suspended'
              ? 'bg-danger'
              : 'bg-warning'
          }`}
        >
          {user.status}
        </span>
      </div>
      {user.profile?.avatar && (
        <img
          src={user.profile.avatar.url}
          alt={user.profile.avatar.alt || user.name}
          className='rounded-circle mb-3'
          style={{ width: '80px', height: '80px' }}
        />
      )}
      <h6>{user.name}</h6>
      <p className='text-muted'>{user.email}</p>
      {user.profile?.bio && <p>{user.profile.bio}</p>}
      <div className='mt-3'>
        <small className='text-muted'>
          Benefits: Readonly protection, optional fields, status tracking,
          relationship information, compile-time error checking
        </small>
      </div>
    </div>
  );
};

export default TypeSafety;
