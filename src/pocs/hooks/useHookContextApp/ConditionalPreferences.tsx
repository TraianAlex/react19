import { use, useState } from 'react';
import { UserPreferencesContext } from './UserPreferencesContext';

/**
 * ConditionalPreferences Component
 *
 * Demonstrates EXAMPLE 5: Conditional context usage
 * ✅ This works with use() - can be called conditionally
 * ❌ This wouldn't work with useContext - must be called unconditionally
 */
export default function ConditionalPreferences() {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Conditional Context Usage</h5>
        <p className='card-text text-muted small mb-3'>
          This demonstrates how <code>use()</code> can be called conditionally,
          which is not possible with <code>useContext</code>.
        </p>

        <button
          className='btn btn-primary mb-3'
          onClick={() => setShowPreferences(!showPreferences)}
        >
          {showPreferences ? 'Hide' : 'Show'} Preferences
        </button>

        {showPreferences && <PreferencesContent />}
      </div>
    </div>
  );
}

/**
 * PreferencesContent Component
 *
 * ✅ GOOD: use() can be called conditionally
 * This demonstrates the key advantage of use() over useContext
 */
function PreferencesContent() {
  // ✅ This works with use() - can be called conditionally
  // Try uncommenting the useContext version below to see the error
  const preferences = use(UserPreferencesContext);

  // ❌ This wouldn't work if we tried to call it conditionally:
  // const preferences = someCondition ? useContext(UserPreferencesContext) : null;
  // Error: React Hook "useContext" is called conditionally. React Hooks must be called in the exact same order every time.

  if (!preferences) {
    return (
      <div className='alert alert-info'>
        No preferences available (context not provided)
      </div>
    );
  }

  return (
    <div className='border rounded p-3 bg-light'>
      <h6>User Preferences:</h6>
      <ul className='list-unstyled'>
        <li>
          <strong>Theme:</strong>{' '}
          <span
            className={`badge bg-${
              preferences.theme === 'dark' ? 'dark' : 'light text-dark'
            }`}
          >
            {preferences.theme}
          </span>
        </li>
        <li>
          <strong>Language:</strong>{' '}
          <span className='badge bg-info'>{preferences.language}</span>
        </li>
        <li>
          <strong>Notifications:</strong>{' '}
          <span
            className={`badge bg-${
              preferences.notifications ? 'success' : 'secondary'
            }`}
          >
            {preferences.notifications ? 'Enabled' : 'Disabled'}
          </span>
        </li>
        <li>
          <strong>Font Size:</strong>{' '}
          <span className='badge bg-primary'>{preferences.fontSize}</span>
        </li>
      </ul>
    </div>
  );
}
