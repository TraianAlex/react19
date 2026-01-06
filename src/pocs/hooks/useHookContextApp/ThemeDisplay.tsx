import { use } from 'react';
import { UserPreferencesContext } from './UserPreferencesContext';

/**
 * ThemeDisplay Component
 *
 * Demonstrates EXAMPLE 5: Basic context usage with use()
 * This is equivalent to useContext(UserPreferencesContext)
 */
export default function ThemeDisplay() {
  // ✅ Basic usage: use() works just like useContext
  const preferences = use(UserPreferencesContext);

  if (!preferences) {
    return (
      <div className='alert alert-warning'>
        No preferences context available
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Current Theme</h5>
        <p className='card-text'>
          Theme:{' '}
          <span
            className={`badge bg-${
              preferences.theme === 'dark' ? 'dark' : 'light text-dark'
            }`}
          >
            {preferences.theme}
          </span>
        </p>
      </div>
    </div>
  );
}
