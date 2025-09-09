import { User } from '../state/authSlice';
import httpClient from './httpClient';

interface Credentials {
  email: string;
  password: string;
}

// Function to login user
export const loginUser = async (
  credentials: Credentials
): Promise<User & { token: string }> => {
  try {
    const response = await httpClient.post('/login', credentials);
    return response.data as User & { token: string };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

// Function to get user profile (mock implementation)
export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await httpClient.get('/users/2');
    const userData = response.data as any;
    const user = {
      id: userData.data.id,
      name: `${userData.data.first_name} ${userData.data.last_name}`,
      email: userData.data.email,
      avatar: userData.data.avatar,
    };

    return user; // Return the mapped user object
  } catch (error: any) {
    throw new Error('Failed to fetch user profile');
  }
};
