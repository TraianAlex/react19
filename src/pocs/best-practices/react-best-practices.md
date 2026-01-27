# React Best Practices: Senior Frontend Developer Guide

This document extracts best practices from senior frontend development principles, focusing on React applications. Each practice includes a short explanation and code examples.

---

## Table of Contents

1. [State Architecture](#state-architecture)
2. [Component Architecture](#component-architecture)
3. [Code Organization](#code-organization)
4. [Component Layer](#component-layer)
5. [Performance Optimization](#performance-optimization)
6. [Testing Strategies](#testing-strategies)
7. [Code Quality](#code-quality)
8. [Accessibility](#accessibility)
9. [DevOps](#devops)

---

## State Architecture

### 1. Classify State by Layer

**Explanation:** Not all state is the same. Classify state into layers: server state, global client state, local component state, and URL state. Each has a natural home and appropriate tooling.

**Example:**

```typescript
// ❌ Junior approach - treating server data like local state
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ✅ Senior approach - recognizing server state
const { data: users, isLoading, error } = useQuery('users', fetchUsers);
```

### 2. Server State Management

**Explanation:** Server state belongs in libraries like React Query, SWR, or Apollo. Server state has unique characteristics: it can become stale, needs to stay in sync with backend, and often needs to be shared across multiple parts of the app.

**Example:**

```typescript
// ❌ Bad: Managing server state with useState
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetchUsers()
    .then(setUsers)
    .finally(() => setLoading(false));
}, []);

// ✅ Good: Using React Query for server state
const { data: users, isLoading, error } = useQuery('users', fetchUsers);
```

### 3. Global Client State

**Explanation:** Global client state should live in context providers, Zustand, or Redux, but only when it needs to be global. Don't lift everything to global state "just in case" - it creates unnecessary coupling.

**Example:**

```typescript
// ❌ Bad: Everything in global state
const GlobalStore = {
  todos: [],
  modalOpen: false, // Only used in one component
  inputValue: '', // Only used in one component
};

// ✅ Good: Only truly global state is global
const GlobalStore = {
  user: null, // Used across multiple features
  theme: 'light', // Used across entire app
};

// Local state stays local
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false); // Local to Modal
};
```

### 4. Local Component State

**Explanation:** Local component state belongs in `useState` or `useReducer` when scoped to a single component. Think modal open/close flags, form values, or component-specific loading states.

**Example:**

```typescript
// ✅ Good: Local state for component-specific concerns
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // These don't need to escape the component
};
```

### 5. URL State

**Explanation:** URL state is best handled through the router when state affects what the user sees. Filters, pagination, selected tabs - if refreshing should preserve it, it belongs in the URL.

**Example:**

```typescript
// ❌ Bad: State in component, lost on refresh
const [selectedTab, setSelectedTab] = useState('profile');
const [page, setPage] = useState(1);

// ✅ Good: State in URL, preserved on refresh
const { tab = 'profile', page = 1 } = useSearchParams();
const navigate = useNavigate();

const handleTabChange = (newTab) => {
  navigate(`?tab=${newTab}&page=${page}`);
};
```

---

## Component Architecture

### 6. Container vs Presentational Pattern

**Explanation:** Components that know about business logic shouldn't also be responsible for styling and layout. Separate containers (logic) from presentational components (UI).

**Example:**

```typescript
// ❌ Bad: Mixed responsibilities
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
};
```

### 7. Custom Hooks for Logic Extraction

**Explanation:** Extract reusable stateful logic into custom hooks. Design a thoughtful API that feels intuitive, similar to React's built-in hooks.

**Example:**

```typescript
// ✅ Good: Well-designed custom hook API
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return [value, { toggle, setTrue, setFalse, setValue }];
};

// Usage feels natural and expressive
const [isModalOpen, { toggle: toggleModal, setTrue: openModal }] = useToggle();
```

### 8. Component Boundaries

**Explanation:** Think in terms of component boundaries - not just breaking things into smaller pieces, but creating the right boundaries. Components that handle styling shouldn't need to understand your API structure.

**Example:**

```typescript
// ❌ Bad: Component knows too much
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
};
```

---

## Code Organization

### 9. Feature-Based Directory Structure

**Explanation:** Organize files by feature rather than by type. Group everything related to a feature together - components, hooks, styles, and tests.

**Example:**

```
// ❌ Bad: File-type organization
src/
  components/
    LoginForm.jsx
    SignupForm.jsx
    UserProfile.jsx
    UserEditForm.jsx
  hooks/
    useAuth.js
    useUserProfile.js
  services/
    authApi.js
    userApi.js

// ✅ Good: Feature-based organization
src/
  features/
    auth/
      components/
        LoginForm.jsx
        SignupForm.jsx
      hooks/
        useAuth.js
      services/
        authApi.js
      index.js
    userProfile/
      components/
        UserProfile.jsx
        UserEditForm.jsx
      hooks/
        useUserProfile.js
      services/
        userApi.js
      index.js
  shared/
    components/
      Button/
      Modal/
    hooks/
    utils/
```

### 10. Export Strategies That Scale

**Explanation:** Use barrel exports for clean imports. Structure exports to enable tree shaking effectively.

**Example:**

```typescript
// ✅ Good: Barrel exports with re-exports
// features/userProfile/index.js
export { UserProfile } from './components/UserProfile';
export { UserEditForm } from './components/UserEditForm';
export { useUserProfile } from './hooks/useUserProfile';

// Clean imports
import { UserProfile, useUserProfile } from 'features/userProfile';

// ❌ Bad: Deep imports
import { UserProfile } from 'features/userProfile/components/UserProfile';
```

### 11. Tree Shaking Optimization

**Explanation:** Structure exports to make tree shaking work effectively. Avoid bundling utilities into default objects.

**Example:**

```typescript
// ❌ Bad: Not tree-shakeable
export default {
  formatCurrency,
  formatDate,
  formatPhone
};

// ✅ Good: Tree-shakeable
export const formatCurrency = (amount) => { /* */ };
export const formatDate = (date) => { /* */ };
export const formatPhone = (phone) => { /* */ };
```

---

## Component Layer

### 12. Clean JSX: Avoid Inline Anonymous Functions

**Explanation:** Avoid inline anonymous functions in JSX not just for performance, but for readability and debugging. Named functions improve clarity.

**Example:**

```typescript
// ❌ Bad: Cluttered and hard to debug
<Button 
  onClick={(e) => {
    e.preventDefault();
    if (user.permissions.includes('delete')) {
      setConfirmDialogOpen(true);
    } else {
      showError('Insufficient permissions');
    }
  }}
>
  Delete
</Button>

// ✅ Good: Clear intent, easy to debug
const handleDeleteClick = (e) => {
  e.preventDefault();
  if (user.permissions.includes('delete')) {
    setConfirmDialogOpen(true);
  } else {
    showError('Insufficient permissions');
  }
};

<Button onClick={handleDeleteClick}>Delete</Button>
```

### 13. Fragment Usage

**Explanation:** Use fragments to avoid unnecessary wrapper divs. Respect semantic HTML structure.

**Example:**

```typescript
// ❌ Bad: Creates unnecessary div wrapper
const UserInfo = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);

// ✅ Good: Respects HTML structure
const UserInfo = ({ user }) => (
  <>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </>
);
```

### 14. Props: The Component's API

**Explanation:** Props are a component's public API. Use prop destructuring with default values to make components self-documenting.

**Example:**

```typescript
// ❌ Bad: Hard to understand component requirements
const Button = (props) => {
  const size = props.size || 'medium';
  const variant = props.variant || 'primary';
  // ...
};

// ✅ Good: Clear component API
const Button = ({ 
  children,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  onClick,
  ...rest 
}) => {
  // ...
};
```

### 15. Prop Validation

**Explanation:** Prop validation isn't just about catching bugs, but documenting expected usage.

**Example:**

```typescript
// ✅ Good: PropTypes for documentation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

// ✅ Good: TypeScript for type safety
interface ButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}
```

### 16. Compound Components

**Explanation:** Use compound components for complex UI patterns that need to work together. Provides flexibility and clarity.

**Example:**

```typescript
// ❌ Bad: Monolithic Modal with tons of props
<Modal 
  title="Confirm Delete"
  content="Are you sure?"
  primaryButton="Delete"
  secondaryButton="Cancel"
  onPrimaryClick={handleDelete}
  onSecondaryClick={handleCancel}
/>

// ✅ Good: Compound components provide flexibility
<Modal isOpen={isModalOpen} onClose={handleClose}>
  <Modal.Header>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete this item?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
  </Modal.Footer>
</Modal>
```

---

## Performance Optimization

### 17. Measure First, Optimize Second

**Explanation:** Use React DevTools Profiler to identify real performance issues before optimizing. Don't optimize prematurely.

**Example:**

```typescript
// Don't memoize everything without measuring
const ExpensiveComponent = ({ data, filter }) => {
  // This is fine - simple string operations are cheap
  const title = data.name.toUpperCase();
  
  // This warrants memoization - expensive computation
  const processedData = useMemo(() => {
    return data.items
      .filter(item => item.category === filter)
      .map(item => ({
        ...item,
        score: calculateComplexScore(item)
      }))
      .sort((a, b) => b.score - a.score);
  }, [data.items, filter]);
  
  return (
    <div>
      <h1>{title}</h1>
      <DataList items={processedData} />
    </div>
  );
};
```

### 18. React.memo for Stable Props

**Explanation:** Use React.memo for components that receive the same props frequently but parent re-renders often.

**Example:**

```typescript
// ✅ Good: Memoize components with stable props
const UserListItem = React.memo(({ user, onSelect }) => (
  <div onClick={() => onSelect(user.id)}>
    <img src={user.avatar} alt={user.name} />
    <span>{user.name}</span>
  </div>
));

// Ensure handlers are stable too
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
};
```

### 19. Code Splitting at Feature Boundaries

**Explanation:** Split code at feature boundaries. Use lazy loading for routes and large components.

**Example:**

```typescript
// ✅ Good: Route-level splitting
const UserProfile = lazy(() => import('../features/userProfile'));
const AdminPanel = lazy(() => import('../features/admin'));

// ✅ Good: Component-level splitting for large features
const AdvancedCharts = lazy(() => import('./AdvancedCharts'));

const Dashboard = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div>
      <BasicStats />
      {showAdvanced && (
        <Suspense fallback={<ChartSkeleton />}>
          <AdvancedCharts />
        </Suspense>
      )}
    </div>
  );
};
```

### 20. Dynamic Imports for Heavy Libraries

**Explanation:** Use dynamic imports for libraries that might not be needed immediately.

**Example:**

```typescript
// ✅ Good: Only load heavy library when needed
const handleDateRangeSelect = async (startDate, endDate) => {
  const { formatDateRange } = await import('date-fns');
  return formatDateRange(startDate, endDate);
};
```

---

## Testing Strategies

### 21. Testing Pyramid

**Explanation:** Follow a testing pyramid: plenty of unit tests at the base, fewer integration tests, and minimal e2e tests for critical flows.

**Example:**

```
Testing Pyramid:
- E2E Tests (few): Critical user flows
- Integration Tests (some): Component interactions
- Unit Tests (many): Functions, hooks, utilities
```

### 22. Unit Testing Hooks

**Explanation:** Test custom hooks in isolation using React Testing Library's `renderHook`.

**Example:**

```typescript
import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });
  
  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[1].toggle();
    });
    
    expect(result.current[0]).toBe(true);
  });
});
```

### 23. Component Testing: Behavior Over Implementation

**Explanation:** Test user behavior, not implementation details. Focus on what users see and do.

**Example:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };
  
  it('should allow editing when edit button is clicked', () => {
    render(<UserProfile user={mockUser} onSave={jest.fn()} />);
    
    // Test user behavior, not implementation details
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
  });
});
```

### 24. Integration Testing

**Explanation:** Test complex component interactions to ensure components work well together.

**Example:**

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProfileContainer } from './UserProfileContainer';
import * as userApi from './userApi';

jest.mock('./userApi');

describe('UserProfileContainer', () => {
  it('should save user changes', async () => {
    const mockUser = { id: '1', name: 'John', email: 'john@test.com' };
    userApi.fetchUser.mockResolvedValue(mockUser);
    userApi.updateUser.mockResolvedValue({ ...mockUser, name: 'Jane' });
    
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserProfileContainer userId="1" />
      </QueryClientProvider>
    );
    
    // Wait for user to load
    await screen.findByText(mockUser.name);
    
    // Edit and save
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.change(screen.getByDisplayValue(mockUser.name), {
      target: { value: 'Jane' }
    });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    
    await waitFor(() => {
      expect(userApi.updateUser).toHaveBeenCalledWith('1', { 
        ...mockUser, 
        name: 'Jane' 
      });
    });
  });
});
```

---

## Code Quality

### 25. Naming Conventions

**Explanation:** Use clear, descriptive names. Components use PascalCase, functions/variables use camelCase, booleans start with verbs (is/has/can/should).

**Example:**

```typescript
// ❌ Bad: Vague and generic
const Panel = () => { /* */ };
const Form = () => { /* */ };
const process = (data) => { /* */ };
const user = true;

// ✅ Good: Clear and specific
const UserProfilePanel = () => { /* */ };
const LoginForm = () => { /* */ };
const validateUserInput = (data) => { /* */ };
const isUserLoggedIn = true;
const hasPermission = (user, action) => { /* */ };
const canEditProfile = (user) => { /* */ };
```

### 26. Event Handler Naming

**Explanation:** Follow consistent patterns for event handlers: `handle` prefix for clarity.

**Example:**

```typescript
// ❌ Bad: Inconsistent naming
const click = () => { /* */ };
const userSubmit = () => { /* */ };
const changing = () => { /* */ };

// ✅ Good: Consistent patterns
const handleClick = () => { /* */ };
const handleUserSubmit = () => { /* */ };
const handleInputChange = () => { /* */ };
```

### 27. Error Boundaries

**Explanation:** Use error boundaries to isolate errors at the component level. Catch rendering errors and show fallback content.

**Example:**

```typescript
class FeatureErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error}
          retry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    
    return this.props.children;
  }
}

// Wrap features, not the entire app
<FeatureErrorBoundary>
  <UserProfile />
</FeatureErrorBoundary>
```

### 28. Defensive Programming

**Explanation:** Handle imperfect data gracefully. Use optional chaining and default values.

**Example:**

```typescript
// ❌ Bad: Assumes perfect data structure
const UserCard = ({ user }) => (
  <div>
    <img src={user.profile.avatar.url} alt={user.name} />
    <h3>{user.name}</h3>
    <p>{user.profile.bio}</p>
  </div>
);

// ✅ Good: Handles imperfect data gracefully
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
};
```

### 29. Loading and Error States

**Explanation:** Treat loading and error states as first-class UI concerns. Provide meaningful feedback to users.

**Example:**

```typescript
const UserProfile = ({ userId }) => {
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
};
```

### 30. Type Safety with TypeScript

**Explanation:** Use TypeScript to express intent clearly. Well-crafted types serve as documentation and catch errors at compile time.

**Example:**

```typescript
// ❌ Bad: Basic but incomplete
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Good: Expressive and comprehensive
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
}
```

### 31. Generic Types for Reusable Patterns

**Explanation:** Use generic types to create reusable patterns that work with different data types.

**Example:**

```typescript
// ✅ Good: Reusable async state pattern
interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// ✅ Good: API response wrapper
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
}

// ✅ Good: Generic hook for async data
const useAsyncData = <T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncData<T> => {
  // Implementation
};
```

---

## Accessibility

### 32. Semantic HTML as Foundation

**Explanation:** Use semantic HTML correctly. Many accessibility features come built-in when using the right elements.

**Example:**

```typescript
// ❌ Bad: Looks like a button, doesn't work like one
<div className="button" onClick={handleClick}>
  Click me
</div>

// ✅ Good: Works for everyone
<button type="button" onClick={handleClick}>
  Click me
</button>
```

### 33. Form Labels and Structure

**Explanation:** Always associate form inputs with labels. Use proper form structure for accessibility.

**Example:**

```typescript
// ❌ Bad: Inaccessible form
<form>
  <input type="text" placeholder="Enter your name" />
  <input type="email" placeholder="Enter your email" />
  <button>Submit</button>
</form>

// ✅ Good: Accessible form
<form>
  <div>
    <label htmlFor="name">Name</label>
    <input 
      id="name"
      type="text" 
      placeholder="Enter your name"
      required
      aria-describedby="name-help"
    />
    <div id="name-help">This will be displayed on your profile</div>
  </div>
  
  <div>
    <label htmlFor="email">Email</label>
    <input 
      id="email"
      type="email" 
      placeholder="Enter your email"
      required
      aria-describedby="email-help"
    />
    <div id="email-help">We'll never share your email</div>
  </div>
  
  <button type="submit">Submit</button>
</form>
```

### 34. ARIA Attributes

**Explanation:** Use ARIA attributes when HTML isn't sufficient to convey meaning to assistive technologies.

**Example:**

```typescript
// ✅ Good: ARIA for toggle button
const ToggleButton = ({ pressed, onToggle, children }) => (
  <button
    type="button"
    aria-pressed={pressed}
    onClick={onToggle}
    className={pressed ? 'button-pressed' : 'button-normal'}
  >
    {children}
  </button>
);

// ✅ Good: ARIA for modal
const Modal = ({ isOpen, onClose, title, children }) => (
  <>
    {isOpen && <div className="modal-backdrop" onClick={onClose} />}
    <div
      className={`modal ${isOpen ? 'modal-open' : 'modal-hidden'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  </>
);
```

### 35. Focus Management

**Explanation:** Manage focus carefully, especially in components like modals. When a modal opens, focus should move into it, and return when it closes.

**Example:**

```typescript
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement;
      
      // Focus first focusable element in modal
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
      
      // Return focus when modal closes
      return () => {
        previousFocus?.focus();
      };
    }
  }, [isOpen]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      className="modal"
    >
      {children}
    </div>
  );
};
```

### 36. Focus Trap Hook

**Explanation:** Create reusable focus management hooks for components that need to trap focus.

**Example:**

```typescript
const useFocusTrap = (isActive) => {
  const containerRef = useRef();
  
  useEffect(() => {
    if (!isActive) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive]);
  
  return containerRef;
};
```

---

## DevOps

### 37. Linting and Formatting

**Explanation:** Set up tools that enforce consistency automatically. ESLint catches real issues early, Prettier ensures consistent formatting.

**Example:**

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Prevent bugs
    'react-hooks/exhaustive-deps': 'error',
    'no-unused-vars': 'error',
    
    // Code quality
    'prefer-const': 'error',
    'no-var': 'error',
    
    // React best practices
    'react/prop-types': 'warn',
    'react/no-array-index-key': 'warn',
  }
};
```

---

## Summary

These React best practices focus on:

- **State Management**: Classifying state by layer and using appropriate tools
- **Component Architecture**: Clear boundaries and separation of concerns
- **Code Organization**: Feature-based structure that scales
- **Component Design**: Clean JSX, thoughtful props, compound components
- **Performance**: Measure first, optimize purposefully
- **Testing**: Pyramid approach focusing on behavior
- **Code Quality**: Consistent naming, error handling, type safety
- **Accessibility**: Semantic HTML, ARIA, focus management
- **DevOps**: Automated consistency through tooling

Remember: These practices are guidelines that help build maintainable, scalable, and accessible React applications. Adapt them to your team's specific needs and context.
