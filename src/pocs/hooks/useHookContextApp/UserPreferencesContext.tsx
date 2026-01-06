import { createContext } from 'react';

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

export const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  fontSize: 'medium',
};

/**
 * User Preferences Context
 *
 * This context holds user preferences that can be accessed conditionally
 * using React 19's use() hook (EXAMPLE 5)
 */
export const UserPreferencesContext = createContext<UserPreferences | null>(
  null
);
