import { useMemo } from 'react';
import { use, Suspense } from 'react';
import { fetchNotes } from './notesApi';
import type { Note } from './notesApi';

// Module-level cache to ensure the same promise instance is reused
let cachedNotesPromise: Promise<Note[]> | null = null;

/**
 * Notes List Component
 *
 * Demonstrates EXAMPLE 1 pattern:
 * - Memoized promise with useMemo
 * - use() hook to unwrap promise
 * - Suspense boundary for loading state
 */
function NotesListContent({
  onSelectNote,
}: {
  onSelectNote: (note: Note) => void;
}) {
  // ✅ Create promise only once using module-level cache
  // This ensures the same promise instance is always used
  const notesPromise = useMemo(() => {
    if (!cachedNotesPromise) {
      cachedNotesPromise = fetchNotes();
    }
    return cachedNotesPromise;
  }, []);

  // use() unwraps the promise and gives us the resolved array
  const notes = use(notesPromise);

  if (notes.length === 0) {
    return (
      <div className='text-center py-5 text-muted'>
        <p className='fs-5'>No notes found. Create your first note!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='h4 mb-3'>My Notes ({notes.length})</h2>
      <div className='d-flex flex-column gap-3'>
        {notes.map((note) => (
          <div
            key={note.id}
            className='card shadow-sm'
            onClick={() => onSelectNote(note)}
            role='button'
            tabIndex={0}
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div className='card-body'>
              <h5 className='card-title mb-2'>{note.title}</h5>
              <p className='card-text text-muted small mb-3'>
                {note.content.substring(0, 80)}...
              </p>
              <div className='d-flex justify-content-between align-items-center pt-2 border-top'>
                <span className='badge bg-primary'>{note.category}</span>
                <small className='text-muted'>
                  {new Date(note.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NotesList({
  onSelectNote,
}: {
  onSelectNote: (note: Note) => void;
}) {
  return (
    <Suspense fallback={<NotesListSkeleton />}>
      <NotesListContent onSelectNote={onSelectNote} />
    </Suspense>
  );
}

function NotesListSkeleton() {
  return (
    <div>
      <div className='placeholder-glow mb-3'>
        <span className='placeholder col-4 placeholder-lg'></span>
      </div>
      <div className='d-flex flex-column gap-3'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='card'>
            <div className='card-body'>
              <div className='placeholder-glow'>
                <span className='placeholder col-7 placeholder-lg mb-2'></span>
                <span className='placeholder col-12 mb-1'></span>
                <span className='placeholder col-10 mb-3'></span>
                <div className='d-flex justify-content-between'>
                  <span className='placeholder col-3'></span>
                  <span className='placeholder col-4'></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
