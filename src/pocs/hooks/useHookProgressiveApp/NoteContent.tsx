import { useMemo } from 'react';
import { use, Suspense } from 'react';
import { fetchNote } from './noteApi';
import type { Note } from './noteApi';

// Module-level cache
const noteCache = new Map<string, Promise<Note>>();

/**
 * Note Content Component
 *
 * Demonstrates EXAMPLE 6 - Progressive Enhancement Pattern:
 * - Each section has its own Suspense boundary
 * - This section loads independently from comments and related notes
 */
function NoteContentDisplay({ noteId }: { noteId: string }) {
  const notePromise = useMemo(() => {
    if (!noteCache.has(noteId)) {
      noteCache.set(noteId, fetchNote(noteId));
    }
    return noteCache.get(noteId)!;
  }, [noteId]);

  const note = use(notePromise);

  return (
    <div className='card shadow-sm mb-4'>
      <div className='card-body'>
        <div className='mb-4 pb-3 border-bottom'>
          <h1 className='display-5 mb-3'>{note.title}</h1>
          <div className='d-flex gap-3 align-items-center flex-wrap'>
            <span className='badge bg-primary fs-6'>{note.category}</span>
            <span className='text-muted'>
              <strong>Author:</strong> {note.author}
            </span>
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
    </div>
  );
}

export default function NoteContent({ noteId }: { noteId: string }) {
  return (
    <Suspense fallback={<NoteContentSkeleton />}>
      <NoteContentDisplay noteId={noteId} />
    </Suspense>
  );
}

function NoteContentSkeleton() {
  return (
    <div className='card shadow-sm mb-4'>
      <div className='card-body'>
        <div className='mb-4 pb-3 border-bottom'>
          <div className='placeholder-glow mb-3'>
            <span className='placeholder col-8 placeholder-lg'></span>
          </div>
          <div className='d-flex gap-3'>
            <span className='placeholder col-3'></span>
            <span className='placeholder col-4'></span>
            <span className='placeholder col-3'></span>
          </div>
        </div>
        <div className='placeholder-glow'>
          <span className='placeholder col-12 mb-2'></span>
          <span className='placeholder col-12 mb-2'></span>
          <span className='placeholder col-10'></span>
        </div>
      </div>
    </div>
  );
}
