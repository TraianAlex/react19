# Senior Frontend Developer Best Practices

This document outlines best practices for senior frontend developers, extracted from industry standards and proven patterns. Each practice includes a short explanation and code examples.

---

## Table of Contents

1. [State Architecture](#state-architecture)
2. [Component Design Patterns](#component-design-patterns)
3. [Performance Optimization](#performance-optimization)
4. [Error Handling](#error-handling)
5. [Code Organization](#code-organization)
6. [Type Safety](#type-safety)
7. [Accessibility](#accessibility)
8. [Testing Strategies](#testing-strategies)
9. [API Integration](#api-integration)
10. [Code Reusability](#code-reusability)

---

## State Architecture

### 1. Separate Local vs Global State

**Explanation:** Not all state needs to be global. Use local state for component-specific data and global state only for data shared across multiple components.

**Example:**

```typescript
// ❌ Bad: Everything in global state
const App = () => {
  const [globalState, setGlobalState] = useState({
    todos: [],
    inputValue: '', // Only used in one component
    isModalOpen: false, // Only used in one component
  });
};

// ✅ Good: Appropriate state placement
const TodoInput = () => {
  const [inputValue, setInputValue] = useState(''); // Local state
  // ...
};

const App = () => {
  const [todos, setTodos] = useState([]); // Global state
  // ...
};
```

### 2. Normalize State Structure

**Explanation:** Keep state flat and normalized. Avoid nested structures that make updates complex.

**Example:**

```typescript
// ❌ Bad: Nested structure
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
};
```

### 3. Use State Machines for Complex State

**Explanation:** For complex state transitions, use state machines to make the flow explicit and prevent invalid states.

**Example:**

```typescript
// ❌ Bad: Multiple boolean flags
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// ✅ Good: State machine
type State = 'idle' | 'loading' | 'success' | 'error';

const [state, setState] = useState<State>('idle');

const fetchData = async () => {
  setState('loading');
  try {
    await api.fetch();
    setState('success');
  } catch {
    setState('error');
  }
};
```

---

## Component Design Patterns

### 4. Container/Presentational Pattern

**Explanation:** Separate data logic (containers) from presentation (presentational components).

**Example:**

```typescript
// Container Component (Smart Component)
const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  return <TodoList todos={todos} loading={loading} />;
};

// Presentational Component (Dumb Component)
interface TodoListProps {
  todos: Todo[];
  loading: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading }) => {
  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
};
```

### 5. Compound Components

**Explanation:** Create components that work together as a unit while maintaining flexibility.

**Example:**

```typescript
// ✅ Good: Compound component pattern
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

Tabs.List = ({ children }) => <div className="tabs-list">{children}</div>;
Tabs.Tab = ({ index, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === index ? 'active' : ''}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
</Tabs>
```

### 6. Render Props Pattern

**Explanation:** Share code between components using a prop whose value is a function.

**Example:**

```typescript
// ✅ Good: Render props pattern
const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(position);
};

// Usage
<MouseTracker
  render={({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
/>
```

---

## Performance Optimization

### 7. Memoization Strategy

**Explanation:** Use React.memo, useMemo, and useCallback appropriately to prevent unnecessary re-renders.

**Example:**

```typescript
// ❌ Bad: Component re-renders on every parent update
const ExpensiveComponent = ({ data }) => {
  const processedData = expensiveCalculation(data);
  return <div>{processedData}</div>;
};

// ✅ Good: Memoized component
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(
    () => expensiveCalculation(data),
    [data]
  );
  return <div>{processedData}</div>;
});

// ✅ Good: Memoized callbacks
const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Stable reference

  return <Child onClick={handleClick} />;
};
```

### 8. Code Splitting and Lazy Loading

**Explanation:** Split code into smaller chunks and load them on demand to improve initial load time.

**Example:**

```typescript
// ✅ Good: Lazy loading components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);

// ✅ Good: Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
```

### 9. Virtualization for Long Lists

**Explanation:** Use virtualization for rendering large lists to maintain performance.

**Example:**

```typescript
// ❌ Bad: Render all items
const List = ({ items }) => (
  <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
);

// ✅ Good: Virtualized list
import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={35}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </FixedSizeList>
);
```

---

## Error Handling

### 10. Error Boundaries

**Explanation:** Use Error Boundaries to catch JavaScript errors anywhere in the component tree and display fallback UI.

**Example:**

```typescript
// ✅ Good: Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 11. Async Error Handling

**Explanation:** Always handle errors in async operations and provide user feedback.

**Example:**

```typescript
// ❌ Bad: No error handling
const fetchData = async () => {
  const data = await api.getData();
  setData(data);
};

// ✅ Good: Proper error handling
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await api.getData();
    setData(data);
  } catch (err) {
    setError(err.message);
    // Show user-friendly error message
    toast.error('Failed to load data. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

### 12. Request Cancellation

**Explanation:** Cancel in-flight requests when components unmount or dependencies change to prevent memory leaks and race conditions.

**Example:**

```typescript
// ✅ Good: Request cancellation with AbortController
useEffect(() => {
  const abortController = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: abortController.signal
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => {
    abortController.abort();
  };
}, [url]);
```

---

## Code Organization

### 13. Feature-Based Folder Structure

**Explanation:** Organize code by features rather than file types for better maintainability.

**Example:**

```
// ❌ Bad: File-type organization
src/
  components/
    Button.tsx
    Input.tsx
    TodoItem.tsx
    TodoList.tsx
  hooks/
    useTodos.ts
  utils/
    todoUtils.ts

// ✅ Good: Feature-based organization
src/
  features/
    todos/
      components/
        TodoItem.tsx
        TodoList.tsx
      hooks/
        useTodos.ts
      utils/
        todoUtils.ts
      types.ts
      index.ts
    auth/
      components/
        LoginForm.tsx
      hooks/
        useAuth.ts
      utils/
        authUtils.ts
```

### 14. Custom Hooks for Logic Reuse

**Explanation:** Extract reusable logic into custom hooks.

**Example:**

```typescript
// ✅ Good: Custom hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Search API call with debounced value
    searchAPI(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
};
```

### 15. Constants and Configuration

**Explanation:** Extract magic numbers and strings into constants.

**Example:**

```typescript
// ❌ Bad: Magic numbers and strings
const timeout = setTimeout(() => {}, 5000);
if (status === 'pending') { }

// ✅ Good: Named constants
const API_TIMEOUT = 5000;
const STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

const timeout = setTimeout(() => {}, API_TIMEOUT);
if (status === STATUS.PENDING) { }
```

---

## Type Safety

### 16. Strict TypeScript Configuration

**Explanation:** Use strict TypeScript settings and avoid `any` type.

**Example:**

```typescript
// ❌ Bad: Using any
const processData = (data: any) => {
  return data.value;
};

// ✅ Good: Proper typing
interface Data {
  value: string;
  id: number;
}

const processData = (data: Data): string => {
  return data.value;
};
```

### 17. Discriminated Unions

**Explanation:** Use discriminated unions for type-safe state management.

**Example:**

```typescript
// ✅ Good: Discriminated union
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

const Component = () => {
  const [state, setState] = useState<AsyncState<User>>({ status: 'idle' });

  // TypeScript knows the shape based on status
  if (state.status === 'success') {
    console.log(state.data); // ✅ Type-safe
  }
};
```

---

## Accessibility

### 18. Semantic HTML

**Explanation:** Use semantic HTML elements for better accessibility and SEO.

**Example:**

```typescript
// ❌ Bad: Div soup
<div onClick={handleClick}>
  <div>Click me</div>
</div>

// ✅ Good: Semantic HTML
<button onClick={handleClick} aria-label="Submit form">
  Submit
</button>
```

### 19. ARIA Attributes

**Explanation:** Use ARIA attributes when semantic HTML isn't sufficient.

**Example:**

```typescript
// ✅ Good: Proper ARIA usage
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-description">Are you sure you want to proceed?</p>
</div>
```

### 20. Keyboard Navigation

**Explanation:** Ensure all interactive elements are keyboard accessible.

**Example:**

```typescript
// ✅ Good: Keyboard support
const CustomButton = ({ onClick, children }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
```

---

## Testing Strategies

### 21. Test User Behavior, Not Implementation

**Explanation:** Write tests that focus on what users see and do, not internal implementation.

**Example:**

```typescript
// ❌ Bad: Testing implementation
test('calls setState', () => {
  const setState = jest.fn();
  component.setState = setState;
  // ...
});

// ✅ Good: Testing behavior
test('displays error message when API fails', async () => {
  render(<Component />);
  fireEvent.click(screen.getByText('Submit'));
  await waitFor(() => {
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
```

### 22. Test Accessibility

**Explanation:** Include accessibility testing in your test suite.

**Example:**

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## API Integration

### 23. Centralized API Client

**Explanation:** Create a centralized API client with consistent error handling and configuration.

**Example:**

```typescript
// ✅ Good: Centralized API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }
}

const api = new ApiClient(process.env.REACT_APP_API_URL);
```

### 24. Request/Response Interceptors

**Explanation:** Use interceptors for common concerns like authentication and error handling.

**Example:**

```typescript
// ✅ Good: Interceptors pattern
const apiClient = {
  interceptors: {
    request: [] as Array<(config: RequestConfig) => RequestConfig>,
    response: [] as Array<(response: Response) => Response>,
  },

  async request(config: RequestConfig) {
    // Apply request interceptors
    let finalConfig = config;
    for (const interceptor of this.interceptors.request) {
      finalConfig = interceptor(finalConfig);
    }

    // Add auth token
    finalConfig.headers = {
      ...finalConfig.headers,
      Authorization: `Bearer ${getToken()}`,
    };

    const response = await fetch(finalConfig.url, finalConfig);

    // Apply response interceptors
    let finalResponse = response;
    for (const interceptor of this.interceptors.response) {
      finalResponse = interceptor(finalResponse);
    }

    return finalResponse;
  },
};
```

---

## Code Reusability

### 25. Higher-Order Components (HOCs)

**Explanation:** Use HOCs to share logic between components.

**Example:**

```typescript
// ✅ Good: HOC pattern
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
const UserProfileWithLoading = withLoading(UserProfile);
```

### 26. Composition Over Inheritance

**Explanation:** Prefer composition and component composition over inheritance.

**Example:**

```typescript
// ✅ Good: Composition
const Layout = ({ header, sidebar, content }) => (
  <div>
    <header>{header}</header>
    <aside>{sidebar}</aside>
    <main>{content}</main>
  </div>
);

// Usage
<Layout
  header={<Header />}
  sidebar={<Sidebar />}
  content={<Content />}
/>
```

---

## Additional Best Practices

### 27. Environment Variables

**Explanation:** Use environment variables for configuration that changes between environments.

**Example:**

```typescript
// ✅ Good: Environment variables
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  environment: process.env.NODE_ENV,
  featureFlags: {
    newFeature: process.env.REACT_APP_ENABLE_NEW_FEATURE === 'true',
  },
};
```

### 28. Consistent Naming Conventions

**Explanation:** Follow consistent naming conventions throughout the codebase.

**Example:**

```typescript
// ✅ Good: Consistent naming
// Components: PascalCase
const UserProfile = () => {};

// Hooks: camelCase starting with 'use'
const useUserData = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Types/Interfaces: PascalCase
interface UserData { }
type UserStatus = 'active' | 'inactive';
```

### 29. Documentation and Comments

**Explanation:** Write self-documenting code and add comments only when necessary.

**Example:**

```typescript
// ❌ Bad: Unnecessary comments
// Set the count to 0
const count = 0;

// ✅ Good: Self-documenting code
const initializeCounter = () => {
  const initialCount = 0;
  setCount(initialCount);
};

// ✅ Good: Comments for complex logic
// Use Floyd-Warshall algorithm to find shortest paths
// Time complexity: O(V^3) where V is number of vertices
const calculateShortestPaths = (graph: Graph) => {
  // Implementation...
};
```

---

## Summary

These best practices form the foundation of senior-level frontend development. They focus on:

- **Maintainability**: Code that's easy to understand and modify
- **Scalability**: Architecture that grows with your team and application
- **Performance**: Optimized rendering and resource usage
- **Reliability**: Error handling and edge case management
- **Accessibility**: Inclusive design for all users
- **Type Safety**: Catching errors at compile time
- **Testability**: Code that's easy to test

Remember: Best practices are guidelines, not rules. Adapt them to your specific context and team needs.
