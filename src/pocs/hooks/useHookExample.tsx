/**
 * React 19's use() Hook Examples
 * 
 * Documentation: https://stevekinney.com/courses/react-performance/the-use-hook
 * 
 * The use() hook works with two types of resources:
 * 1. Promises (for async data)
 * 2. Context (for shared state)
 * 
 * Key points:
 * - use() unwraps promises and context values directly in component body
 * - Suspense handles loading states
 * - Error boundaries handle errors
 * - Promises must be stable (memoized) to prevent infinite loops
 */

import { use, useMemo, Suspense, createContext, useContext } from 'react';

// ============================================================================
// EXAMPLE 1: Basic Promise Usage
// ============================================================================

/**
 * Basic async function - works as-is with use()
 */
async function fetchUserData(id: string): Promise<{ id: string; name: string; email: string }> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

/**
 * ❌ BAD: Creates a new promise on every render - causes infinite loop!
 */
export function BadUserCard({ userId }: { userId: string }) {
  // This will cause infinite suspend/re-render loop
  const user = use(fetch(`/api/users/${userId}`).then((r) => r.json()));
  return <div>{user.name}</div>;
}

/**
 * ✅ GOOD: Memoize the promise to prevent recreation
 */
export function GoodUserCard({ userId }: { userId: string }) {
  // Memoize the promise to prevent recreation on every render
  const userPromise = useMemo(() => fetchUserData(userId), [userId]);
  const user = use(userPromise);

  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

/**
 * Usage with Suspense boundary
 */
export function UserCardWithSuspense({ userId }: { userId: string }) {
  return (
    <Suspense fallback={<div>Loading user…</div>}>
      <GoodUserCard userId={userId} />
    </Suspense>
  );
}

// ============================================================================
// EXAMPLE 2: Promise Caching Pattern
// ============================================================================

/**
 * External promise cache to prevent duplicate requests
 */
const userPromiseCache = new Map<string, Promise<{ id: string; name: string; email: string }>>();

function getCachedUserPromise(userId: string) {
  if (!userPromiseCache.has(userId)) {
    userPromiseCache.set(userId, fetchUserData(userId));
  }
  return userPromiseCache.get(userId)!;
}

/**
 * Using cached promises - same promise instance for same userId
 */
export function CachedUserCard({ userId }: { userId: string }) {
  const user = use(getCachedUserPromise(userId));
  return <div>{user.name}</div>;
}

// ============================================================================
// EXAMPLE 3: Multiple Async Resources (Parallel Loading)
// ============================================================================

async function fetchUserPosts(userId: string): Promise<Array<{ id: string; title: string }>> {
  const response = await fetch(`/api/users/${userId}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

async function fetchUserStats(userId: string): Promise<{ views: number; likes: number }> {
  const response = await fetch(`/api/users/${userId}/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

/**
 * ✅ GOOD: Parallel loading - both requests start immediately
 */
export function UserDashboard({ userId }: { userId: string }) {
  // Create promises in parallel using useMemo
  const userPromise = useMemo(() => fetchUserData(userId), [userId]);
  const postsPromise = useMemo(() => fetchUserPosts(userId), [userId]);
  const statsPromise = useMemo(() => fetchUserStats(userId), [userId]);

  // These resolve in parallel
  const user = use(userPromise);
  const posts = use(postsPromise);
  const stats = use(statsPromise);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Posts: {posts.length}</p>
      <p>Views: {stats.views}</p>
      <p>Likes: {stats.likes}</p>
    </div>
  );
}

/**
 * ❌ BAD: Waterfall loading - second request waits for first
 */
export function UserDashboardWaterfall({ userId }: { userId: string }) {
  const user = use(useMemo(() => fetchUserData(userId), [userId]));
  // This waits for user to resolve first
  const posts = use(useMemo(() => fetchUserPosts(user.id), [user.id]));

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Posts: {posts.length}</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Error Handling
// ============================================================================

/**
 * Error handling with use() follows React's error boundary pattern
 * When a promise rejects, the error is thrown during render and caught by
 * the nearest error boundary
 */
export function UserProfileWithErrorBoundary({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUserData(userId), [userId]);
  const user = use(userPromise); // Throws if promise rejects
  return <div>{user.name}</div>;
}

/**
 * Safe error handling - catch errors in the function itself
 */
async function fetchUserSafely(
  userId: string
): Promise<{ id: string; name: string; email: string } | null> {
  try {
    return await fetchUserData(userId);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null; // Return fallback instead of throwing
  }
}

export function SafeUserProfile({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUserSafely(userId), [userId]);
  const user = use(userPromise);

  if (!user) {
    return <div>User not found</div>;
  }

  return <div>{user.name}</div>;
}

// ============================================================================
// EXAMPLE 5: Working with Context
// ============================================================================

/**
 * use() can work with React context, providing a more flexible alternative
 * to useContext. The key difference is that use() can be called conditionally.
 */

const ThemeContext = createContext<'light' | 'dark'>('light');

/**
 * Basic context usage with use()
 */
export function ThemedButton() {
  // This is equivalent to useContext(ThemeContext)
  const theme = use(ThemeContext);
  return <button className={`btn-${theme}`}>Themed Button</button>;
}

/**
 * ✅ Conditional context usage - works with use() but not useContext
 */
export function ConditionalTheme({ showThemed }: { showThemed: boolean }) {
  // ✅ This works with use()
  const theme = showThemed ? use(ThemeContext) : 'default';

  // ❌ This wouldn't work with useContext (must be called unconditionally)
  // const theme = showThemed ? useContext(ThemeContext) : 'default';

  return <div className={`theme-${theme}`}>Content</div>;
}

// ============================================================================
// EXAMPLE 6: Progressive Enhancement Pattern
// ============================================================================

/**
 * Progressive enhancement - each section loads independently
 */
export function ArticlePage({ articleId }: { articleId: string }) {
  return (
    <div>
      <Suspense fallback={<div>Loading article...</div>}>
        <ArticleContent articleId={articleId} />
      </Suspense>

      <Suspense fallback={<div>Loading comments...</div>}>
        <ArticleComments articleId={articleId} />
      </Suspense>

      <Suspense fallback={<div>Loading related articles...</div>}>
        <RelatedArticles articleId={articleId} />
      </Suspense>
    </div>
  );
}

async function fetchArticle(id: string): Promise<{ title: string; content: string }> {
  const response = await fetch(`/api/articles/${id}`);
  if (!response.ok) throw new Error('Failed to fetch article');
  return response.json();
}

async function fetchComments(id: string): Promise<Array<{ id: string; text: string }>> {
  const response = await fetch(`/api/articles/${id}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
}

async function fetchRelated(id: string): Promise<Array<{ id: string; title: string }>> {
  const response = await fetch(`/api/articles/${id}/related`);
  if (!response.ok) throw new Error('Failed to fetch related');
  return response.json();
}

function ArticleContent({ articleId }: { articleId: string }) {
  const articlePromise = useMemo(() => fetchArticle(articleId), [articleId]);
  const article = use(articlePromise);
  return <div><h1>{article.title}</h1><p>{article.content}</p></div>;
}

function ArticleComments({ articleId }: { articleId: string }) {
  const commentsPromise = useMemo(() => fetchComments(articleId), [articleId]);
  const comments = use(commentsPromise);
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
}

function RelatedArticles({ articleId }: { articleId: string }) {
  const relatedPromise = useMemo(() => fetchRelated(articleId), [articleId]);
  const related = use(relatedPromise);
  return (
    <div>
      <h2>Related Articles</h2>
      {related.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Migration from useEffect + useState
// ============================================================================

/**
 * Before: Manual state management with useEffect + useState
 */
export function OldUserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData(userId)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  return <div>{user.name}</div>;
}

/**
 * After: use() + Suspense - much cleaner!
 */
export function NewUserProfile({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUserData(userId), [userId]);
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

// ============================================================================
// EXAMPLE 8: Conditional Promise Usage
// ============================================================================

/**
 * Conditional promise usage - only fetch when needed
 */
export function ConditionalUserProfile({
  userId,
  includeAnalytics,
}: {
  userId: string;
  includeAnalytics: boolean;
}) {
  const userPromise = useMemo(() => fetchUserData(userId), [userId]);
  const user = use(userPromise);

  // Conditionally load analytics only if needed
  const analyticsPromise = useMemo(
    () =>
      includeAnalytics
        ? fetch(`/api/users/${userId}/analytics`).then((r) => r.json())
        : null,
    [userId, includeAnalytics]
  );

  const analytics = analyticsPromise ? use(analyticsPromise) : null;

  return (
    <div>
      <h2>{user.name}</h2>
      {analytics && <div>Analytics: {JSON.stringify(analytics)}</div>}
    </div>
  );
}

// ============================================================================
// HELPER: Custom Hook for Stable Promises
// ============================================================================

/**
 * Custom hook to ensure promise stability
 * This prevents infinite loops by ensuring the same promise instance
 * is used for the same dependencies
 */
export function useStablePromise<T>(
  promiseFactory: () => Promise<T>,
  deps: DependencyList
): Promise<T> {
  return useMemo(promiseFactory, deps);
}

/**
 * Usage example with custom hook
 */
export function UserCardWithStablePromise({ userId }: { userId: string }) {
  const userPromise = useStablePromise(() => fetchUserData(userId), [userId]);
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

// ============================================================================
// NOTES AND BEST PRACTICES
// ============================================================================

/**
 * BEST PRACTICES:
 * 
 * 1. Always memoize promises passed to use() to prevent infinite loops
 *    ✅ useMemo(() => fetchData(id), [id])
 *    ❌ fetchData(id) // Creates new promise every render
 * 
 * 2. Use Suspense boundaries to handle loading states
 *    <Suspense fallback={<Loading />}>
 *      <Component />
 *    </Suspense>
 * 
 * 3. Use Error Boundaries to handle promise rejections
 *    <ErrorBoundary fallback={<Error />}>
 *      <Suspense fallback={<Loading />}>
 *        <Component />
 *      </Suspense>
 *    </ErrorBoundary>
 * 
 * 4. For parallel loading, create all promises with useMemo before calling use()
 *    ✅ const p1 = useMemo(...); const p2 = useMemo(...); const d1 = use(p1); const d2 = use(p2);
 *    ❌ const d1 = use(useMemo(...)); const d2 = use(useMemo(...)); // Waterfall
 * 
 * 5. use() can only be called during render, not in event handlers or effects
 * 
 * 6. Consider using promise caching for expensive operations or duplicate requests
 */

// Import useState and useEffect for the migration example
import { useState, useEffect, DependencyList } from 'react';
