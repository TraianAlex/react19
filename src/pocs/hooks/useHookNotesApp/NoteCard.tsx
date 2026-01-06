import { useMemo } from 'react';
import { use } from 'react';
import { fetchNote } from './notesApi';
import type { Note } from './notesApi';

interface NoteCardProps {
  noteId: string;
  onSelect?: (note: Note) => void;
}

/**
 * ✅ GOOD EXAMPLE: Using use() hook with memoized promise
 *
 * This demonstrates EXAMPLE 1 from useHookExample.tsx:
 * - Memoizes the promise to prevent infinite loops
 * - Uses use() to unwrap the promise
 * - Should be wrapped in Suspense boundary by parent
 */
export default function NoteCard({ noteId, onSelect }: NoteCardProps) {
  // ✅ CRITICAL: Memoize the promise to prevent recreation on every render
  // This prevents infinite suspend/re-render loops
  const notePromise = useMemo(() => fetchNote(noteId), [noteId]);

  // use() unwraps the promise and gives us the resolved value
  const note = use(notePromise);

  return (
    <div
      className='card shadow-sm'
      onClick={() => onSelect?.(note)}
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
        <h5 className='card-title'>{note.title}</h5>
        <p className='card-text text-muted small'>
          {note.content.substring(0, 100)}...
        </p>
        <div className='d-flex justify-content-between align-items-center pt-2 border-top'>
          <span className='badge bg-primary'>{note.category}</span>
          <small className='text-muted'>
            {new Date(note.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>
    </div>
  );
}

/**
 * ❌ BAD EXAMPLE: Don't do this!
 * This creates a new promise on every render, causing infinite loops
 */
export function BadNoteCard({ noteId }: { noteId: string }) {
  // ❌ This will cause infinite suspend/re-render loop!
  // const note = use(fetchNote(noteId)); // DON'T DO THIS!

  return null; // This component is just for demonstration
}
