import { useState, useContext } from 'react';
import {
  UserPreferencesContext,
  type UserPreferences,
} from './UserPreferencesContext';

/**
 * PreferencesSettings Component
 *
 * This component allows editing preferences
 * Uses traditional useContext for setting values
 */
export default function PreferencesSettings() {
  const preferences = useContext(UserPreferencesContext);
  const [localPrefs, setLocalPrefs] = useState<UserPreferences>(
    preferences || {
      theme: 'light',
      language: 'en',
      notifications: true,
      fontSize: 'medium',
    }
  );

  // In a real app, this would update the context provider's state
  const handleChange = (key: keyof UserPreferences, value: any) => {
    setLocalPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Preferences Settings</h5>
        <p className='card-text text-muted small mb-3'>
          Edit your preferences (changes are local for demo purposes)
        </p>

        <div className='mb-3'>
          <label className='form-label'>Theme</label>
          <select
            className='form-select'
            value={localPrefs.theme}
            onChange={(e) =>
              handleChange('theme', e.target.value as 'light' | 'dark')
            }
          >
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </div>

        <div className='mb-3'>
          <label className='form-label'>Language</label>
          <select
            className='form-select'
            value={localPrefs.language}
            onChange={(e) =>
              handleChange('language', e.target.value as 'en' | 'es' | 'fr')
            }
          >
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
          </select>
        </div>

        <div className='mb-3'>
          <label className='form-label'>Font Size</label>
          <select
            className='form-select'
            value={localPrefs.fontSize}
            onChange={(e) =>
              handleChange(
                'fontSize',
                e.target.value as 'small' | 'medium' | 'large'
              )
            }
          >
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
          </select>
        </div>

        <div className='form-check form-switch'>
          <input
            className='form-check-input'
            type='checkbox'
            id='notifications'
            checked={localPrefs.notifications}
            onChange={(e) => handleChange('notifications', e.target.checked)}
          />
          <label className='form-check-label' htmlFor='notifications'>
            Enable Notifications
          </label>
        </div>
      </div>
    </div>
  );
}
