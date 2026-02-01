import { User } from '../state/authSlice';
import httpClient from './httpClient';

interface Credentials {
  email: string;
  password: string;
}

type ReqresUserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

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

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await httpClient.get<{
      data: ReqresUserData[];
    }>('/users');
    const usersData = response.data?.data as ReqresUserData[];

    return (usersData ?? []).map((user) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      avatar: user.avatar,
    }));
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch users');
  }
};

export const getUserProfile = async (id: number): Promise<User> => {
  try {
    const response = await httpClient.get(`/users/${id}`);
    const userData = response.data as any;
    const user = {
      id: userData.data.id,
      name: `${userData.data.first_name} ${userData.data.last_name}`,
      email: userData.data.email,
      avatar: userData.data.avatar,
    };

    return user;
  } catch (error: any) {
    throw new Error('Failed to fetch user profile');
  }
};
