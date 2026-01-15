import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import NoteContent from './NoteContent';
import NoteComments from './NoteComments';
import RelatedNotes from './RelatedNotes';

/**
 * Progressive Note App - EXAMPLE 6: Progressive Enhancement Pattern
 *
 * This app demonstrates EXAMPLE 6 from useHookExample.tsx:
 * - Each section (content, comments, related notes) loads independently
 * - Each section has its own Suspense boundary
 * - Sections can appear as they load, providing better UX
 * - Faster perceived performance - users see content as it becomes available
 *
 * Key Learning Points:
 * 1. Multiple Suspense boundaries allow independent loading
 * 2. Users see content progressively as it loads
 * 3. Better UX than waiting for everything to load at once
 * 4. Each section can have different loading times
 */

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className='alert alert-warning m-4' role='alert'>
      <h2 className='alert-heading'>Something went wrong:</h2>
      <pre className='bg-white p-3 rounded border'>{error.message}</pre>
      <button onClick={resetErrorBoundary} className='btn btn-warning mt-3'>
        Try again
      </button>
    </div>
  );
}

export default function ProgressiveNoteApp() {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const [currentNoteId, setCurrentNoteId] = useState<string>(noteId || '1');

  // Sync noteId from URL params when it changes
  // remove it to avoid extra unnecessary render
  // useEffect(() => {
  //   if (noteId && noteId !== currentNoteId) {
  //     setCurrentNoteId(noteId);
  //   }
  // }, [noteId, currentNoteId]);

  const handleSelectNote = (id: string) => {
    setCurrentNoteId(id);
    navigate(`/hooks/progressive-note/${id}`);
  };

  if (!currentNoteId) {
    return (
      <div className='container mt-5'>
        <div className='alert alert-info'>
          <h4>No note selected</h4>
          <p>Please select a note to view.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4' style={{ maxWidth: '1200px' }}>
      <header className='text-center mb-4 pb-3 border-bottom'>
        <h1 className='display-4 mb-2'>📄 Progressive Note Viewer</h1>
        <p className='text-muted'>
          Demonstrating EXAMPLE 6 - Progressive Enhancement Pattern with{' '}
          <code className='bg-light px-2 py-1 rounded'>use()</code> hook
        </p>
        <p className='small text-muted mt-2'>
          Each section loads independently - watch them appear as they become
          available!
        </p>
      </header>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className='row'>
          <div className='col-lg-8'>
            {/* Section 1: Note Content - Loads first */}
            <NoteContent noteId={currentNoteId} />

            {/* Section 2: Comments - Loads independently */}
            <NoteComments noteId={currentNoteId} />
          </div>

          <div className='col-lg-4'>
            {/* Section 3: Related Notes - Loads independently */}
            <RelatedNotes
              noteId={currentNoteId}
              onSelectNote={handleSelectNote}
            />
          </div>
        </div>
      </ErrorBoundary>

      <footer className='mt-5 pt-4 border-top text-center text-muted'>
        <p className='small'>
          This app demonstrates{' '}
          <strong>EXAMPLE 6: Progressive Enhancement Pattern</strong> from{' '}
          <code className='bg-light px-2 py-1 rounded'>useHookExample.tsx</code>
          . Each section has its own Suspense boundary and loads independently.
        </p>
      </footer>
    </div>
  );
}
