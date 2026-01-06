import { use, useState } from 'react';
import { UserPreferencesContext } from './UserPreferencesContext';

/**
 * ConditionalThemeExample Component
 *
 * Demonstrates EXAMPLE 5: Conditional context usage with use()
 *
 * This shows the KEY ADVANTAGE of use() over useContext:
 * - use() can be called conditionally
 * - useContext must be called unconditionally (always at the top level)
 */
export default function ConditionalThemeExample() {
  const [useThemedButton, setUseThemedButton] = useState(false);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Conditional Context Access</h5>
        <p className='card-text text-muted small mb-3'>
          Toggle to conditionally render a component that uses context. This
          demonstrates how <code>use()</code> can be called conditionally.
        </p>

        <div className='form-check form-switch mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            id='toggleThemed'
            checked={useThemedButton}
            onChange={(e) => setUseThemedButton(e.target.checked)}
          />
          <label className='form-check-label' htmlFor='toggleThemed'>
            Show Themed Button (uses context conditionally)
          </label>
        </div>

        {/* ✅ This works with use() - component only renders when needed */}
        {useThemedButton && <ThemedButton />}

        {/* ❌ This wouldn't work with useContext in the same way */}
        {/* You'd have to always call useContext, even if you don't use it */}
      </div>
    </div>
  );
}

/**
 * ThemedButton Component
 *
 * This component uses context via use() hook
 * It can be rendered conditionally, which is the key advantage
 */
function ThemedButton() {
  // ✅ use() can be called here because this component only renders conditionally
  const preferences = use(UserPreferencesContext);

  if (!preferences) {
    return <div className='alert alert-warning'>Context not available</div>;
  }

  const themeClass = preferences.theme === 'dark' ? 'btn-dark' : 'btn-light';

  return (
    <button className={`btn ${themeClass} w-100`}>
      Themed Button ({preferences.theme} theme)
    </button>
  );
}
