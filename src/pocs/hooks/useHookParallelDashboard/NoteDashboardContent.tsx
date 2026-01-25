import { use, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchNote, fetchNoteComments, fetchNoteStats, fetchRelatedNotes, Note, NoteComment, NoteStats, RelatedNote } from './noteDashboardApi';

// Module-level caches to ensure promise stability and prevent infinite loops
const notePromiseCache = new Map<string, Promise<Note>>();
const commentsPromiseCache = new Map<string, Promise<NoteComment[]>>();
const statsPromiseCache = new Map<string, Promise<NoteStats>>();
const relatedNotesPromiseCache = new Map<string, Promise<RelatedNote[]>>();

export interface NoteDashboardProps {
  noteId: string;
}

/**
 * Note Dashboard Component
 *
 * Demonstrates EXAMPLE 3: Multiple Async Resources (Parallel Loading)
 *
* ✅ GOOD: Parallel loading - all requests start immediately
 * - Creates all promises with useMemo BEFORE calling use()
 * - All promises resolve in parallel, not sequentially
 * - Much faster than waterfall loading
 
 * Key Learning Points:
 * 1. Create all promises with useMemo before calling use()
 * 2. All promises start fetching simultaneously
 * 3. Each use() call unwraps its promise independently
 * 4. Suspense handles loading states for all resources
 */
export default function NoteDashboardContent({ noteId }: NoteDashboardProps) {
  // ✅ CRITICAL: Create ALL independent promises in parallel using useMemo with cache
  // Module-level caches ensure the same promise instance is reused, preventing infinite loops
  const notePromise = useMemo(() => {
    if (!notePromiseCache.has(noteId)) {
      notePromiseCache.set(noteId, fetchNote(noteId));
    }
    return notePromiseCache.get(noteId)!;
  }, [noteId]);

  const commentsPromise = useMemo(() => {
    if (!commentsPromiseCache.has(noteId)) {
      commentsPromiseCache.set(noteId, fetchNoteComments(noteId));
    }
    return commentsPromiseCache.get(noteId)!;
  }, [noteId]);

  const statsPromise = useMemo(() => {
    if (!statsPromiseCache.has(noteId)) {
      statsPromiseCache.set(noteId, fetchNoteStats(noteId));
    }
    return statsPromiseCache.get(noteId)!;
  }, [noteId]);

  // ✅ All these use() calls unwrap promises that are fetching in parallel
  // Note, comments, and stats all fetch simultaneously!
  const note = use(notePromise);
  const comments = use(commentsPromise);
  const stats = use(statsPromise);

  // Related notes needs the note's category, so it's created after note resolves
  // This is still efficient as the first 3 requests are parallel
  const relatedNotesKey = `${noteId}-${note.category}`;
  const relatedNotesPromise = useMemo(() => {
    if (!relatedNotesPromiseCache.has(relatedNotesKey)) {
      relatedNotesPromiseCache.set(
        relatedNotesKey,
        fetchRelatedNotes(noteId, note.category)
      );
    }
    return relatedNotesPromiseCache.get(relatedNotesKey)!;
  }, [noteId, note.category, relatedNotesKey]);
  const relatedNotes = use(relatedNotesPromise);

  return (
    <div className='container-fluid mt-4' style={{ maxWidth: '1400px' }}>
      <div className='row g-4'>
        {/* Main Note Content */}
        <div className='col-lg-8'>
          <div className='card shadow-sm'>
            <div className='card-body'>
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
          </div>

          {/* Comments Section */}
          <div className='card shadow-sm mt-4'>
            <div className='card-header'>
              <h3 className='h5 mb-0'>Comments ({comments.length})</h3>
            </div>
            <div className='card-body'>
              {comments.length === 0 ? (
                <p className='text-muted'>
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                <div className='list-group list-group-flush'>
                  {comments.map((comment) => (
                    <div key={comment.id} className='list-group-item px-0'>
                      <div className='d-flex justify-content-between align-items-start mb-2'>
                        <strong>{comment.author}</strong>
                        <small className='text-muted'>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className='mb-0'>{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar with Stats and Related Notes */}
        <div className='col-lg-4'>
          {/* Statistics Card */}
          <div className='card shadow-sm mb-4'>
            <div className='card-header'>
              <h3 className='h5 mb-0'>Statistics</h3>
            </div>
            <div className='card-body'>
              <div className='d-flex flex-column gap-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='text-muted'>Views</span>
                  <span className='fs-4 fw-bold text-primary'>
                    {stats.views}
                  </span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='text-muted'>Likes</span>
                  <span className='fs-4 fw-bold text-success'>
                    {stats.likes}
                  </span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='text-muted'>Shares</span>
                  <span className='fs-4 fw-bold text-info'>{stats.shares}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Notes Card */}
          <div className='card shadow-sm'>
            <div className='card-header'>
              <h3 className='h5 mb-0'>Related Notes</h3>
            </div>
            <div className='card-body'>
              {relatedNotes.length === 0 ? (
                <p className='text-muted small'>No related notes found.</p>
              ) : (
                <div className='list-group list-group-flush'>
                  {relatedNotes.map((relatedNote) => (
                    <Link
                      to={`/hooks/parallel-dashboard/${relatedNote.id}`}
                      key={relatedNote.id}
                      className='list-group-item list-group-item-action'
                    >
                      <div className='d-flex justify-content-between align-items-start'>
                        <div>
                          <h6 className='mb-1'>{relatedNote.title}</h6>
                          <small className='badge bg-secondary'>
                            {relatedNote.category}
                          </small>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ❌ BAD EXAMPLE: Waterfall loading - each request waits for the previous one
 * This is slower because requests happen sequentially
 */
function NoteDashboardWaterfall({ noteId }: NoteDashboardProps) {
  // ❌ BAD: First get note, then use its data for other requests
  const note = use(useMemo(() => fetchNote(noteId), [noteId]));

  // This waits for note to resolve first - WATERFALL!
  const comments = use(useMemo(() => fetchNoteComments(note.id), [note.id]));
  const stats = use(useMemo(() => fetchNoteStats(note.id), [note.id]));
  const relatedNotes = use(
    useMemo(
      () => fetchRelatedNotes(note.id, note.category),
      [note.id, note.category]
    )
  );

  // This component is just for demonstration - don't use this pattern!
  return null;
}
