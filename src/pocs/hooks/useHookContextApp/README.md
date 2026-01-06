# Context App - React 19 use() Hook with Context Example

This is a complete working example demonstrating **EXAMPLE 5** from `useHookExample.tsx` - Working with Context using React 19's `use()` hook.

## What This Example Demonstrates

✅ **Basic Context Usage** - Using `use()` hook with Context (equivalent to `useContext`)  
✅ **Conditional Context Access** - The KEY advantage: `use()` can be called conditionally  
✅ **Flexible Component Patterns** - Building components that optionally use context  
✅ **Real-world Pattern** - User preferences/settings app

## Key Files

- `UserPreferencesContext.tsx` - Context definition with user preferences
- `ThemeDisplay.tsx` - Basic context usage example
- `ConditionalThemeExample.tsx` - Demonstrates conditional context access
- `ConditionalPreferences.tsx` - Another conditional usage example
- `PreferencesSettings.tsx` - Settings component (uses traditional `useContext`)
- `ContextApp.tsx` - Main app component with context provider

## How It Works

### 1. Context Definition (UserPreferencesContext.tsx)

```typescript
export const UserPreferencesContext = createContext<UserPreferences | null>(
  null
);
```

### 2. Basic Context Usage (ThemeDisplay.tsx)

```typescript
// ✅ Equivalent to useContext(UserPreferencesContext)
const preferences = use(UserPreferencesContext);
```

### 3. Conditional Context Usage (ConditionalThemeExample.tsx)

```typescript
// ✅ This works with use() - component only renders when needed
{
  useThemedButton && <ThemedButton />;
}

// Inside ThemedButton:
const preferences = use(UserPreferencesContext); // ✅ Works!
```

### 4. Conditional Access Pattern

```typescript
// ✅ GOOD: use() can be called conditionally
const theme = showThemed ? use(ThemeContext) : 'default';

// ❌ BAD: useContext cannot be called conditionally
// const theme = showThemed ? useContext(ThemeContext) : 'default';
// Error: React Hook "useContext" is called conditionally
```

## Key Differences: use() vs useContext

| Feature               | use()                          | useContext                    |
| --------------------- | ------------------------------ | ----------------------------- |
| **Conditional calls** | ✅ Yes                         | ❌ No (must be unconditional) |
| **Works with**        | Context & Promises             | Context only                  |
| **Flexibility**       | High                           | Low                           |
| **Use case**          | When context might be optional | When context is always needed |

## Usage

1. **Import and use the component**:

   ```typescript
   import ContextApp from './pocs/hooks/useHookContextApp/ContextApp';

   // In your router or app
   <ContextApp />;
   ```

2. **The app demonstrates**:
   - Basic context consumption
   - Conditional context access (toggle examples)
   - Settings panel for editing preferences
   - Real-time context value display

## Learning Points

### ✅ DO:

- Use `use()` when you need conditional context access
- Use `use()` when building reusable components with optional context
- Use `use()` when context might not always be available
- Use `use()` for consistent API when working with both Context and Promises

### ❌ DON'T:

- Try to call `useContext` conditionally (it will error)
- Use `use()` when you always need context (useContext is fine)
- Forget that `use()` works with both Context and Promises

## Real-World Use Cases

1. **Optional Features**: Components that only use context when a feature is enabled
2. **Progressive Enhancement**: Components that work with or without context
3. **Reusable Components**: Library components that optionally consume context
4. **Conditional Rendering**: Showing context-dependent UI only when needed

## See Also

- `useHookExample.tsx` - Comprehensive examples of all `use()` hook patterns
- [React 19 use() Hook Documentation](https://stevekinney.com/courses/react-performance/the-use-hook)
