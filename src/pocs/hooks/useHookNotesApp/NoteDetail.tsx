import { useMemo } from 'react';
import { use } from 'react';
import { Suspense } from 'react';
import { fetchNote } from './notesApi';
import type { Note } from './notesApi';

interface NoteDetailProps {
  noteId: string | null;
}

// Module-level cache to ensure the same promise instance is reused for the same noteId
const notePromiseCache = new Map<string, Promise<Note>>();

/**
 * Note Detail Component
 *
 * Demonstrates EXAMPLE 2 pattern (Promise Caching Pattern):
 * - External promise cache using Map to prevent duplicate requests
 * - Memoized promise with useMemo
 * - use() hook to unwrap promise
 * - Suspense boundary for loading state
 *
 * This is EXAMPLE 2 from useHookExample.tsx - Promise Caching Pattern
 */
function NoteDetailContent({ noteId }: { noteId: string }) {
  // ✅ Memoize the promise with cache - CRITICAL to prevent infinite loops
  const notePromise = useMemo(() => {
    // Check cache first - reuse existing promise if available
    if (!notePromiseCache.has(noteId)) {
      notePromiseCache.set(noteId, fetchNote(noteId));
    }
    return notePromiseCache.get(noteId)!;
  }, [noteId]);

  // use() unwraps the promise
  const note = use(notePromise);

  return (
    <div>
      <div className='mb-4 pb-3 border-bottom'>
        <h1 className='display-5 mb-3'>{note.title}</h1>
        <div className='d-flex gap-3 align-items-center'>
          <span className='badge bg-primary fs-6'>{note.category}</span>
          <span className='text-muted'>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div>
        <p
          className='lead'
          style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}
        >
          {note.content}
        </p>
      </div>
    </div>
  );
}

export default function NoteDetail({ noteId }: NoteDetailProps) {
  if (!noteId) {
    return (
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '400px' }}
      >
        <p className='text-muted fs-5'>Select a note to view details</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<NoteDetailSkeleton />}>
      <NoteDetailContent noteId={noteId} />
    </Suspense>
  );
}

function NoteDetailSkeleton() {
  return (
    <div>
      <div className='mb-4 pb-3 border-bottom'>
        <div className='placeholder-glow mb-3'>
          <span className='placeholder col-8 placeholder-lg'></span>
        </div>
        <div className='d-flex gap-3'>
          <span className='placeholder col-3'></span>
          <span className='placeholder col-4'></span>
        </div>
      </div>
      <div className='placeholder-glow'>
        <span className='placeholder col-12 mb-2'></span>
        <span className='placeholder col-12 mb-2'></span>
        <span className='placeholder col-10'></span>
      </div>
    </div>
  );
}
