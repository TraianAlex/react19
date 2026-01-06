# Notes App - React 19 use() Hook Example

This is a complete working example demonstrating **EXAMPLE 1** from `useHookExample.tsx` - Basic Promise Usage with React 19's `use()` hook.

## What This Example Demonstrates

✅ **Proper Promise Memoization** - Using `useMemo` to prevent infinite loops  
✅ **use() Hook** - Unwrapping promises directly in component body  
✅ **Suspense Boundaries** - Handling loading states declaratively  
✅ **Error Boundaries** - Catching promise rejections  
✅ **Real-world Pattern** - Complete app with list and detail views

## Key Files

- `notesApi.ts` - Async functions for fetching notes (work directly with `use()`)
- `NotesList.tsx` - List view using `use()` hook with Suspense
- `NoteDetail.tsx` - Detail view using `use()` hook with Suspense
- `NotesApp.tsx` - Main app component with ErrorBoundary
- `NotesApp.module.scss` - Styling

## How It Works

### 1. API Functions (notesApi.ts)

```typescript
export async function fetchNotes(): Promise<Note[]> {
  const response = await fetch(`${API_BASE_URL}/notes`);
  if (!response.ok) throw new Error('Failed to fetch notes');
  return response.json();
}
```

### 2. Component Using use() Hook

```typescript
function NotesListContent() {
  // ✅ CRITICAL: Memoize the promise to prevent infinite loops
  const notesPromise = useMemo(() => fetchNotes(), []);

  // use() unwraps the promise
  const notes = use(notesPromise);

  return <div>{/* render notes */}</div>;
}
```

### 3. Wrap in Suspense

```typescript
<Suspense fallback={<LoadingSkeleton />}>
  <NotesListContent />
</Suspense>
```

## Setup Instructions

1. **Start json-server** (if using local API):

   ```bash
   json-server --watch db.json --port 4000 --routes routes.json
   ```

2. **Add notes to db.json**:

   ```json
   {
     "notes": [
       {
         "id": "1",
         "title": "My First Note",
         "content": "This is the content of my first note...",
         "createdAt": "2024-01-15T10:00:00Z",
         "category": "Personal"
       }
     ]
   }
   ```

3. **Add route to routes.json** (if using json-server):

   ```json
   {
     "/api/notes": "/notes",
     "/api/notes/:id": "/notes/:id"
   }
   ```

4. **Import and use the component**:

   ```typescript
   import NotesApp from './pocs/hooks/useHookNotesApp/NotesApp';

   // In your router or app
   <NotesApp />;
   ```

## Key Learning Points

### ✅ DO:

- Always memoize promises with `useMemo(() => fetchData(id), [id])`
- Wrap components using `use()` in `<Suspense>` boundaries
- Use ErrorBoundary to catch promise rejections
- Call `use()` only during render (not in effects or handlers)

### ❌ DON'T:

- Create promises directly in render: `use(fetchData(id))` ❌
- Forget to memoize promises (causes infinite loops) ❌
- Call `use()` in event handlers or effects ❌
- Skip Suspense boundaries ❌

## Comparison: Old vs New

### Old Way (useEffect + useState):

```typescript
function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes()
      .then(setNotes)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{/* render notes */}</div>;
}
```

### New Way (use() + Suspense):

```typescript
function NotesList() {
  const notesPromise = useMemo(() => fetchNotes(), []);
  const notes = use(notesPromise);
  return <div>{/* render notes */}</div>;
}

// Wrap in Suspense
<Suspense fallback={<Loading />}>
  <NotesList />
</Suspense>;
```

## See Also

- `useHookExample.tsx` - Comprehensive examples of all `use()` hook patterns
- [React 19 use() Hook Documentation](https://stevekinney.com/courses/react-performance/the-use-hook)
