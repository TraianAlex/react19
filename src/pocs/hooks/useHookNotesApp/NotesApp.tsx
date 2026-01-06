import { useState } from 'react';
import { Component, ReactNode } from 'react';
import NotesList from './NotesList';
import NoteDetail from './NoteDetail';
import type { Note } from './notesApi';

/**
 * Notes App - Complete Example Using React 19's use() Hook
 *
 * This app demonstrates EXAMPLE 1 from useHookExample.tsx:
 * - Proper promise memoization with useMemo
 * - use() hook to unwrap promises
 * - Suspense boundaries for loading states
 * - Error boundaries for error handling
 *
 * Key Learning Points:
 * 1. Always memoize promises passed to use() to prevent infinite loops
 * 2. Wrap components using use() in Suspense boundaries
 * 3. Use ErrorBoundary to catch promise rejections
 * 4. use() can only be called during render, not in effects or handlers
 */

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
  },
  ErrorBoundaryState
> {
  constructor(props: {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return ErrorFallback(this.state.error, this.reset);
    }

    return this.props.children;
  }
}

function ErrorFallback(error: Error, reset: () => void): ReactNode {
  return (
    <div className='alert alert-warning m-4' role='alert'>
      <h2 className='alert-heading'>Something went wrong:</h2>
      <pre className='bg-white p-3 rounded border'>{error.message}</pre>
      <button onClick={reset} className='btn btn-warning mt-3'>
        Try again
      </button>
    </div>
  );
}

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
