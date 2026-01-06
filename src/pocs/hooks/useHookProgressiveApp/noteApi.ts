/**
 * Note API - Async functions for fetching note data
 * These work directly with React's use() hook
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
  author: string;
}

export interface Comment {
  id: string;
  noteId: string;
  text: string;
  author: string;
  createdAt: string;
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
export async function fetchComments(noteId: string): Promise<Comment[]> {
  // Simulate delay for progressive loading demonstration
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/comments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for note: ${noteId}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch related notes
 */
export async function fetchRelatedNotes(
  noteId: string
): Promise<RelatedNote[]> {
  // Simulate delay for progressive loading demonstration
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const response = await fetch(`${API_BASE_URL}/notes/${noteId}/related`);
  if (!response.ok) {
    throw new Error(`Failed to fetch related notes for note: ${noteId}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
