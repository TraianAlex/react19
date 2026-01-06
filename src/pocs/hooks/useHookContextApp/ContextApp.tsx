import { useState } from 'react';
import {
  UserPreferencesContext,
  defaultPreferences,
  type UserPreferences,
} from './UserPreferencesContext';
import ThemeDisplay from './ThemeDisplay';
import ConditionalPreferences from './ConditionalPreferences';
import ConditionalThemeExample from './ConditionalThemeExample';
import PreferencesSettings from './PreferencesSettings';

/**
 * Context App - Complete Example Using React 19's use() Hook with Context
 *
 * This app demonstrates EXAMPLE 5 from useHookExample.tsx:
 * - Working with Context using use() hook
 * - Conditional context usage (key advantage over useContext)
 * - Basic context consumption patterns
 *
 * Key Learning Points:
 * 1. use() can work with React Context, just like useContext
 * 2. use() can be called conditionally, useContext cannot
 * 3. This enables more flexible component patterns
 * 4. use() provides a more flexible alternative to useContext
 */

export default function ContextApp() {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);

  return (
    <UserPreferencesContext.Provider value={preferences}>
      <div className='container-fluid mt-4' style={{ maxWidth: '1200px' }}>
        <header className='text-center mb-4 pb-3 border-bottom'>
          <h1 className='display-4 mb-2'>⚙️ Context App</h1>
          <p className='text-muted'>
            Demonstrating React 19's{' '}
            <code className='bg-light px-2 py-1 rounded'>use()</code> hook with
            Context
            <br />
            <small>EXAMPLE 5: Working with Context</small>
          </p>
        </header>

        <div className='row g-4'>
          {/* Left Column: Examples */}
          <div className='col-md-8'>
            <div className='d-flex flex-column gap-4'>
              {/* Example 1: Basic Context Usage */}
              <div>
                <h3 className='h5 mb-3'>Example 1: Basic Context Usage</h3>
                <ThemeDisplay />
                <p className='text-muted small mt-2'>
                  This demonstrates basic context consumption using{' '}
                  <code>use()</code> hook. It's equivalent to{' '}
                  <code>useContext(UserPreferencesContext)</code>.
                </p>
              </div>

              {/* Example 2: Conditional Context Usage */}
              <div>
                <h3 className='h5 mb-3'>
                  Example 2: Conditional Context Access
                </h3>
                <ConditionalThemeExample />
                <p className='text-muted small mt-2'>
                  This demonstrates the KEY ADVANTAGE: <code>use()</code> can be
                  called conditionally. The ThemedButton component only renders
                  when the toggle is on, and it can still access context. With{' '}
                  <code>useContext</code>, you'd have to call it
                  unconditionally.
                </p>
              </div>

              {/* Example 3: Conditional Preferences Display */}
              <div>
                <h3 className='h5 mb-3'>
                  Example 3: Conditional Preferences Display
                </h3>
                <ConditionalPreferences />
                <p className='text-muted small mt-2'>
                  Another example showing conditional context usage. The
                  preferences are only accessed when the button is clicked,
                  demonstrating flexible context consumption.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Settings */}
          <div className='col-md-4'>
            <h3 className='h5 mb-3'>Preferences Settings</h3>
            <PreferencesSettings />
            <div className='card mt-3'>
              <div className='card-body'>
                <h6 className='card-title'>Current Context Value</h6>
                <pre
                  className='bg-light p-2 rounded small'
                  style={{ fontSize: '0.8rem' }}
                >
                  {JSON.stringify(preferences, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <footer className='mt-5 pt-4 border-top'>
          <div className='row'>
            <div className='col-md-6'>
              <h6>Key Differences: use() vs useContext</h6>
              <ul className='small'>
                <li>
                  <strong>use():</strong> Can be called conditionally ✅
                </li>
                <li>
                  <strong>useContext:</strong> Must be called unconditionally ❌
                </li>
                <li>
                  <strong>use():</strong> Works with both Context and Promises
                </li>
                <li>
                  <strong>useContext:</strong> Only works with Context
                </li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h6>When to Use use() with Context</h6>
              <ul className='small'>
                <li>When you need conditional context access</li>
                <li>When building reusable components with optional context</li>
                <li>When you want consistent API for Context and Promises</li>
                <li>When context might not always be available</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </UserPreferencesContext.Provider>
  );
}
