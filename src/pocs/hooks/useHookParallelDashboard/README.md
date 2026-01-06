# Note Dashboard - React 19 use() Hook EXAMPLE 3

This is a complete working example demonstrating **EXAMPLE 3** from `useHookExample.tsx` - **Multiple Async Resources (Parallel Loading)**.

## What This Example Demonstrates

✅ **Parallel Loading** - All API requests start simultaneously  
✅ **Multiple use() Hooks** - Unwrapping multiple promises in parallel  
✅ **Performance Optimization** - Faster than sequential (waterfall) loading  
✅ **Suspense Boundaries** - Handling loading states for all resources  
✅ **Error Boundaries** - Catching promise rejections

## Key Concept: Parallel vs Waterfall Loading

### ✅ GOOD: Parallel Loading (This Example)

```typescript
// All promises created BEFORE calling use()
const notePromise = useMemo(() => fetchNote(noteId), [noteId]);
const commentsPromise = useMemo(() => fetchNoteComments(noteId), [noteId]);
const statsPromise = useMemo(() => fetchNoteStats(noteId), [noteId]);

// All requests start immediately and resolve in parallel
const note = use(notePromise);
const comments = use(commentsPromise);
const stats = use(statsPromise);
```

**Result**: All 3 API requests start at the same time → Faster total load time

### ❌ BAD: Waterfall Loading

```typescript
// First request
const note = use(useMemo(() => fetchNote(noteId), [noteId]));

// Second request waits for first to complete
const comments = use(useMemo(() => fetchNoteComments(note.id), [note.id]));

// Third request waits for second to complete
const stats = use(useMemo(() => fetchNoteStats(note.id), [note.id]));
```

**Result**: Requests happen sequentially → Slower total load time

## Key Files

- `noteDashboardApi.ts` - Multiple async functions for fetching different resources
- `NoteDashboard.tsx` - Main dashboard component demonstrating parallel loading
- `NoteDashboardApp.tsx` - Wrapper component with note selection

## How It Works

### 1. Multiple API Functions

```typescript
export async function fetchNote(id: string): Promise<Note> { ... }
export async function fetchNoteComments(noteId: string): Promise<NoteComment[]> { ... }
export async function fetchNoteStats(noteId: string): Promise<NoteStats> { ... }
export async function fetchRelatedNotes(noteId: string, category: string): Promise<RelatedNote[]> { ... }
```

### 2. Create All Promises in Parallel

```typescript
function NoteDashboardContent({ noteId }: NoteDashboardProps) {
  // ✅ Create ALL promises BEFORE calling use()
  const notePromise = useMemo(() => fetchNote(noteId), [noteId]);
  const commentsPromise = useMemo(() => fetchNoteComments(noteId), [noteId]);
  const statsPromise = useMemo(() => fetchNoteStats(noteId), [noteId]);

  // Get note first to get category
  const note = use(notePromise);

  // Create related notes promise using note's category
  const relatedNotesPromise = useMemo(
    () => fetchRelatedNotes(noteId, note.category),
    [noteId, note.category]
  );

  // ✅ All these resolve in parallel (except relatedNotes which needs category)
  const comments = use(commentsPromise);
  const stats = use(statsPromise);
  const relatedNotes = use(relatedNotesPromise);
}
```

### 3. Wrap in Suspense

```typescript
<Suspense fallback={<DashboardSkeleton />}>
  <NoteDashboardContent noteId={noteId} />
</Suspense>
```

## Setup Instructions

1. **Start json-server** (if using local API):

   ```bash
   json-server --watch db.json --port 4000 --routes routes.json
   ```

2. **Add mock data to db.json**:

   ```json
   {
     "notes": [
       {
         "id": "1",
         "title": "My First Note",
         "content": "This is the content...",
         "createdAt": "2024-01-15T10:00:00Z",
         "category": "Personal"
       }
     ],
     "comments": [
       {
         "id": "1",
         "noteId": "1",
         "author": "John Doe",
         "comment": "Great note!",
         "createdAt": "2024-01-16T10:00:00Z"
       }
     ],
     "stats": [
       {
         "noteId": "1",
         "views": 150,
         "likes": 25,
         "shares": 10
       }
     ]
   }
   ```

3. **Add routes to routes.json** (if using json-server):
   ```json
   {
     "/api/notes/:id": "/notes/:id",
     "/api/notes/:id/comments": "/comments?noteId=:id",
     "/api/notes/:id/stats": "/stats?noteId=:id",
     "/api/notes": "/notes"
   }
   ```

## Key Learning Points

### ✅ DO:

- Create all promises with `useMemo` BEFORE calling `use()`
- All promises start fetching simultaneously
- Use parallel loading for independent resources
- Wrap in Suspense to handle loading states

### ❌ DON'T:

- Create promises sequentially (waterfall pattern)
- Wait for one promise to resolve before creating the next
- Create promises inside `use()` calls

## Performance Comparison

**Parallel Loading** (EXAMPLE 3):

- Request 1: 200ms
- Request 2: 200ms (starts immediately)
- Request 3: 200ms (starts immediately)
- **Total time: ~200ms** (all resolve around the same time)

**Waterfall Loading**:

- Request 1: 200ms
- Request 2: 200ms (waits for request 1)
- Request 3: 200ms (waits for request 2)
- **Total time: ~600ms** (sequential)

## See Also

- `useHookExample.tsx` - Comprehensive examples of all `use()` hook patterns
- `useHookNotesApp` - EXAMPLE 2 (Promise Caching Pattern)
- [React 19 use() Hook Documentation](https://stevekinney.com/courses/react-performance/the-use-hook)
