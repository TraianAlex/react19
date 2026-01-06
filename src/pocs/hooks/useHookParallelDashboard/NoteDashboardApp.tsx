import { useParams } from 'react-router-dom';
import NoteDashboard from './NoteDashboard';

/**
 * Note Dashboard App - Wrapper component with routing
 *
 * This app demonstrates EXAMPLE 3: Multiple Async Resources (Parallel Loading)
 *
 * View a note's dashboard with:
 * - Note details
 * - Comments (loaded in parallel)
 * - Statistics (loaded in parallel)
 * - Related notes (loaded in parallel)
 */
export default function NoteDashboardApp() {
  const { noteId } = useParams<{ noteId?: string }>();

  // Use noteId from URL params, or default to '1' for demo
  const selectedNoteId = noteId || '1';

  return <NoteDashboard noteId={selectedNoteId} />;
}
