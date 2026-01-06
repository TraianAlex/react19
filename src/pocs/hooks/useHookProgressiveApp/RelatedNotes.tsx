import { useMemo } from 'react';
import { use, Suspense } from 'react';
import { fetchRelatedNotes } from './noteApi';
import type { RelatedNote } from './noteApi';

// Module-level cache
const relatedNotesCache = new Map<string, Promise<RelatedNote[]>>();

/**
 * Related Notes Component
 *
 * Demonstrates EXAMPLE 6 - Progressive Enhancement Pattern:
 * - This section loads independently from note content and comments
 * - Has its own Suspense boundary
 */
function RelatedNotesDisplay({
  noteId,
  onSelectNote,
}: {
  noteId: string;
  onSelectNote: (noteId: string) => void;
}) {
  const relatedPromise = useMemo(() => {
    if (!relatedNotesCache.has(noteId)) {
      relatedNotesCache.set(noteId, fetchRelatedNotes(noteId));
    }
    return relatedNotesCache.get(noteId)!;
  }, [noteId]);

  const relatedNotes = use(relatedPromise);

  if (relatedNotes.length === 0) {
    return (
      <div className='card shadow-sm'>
        <div className='card-body'>
          <h2 className='h4 mb-3'>Related Notes</h2>
          <p className='text-muted'>No related notes found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='card shadow-sm'>
      <div className='card-body'>
        <h2 className='h4 mb-3'>Related Notes ({relatedNotes.length})</h2>
        <div className='list-group'>
          {relatedNotes.map((note) => (
            <button
              key={note.id}
              className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
              onClick={() => onSelectNote(note.id)}
            >
              <div>
                <strong>{note.title}</strong>
                <br />
                <small className='text-muted'>{note.category}</small>
              </div>
              <span className='badge bg-primary rounded-pill'>View →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RelatedNotes({
  noteId,
  onSelectNote,
}: {
  noteId: string;
  onSelectNote: (noteId: string) => void;
}) {
  return (
    <Suspense fallback={<RelatedNotesSkeleton />}>
      <RelatedNotesDisplay noteId={noteId} onSelectNote={onSelectNote} />
    </Suspense>
  );
}

function RelatedNotesSkeleton() {
  return (
    <div className='card shadow-sm'>
      <div className='card-body'>
        <div className='placeholder-glow mb-3'>
          <span className='placeholder col-5 placeholder-lg'></span>
        </div>
        <div className='list-group'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='list-group-item'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='flex-grow-1'>
                  <div className='placeholder-glow'>
                    <span className='placeholder col-7 mb-2'></span>
                    <span className='placeholder col-4'></span>
                  </div>
                </div>
                <span className='placeholder col-2'></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
