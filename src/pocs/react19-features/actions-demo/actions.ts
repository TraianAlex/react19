import { jsonPlaceholderApi } from '../shared/api';
import { Post } from '../shared/types';

// Server Action simulation - in real React 19, these would be server functions
export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const userId = parseInt(formData.get('userId') as string);

  if (!title || !body || !userId) {
    throw new Error('All fields are required');
  }

  return await jsonPlaceholderApi.createPost({ title, body, userId });
}

export async function updatePostAction(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  const updates: Partial<Post> = {};
  if (title) updates.title = title;
  if (body) updates.body = body;

  return await jsonPlaceholderApi.updatePost(id, updates);
}

export async function deletePostAction(id: number) {
  return await jsonPlaceholderApi.deletePost(id);
}
