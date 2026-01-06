/**
 * Note Dashboard API - Multiple async functions for parallel loading
 * Demonstrates EXAMPLE 3: Multiple Async Resources (Parallel Loading)
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

export interface NoteComment {
  id: string;
  noteId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface NoteStats {
  noteId: string;
  views: number;
  likes: number;
  shares: number;
}

export interface RelatedNote {
  id: string;
  title: string;
  category: string;
}

const API_BASE_URL = 'http://localhost:4000/api';

/**
 * Fetch a single note by ID
 */
export async function fetchNote(id: string): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch note with id: ${id}`);
  }
  const data = await response.json();
  return data;
}

/**
 * Fetch comments for a note
 */
export async function fetchNoteComments(
  noteId: string
): Promise<NoteComment[]> {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/comments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for note ${noteId}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch statistics for a note
 */
export async function fetchNoteStats(noteId: string): Promise<NoteStats> {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/stats`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stats for note ${noteId}`);
  }
  const data = await response.json();
  // json-server returns an array when querying with ?noteId=, get first item
  if (Array.isArray(data)) {
    if (data.length === 0) {
      // Return default stats if none found
      return {
        noteId,
        views: 0,
        likes: 0,
        shares: 0,
      };
    }
    return data[0];
  }
  return data;
}

/**
 * Fetch related notes (same category)
 */
export async function fetchRelatedNotes(
  noteId: string,
  category: string
): Promise<RelatedNote[]> {
  const response = await fetch(
    `${API_BASE_URL}/notes?category=${category}&exclude=${noteId}&_limit=4`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch related notes`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
