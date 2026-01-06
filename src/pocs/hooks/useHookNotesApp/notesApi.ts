/**
 * Notes API - Simple async functions for fetching notes
 * These work directly with React's use() hook
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

const API_BASE_URL = 'http://localhost:4000/api';

/**
 * Fetch all notes
 */
export async function fetchNotes(): Promise<Note[]> {
  const response = await fetch(`${API_BASE_URL}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

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
