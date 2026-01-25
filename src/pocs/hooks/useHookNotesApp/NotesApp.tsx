import { useState } from 'react';
import NotesList from './NotesList';
import NoteDetail from './NoteDetail';
import type { Note } from './notesApi';
import ErrorBoundary, { ErrorFallback } from './ErrorBoundary';

/**
 * Notes App - Complete Example Using React 19's use() Hook
 *
 * This app demonstrates EXAMPLE 2 (Promise Caching Pattern) from useHookExample.tsx:
 * - External promise cache using Map/module-level cache
 * - Proper promise memoization with useMemo
 * - use() hook to unwrap promises
 * - Suspense boundaries for loading states
 * - Error boundaries for error handling
 *
 * Key Learning Points:
 * 1. Always memoize promises passed to use() to prevent infinite loops
 * 2. Use external caches (Map or module-level) to prevent duplicate requests
 * 3. Wrap components using use() in Suspense boundaries
 * 4. Use ErrorBoundary to catch promise rejections
 * 5. use() can only be called during render, not in effects or handlers
 */

export default function NotesApp() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleSelectNote = (note: Note) => {
    setSelectedNoteId(note.id);
  };

  return (
    <div className='container-fluid mt-4' style={{ maxWidth: '1400px' }}>
      <header className='text-center mb-4 pb-3 border-bottom'>
        <h1 className='display-4 mb-2'>📝 Notes App</h1>
        <p className='text-muted'>
          Demonstrating React 19's{' '}
          <code className='bg-light px-2 py-1 rounded'>use()</code> hook with
          Suspense
        </p>
      </header>

      <ErrorBoundary fallback={ErrorFallback}>
        <div className='row g-4'>
          <aside className='col-md-4'>
            <div
              className='bg-light rounded p-3'
              style={{ maxHeight: '800px', overflowY: 'auto' }}
            >
              <NotesList onSelectNote={handleSelectNote} />
            </div>
          </aside>

          <main className='col-md-8'>
            <div className='bg-white rounded shadow-sm p-4'>
              <NoteDetail noteId={selectedNoteId} />
            </div>
          </main>
        </div>
      </ErrorBoundary>

      <footer className='mt-5 pt-4 border-top text-center text-muted'>
        <p className='small'>
          This app uses React 19's{' '}
          <code className='bg-light px-2 py-1 rounded'>use()</code> hook to
          fetch and display notes. See{' '}
          <code className='bg-light px-2 py-1 rounded'>useHookExample.tsx</code>{' '}
          for more examples.
        </p>
      </footer>
    </div>
  );
}
