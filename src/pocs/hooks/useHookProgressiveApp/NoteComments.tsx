import { useMemo } from 'react';
import { use, Suspense } from 'react';
import { fetchComments } from './noteApi';
import type { Comment } from './noteApi';

// Module-level cache
const commentsCache = new Map<string, Promise<Comment[]>>();

/**
 * Note Comments Component
 *
 * Demonstrates EXAMPLE 6 - Progressive Enhancement Pattern:
 * - This section loads independently from note content and related notes
 * - Has its own Suspense boundary
 */
function NoteCommentsDisplay({ noteId }: { noteId: string }) {
  const commentsPromise = useMemo(() => {
    if (!commentsCache.has(noteId)) {
      commentsCache.set(noteId, fetchComments(noteId));
    }
    return commentsCache.get(noteId)!;
  }, [noteId]);

  const comments = use(commentsPromise);

  if (comments.length === 0) {
    return (
      <div className='card shadow-sm mb-4'>
        <div className='card-body'>
          <h2 className='h4 mb-3'>Comments</h2>
          <p className='text-muted'>
            No comments yet. Be the first to comment!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='card shadow-sm mb-4'>
      <div className='card-body'>
        <h2 className='h4 mb-3'>Comments ({comments.length})</h2>
        <div className='d-flex flex-column gap-3'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className='border-start border-primary border-3 ps-3'
            >
              <div className='d-flex justify-content-between align-items-start mb-2'>
                <strong className='text-primary'>{comment.author}</strong>
                <small className='text-muted'>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
              </div>
              <p className='mb-0'>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NoteComments({ noteId }: { noteId: string }) {
  return (
    <Suspense fallback={<NoteCommentsSkeleton />}>
      <NoteCommentsDisplay noteId={noteId} />
    </Suspense>
  );
}

function NoteCommentsSkeleton() {
  return (
    <div className='card shadow-sm mb-4'>
      <div className='card-body'>
        <div className='placeholder-glow mb-3'>
          <span className='placeholder col-4 placeholder-lg'></span>
        </div>
        <div className='d-flex flex-column gap-3'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='border-start border-primary border-3 ps-3'>
              <div className='d-flex justify-content-between mb-2'>
                <span className='placeholder col-3'></span>
                <span className='placeholder col-4'></span>
              </div>
              <span className='placeholder col-12 mb-1'></span>
              <span className='placeholder col-10'></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
