import { jsonPlaceholderApi } from '../shared/api';
import { ActionResult, Post } from '../shared/types';

// Form action for creating posts
export async function createPostAction(
  prevState: ActionResult<Post>,
  formData: FormData
): Promise<ActionResult<Post>> {
  try {
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const userId = parseInt(formData.get('userId') as string);

    // Validation
    if (!title?.trim()) {
      return { success: false, error: 'Title is required' };
    }
    if (!body?.trim()) {
      return { success: false, error: 'Body is required' };
    }
    if (!userId || userId < 1) {
      return { success: false, error: 'Valid User ID is required' };
    }

    const post = await jsonPlaceholderApi.createPost({ title, body, userId });
    return { success: true, data: post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post',
    };
  }
}

// Contact form with different validation
export async function contactFormAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Simulate validation
    if (!name?.trim()) {
      return { success: false, error: 'Name is required' };
    }
    if (!email?.includes('@')) {
      return { success: false, error: 'Valid email is required' };
    }
    if (!message?.trim()) {
      return { success: false, error: 'Message is required' };
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      data: { name, email, message },
      error: undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to send message',
    };
  }
}
