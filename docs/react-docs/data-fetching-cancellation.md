# Data Fetching Cancellation in React

## Overview

Handling cancellation in data fetching is crucial for preventing memory leaks, race conditions, and unnecessary state updates when components unmount or when new requests supersede previous ones.

## Recommended Modern Approaches

### 1. AbortController with fetch (Recommended)

The native `AbortController` API is the standard way to cancel fetch requests. It's built into browsers and works seamlessly with the `fetch` API.

#### Basic Implementation

```typescript
// Modern approach with AbortController
const getTodos = async (signal?: AbortSignal) => {
  try {
    dispatch({ type: LOADING_TODO, payload: true });

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=5',
      { signal } // Pass abort signal to fetch
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const toJSON = await response.json();
    await mockDelay(1000);
    
    // Check if request was aborted before dispatching
    if (signal?.aborted) return;
    
    if (toJSON && Array.isArray(toJSON)) {
      dispatch({ type: GET_TODOS, payload: toJSON });
    }
  } catch (err: unknown) {
    // Don't treat AbortError as a real error
    if (err instanceof Error && err.name === 'AbortError') {
      console.log('Request was cancelled');
      return;
    }
    dispatch({ type: LOADING_TODO, payload: false });
    throw err;
  }
};

// In useEffect with cleanup
useEffect(() => {
  const abortController = new AbortController();
  
  const getData = async () => {
    await getTodos(abortController.signal);
  };
  
  getData();
  
  // Cleanup: cancel request on unmount
  return () => {
    abortController.abort();
  };
}, []);
```

#### Key Points:
- Pass `signal` to fetch options
- Check `signal.aborted` before state updates
- Handle `AbortError` separately from real errors
- Always clean up in `useEffect` return function

### 2. React Query / TanStack Query (For Complex Apps)

React Query automatically handles cancellation, caching, and retries. Ideal for applications with complex data fetching needs.

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const response = await fetch(url, { signal });
    return response.json();
  },
  // Automatically cancels on unmount
});
```

**Benefits:**
- Automatic cancellation on unmount
- Built-in caching and refetching
- Request deduplication
- Optimistic updates support

### 3. Custom Hook Pattern (For Current Setup)

Create a reusable pattern for your existing codebase:

```typescript
const useCancellableFetch = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancellableFetch = async (url: string, options?: RequestInit) => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw new Error('Request cancelled');
      }
      throw err;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      abortControllerRef.current?.abort();
    };
  }, []);

  return cancellableFetch;
};
```

**Usage:**
```typescript
const cancellableFetch = useCancellableFetch();

const getTodos = async () => {
  try {
    const response = await cancellableFetch(url);
    const data = await response.json();
    // Handle data
  } catch (err) {
    // Handle error (including cancellation)
  }
};
```

### 4. Race Condition Handling

Prevent stale updates when multiple requests are in flight:

```typescript
const getTodos = async (signal?: AbortSignal) => {
  const requestId = Math.random().toString();
  let isCurrentRequest = true;

  try {
    dispatch({ type: LOADING_TODO, payload: true });
    const response = await fetch(url, { signal });
    const toJSON = await response.json();
    await mockDelay(1000);

    // Only dispatch if this is still the current request
    if (isCurrentRequest && !signal?.aborted) {
      dispatch({ type: GET_TODOS, payload: toJSON });
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return; // Silently handle cancellation
    }
    if (isCurrentRequest) {
      dispatch({ type: LOADING_TODO, payload: false });
    }
    throw err;
  }
};
```

## Best Practices Summary

1. **Always use AbortController** with `fetch` for cancellation support
2. **Clean up in useEffect** return function to cancel on unmount
3. **Check signal.aborted** before dispatching state updates
4. **Handle AbortError separately** from real errors (don't show error messages for cancelled requests)
5. **Cancel previous requests** when starting new ones to prevent race conditions
6. **Use refs or request IDs** to track which request is current when handling async operations

## Common Pitfalls to Avoid

- ❌ Not cleaning up fetch requests on unmount
- ❌ Treating `AbortError` as a real error
- ❌ Dispatching state updates after component unmounts
- ❌ Not cancelling previous requests when starting new ones
- ❌ Ignoring race conditions in rapid successive requests

## Example: Complete Implementation

```typescript
import { useEffect, useRef } from 'react';

export const useFakeApi = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const getTodos = async () => {
    // Cancel previous request
    abortControllerRef.current?.abort();
    
    // Create new controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      dispatch({ type: LOADING_TODO, payload: true });

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5',
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const toJSON = await response.json();
      await mockDelay(1000);

      // Check if aborted before updating state
      if (controller.signal.aborted) return;

      if (toJSON && Array.isArray(toJSON)) {
        dispatch({ type: GET_TODOS, payload: toJSON });
      }
      
      dispatch({ type: LOADING_TODO, payload: false });
    } catch (err: unknown) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      
      dispatch({ type: LOADING_TODO, payload: false });
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      throw errorMessage;
    }
  };

  useEffect(() => {
    getTodos();

    // Cleanup on unmount
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return { getTodos };
};
```

## References

- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Query Documentation](https://tanstack.com/query/latest)
- [React: useEffect Cleanup](https://react.dev/reference/react/useEffect#cleanup)
