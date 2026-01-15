# React19 Practice Lab — Overview

This repository is a living lab to practice and recall modern React patterns, with a focus on correctness, performance, and breadth of features in the React 18/19 era plus the surrounding ecosystem (routing, state, data fetching, Suspense, server actions, transitions, RSC, etc.). It contains multiple small applications and proof-of-concepts demonstrating isolated concepts as well as integrated patterns.

## High-level Structure

- apps/
  - speakers/: Standalone app demonstrating data-driven UI with components and styles; showcases CRUD, filtering, memoization, and image asset usage.
  - tic-tac-toe/: Progressive implementations (game1–game6) plus shared/common code for evolving architecture and patterns (state lifting, immutability, reducer patterns, testing transitions).
  - todos/: A small app demonstrating todo patterns; different implementations live in `pocs/todos-test`.
  - vanlife/: Complete app with API layer, server.ts, types, pages and components; demonstrates routing, data loaders, mutations, CSS Modules/Sass, and type-safe boundaries.
  - watch-list/: Small TS entry point; likely a minimal app exercising list state and effects.

- components/
  - CustomErrorBoundary.tsx: Error boundaries and graceful failure UIs.
  - loading-spinner, not-found, LoaderMessage: Reusable UI pieces for Suspense/error/loading states.

- hooks/
  - useGeneralizedCrudMethods, useLocalStorage, useTypeWritting, useUniqueIds: Custom hooks covering persistence, UI effects, id management, and generic CRUD abstraction.

- main/
  - home/, layout/, navigation-bar/: The shell of the main multi-app host UI; routes to sub-apps and showcases composition and data fetching.

- pocs/
  - auth/: Auth flows: components, services, state, and private routes patterns.
  - hooks/: Several hook-oriented demo apps (context, parallel fetching, progressive app patterns).
  - react19-features/: Dedicated area to exercise React 19 features including actions, form actions, concurrent rendering, optimistic updates, Suspense, and hook usage. Contains FEATURES.md and README.md for concept notes.
  - rsc/: RSC demos with simple-rsc and RscLayout.tsx.
  - todos-test/: Multiple todo implementations (context, actions, server actions, Flux, Redux, action-state) to compare patterns and tradeoffs.
  - transition/: Focused demos for transitions with delay, optimistic, and Suspense interactions.
  - weather/: An app demonstrating utils, styles, and data fetching with Suspense or transitions.

- sandbox/
  - components/: Marquee, SpreadJS integration; shows 3rd-party component integration and CSS modules.
  - compound-components/: Many variants to practice the compound components pattern (context vs hooks vs toggles vs menu).
  - context/: Context API usage.
  - diverse/: A variety of UI and state demos (products list, type writing effect, reset-state).
  - hooks/: Utilities like useEffectOnUpdate and useToggle.
  - parent-grandchild/: Prop drilling vs context and logging update patterns.
  - playground/: Generic sandbox for ad-hoc experiments.
  - ReduxWithHooks/: Classic Redux with hooks, including actions, reducers, store.

- shared/
  - utils/: Cross-cutting helpers.

- types/
  - redux-resolver.d.ts: Type declarations for interop.

- root
  - App.tsx, App.scss, index.scss, main.tsx: App bootstrap and global styles.
  - tests/: Early or partial tests stubs for components/home detail.
  - SUSPENSE_ANALYSIS.md: Notes analyzing Suspense behavior.
  - README.md: Root readme; pocs/react19-features also has README and FEATURES.md.
  - Vite setup with tsconfig, eslint, vite config, routes.json and db.json for mock server.

## React Features Demonstrated

### Core React
- Function components and hooks across the project.
- Custom hooks (useLocalStorage, useUniqueIds, useGeneralizedCrudMethods, useEffectOnUpdate, useToggle).
- Context API:
  - sandbox/context/TestContext.tsx
  - pocs/hooks/useHookContextApp
  - compound-components using context for state sharing
  - todos implementations using Context and custom providers
- State management patterns:
  - Local state with useState/useReducer
  - Derived and memoized values (e.g., speakers, tic-tac-toe, todos)
  - Flux/Redux variants in pocs/todos-test and sandbox/ReduxWithHooks
- Component composition patterns:
  - Compound components (multiple approaches and refactors)
  - Parent-Child-Grandchild communication demos

### Concurrent features and performance
- Suspense:
  - pocs/react19-features/suspense-demo
  - SUSPENSE_ANALYSIS.md
  - transition-suspense demos
  - Components for loaders and error boundaries tailored for Suspense
- Transitions:
  - pocs/transition/transition-delay, transition-optimistic, transition-suspense
- Optimistic UI:
  - pocs/react19-features/optimistic-demo
  - transition-optimistic
- React 19 features:
  - pocs/react19-features includes actions-demo, form-actions-demo, use-hook-demo, concurrent-demo, shared/ — central place to practice Actions, Form Actions, and new 19-era APIs and patterns
- Error boundaries:
  - components/CustomErrorBoundary and not-found handling

### Routing and app structure
- Main host layout and navigation:
  - main/layout, main/navigation-bar, main/home with list/detail pattern and useRecipes hook
- Sub-app routing within pocs and apps folders
- Not-found route component for fallback UI

### Data fetching and server integration
- vanlife/api.js and server.ts for mock or local API
- routes.json and db.json for dev server integration
- pocs/rsc/simple-rsc and RscLayout.tsx for server components exploration
- todos-server-actions, todos-actions/action-state experiments around server actions patterns

### Styling and assets
- CSS Modules and Sass:
  - Vanlife.modules.scss, Weather.module.scss, sandbox components .modules.scss
- Asset management in public/images
- Global styles index.scss, App.scss

### Testing
- Initial tests scaffold in tests/components/home/home-detail
- Patterns lend themselves to unit and integration testing, though test coverage is partial.

## Best Practices Present
- Modular architecture: apps, pocs, sandbox separation avoids coupling and enables focused demos.
- Small, focused components and hooks to illustrate single responsibility.
- Error boundaries and Suspense-friendly loading UIs.
- Custom hooks for side effects and persistence (localStorage), deduplication of CRUD logic.
- Multiple implementations of the same domain (todos, tic-tac-toe) to compare tradeoffs.
- TypeScript present across much of the codebase.
- CSS Modules/Sass for style scoping and maintainability.
- Mock server and routes files to work offline and test data flows.
- Documentation notes for Suspense and React 19 features inside the repo.

## What’s Missing or Incomplete (Gaps)
- Comprehensive automated tests:
  - Unit tests for hooks and components
  - Integration tests for Suspense, transitions, optimistic updates
  - E2E tests for larger flows (vanlife, todos)
- Performance instrumentation:
  - Profiling examples with React Profiler API and flamegraphs
  - Memoization case studies with useMemo/useCallback and RSC boundaries
  - Examples of preventing re-renders (memo, keying strategies)
- Data fetching libraries comparison:
  - React Query/TanStack Query or SWR examples alongside Suspense and native fetch patterns
- Form management breadth:
  - Deep dive into controlled vs uncontrolled, RHF integration, validation strategies, and React 19 form actions combined with progressive enhancement
- Accessibility (a11y):
  - Examples with ARIA roles, keyboard navigation, focus management, semantic HTML
  - Testing a11y via jest-axe or playwright axe
- Error handling depth:
  - Async boundary strategies, error serialization across server/client, retry policies
- SSR/SSG and streaming:
  - An end-to-end example with streaming SSR + Suspense + RSC composition
- State management comparisons at scale:
  - Signals, Zustand, Jotai, Recoil demonstrations
- Animations and transitions:
  - React 19 View Transitions API usage and comparison with Framer Motion
- Internationalization (i18n):
  - Demonstrate i18n routing, message extraction, locale-aware formatting
- Security and auth:
  - POC exists, but lacks end-to-end flows with token refresh, route guards with data preloading, CSRF considerations, and secure server actions
- CI and linting depth:
  - ESLint present, but no Prettier config or CI workflow to enforce quality gates
- Documentation site:
  - Centralized docs site that aggregates all demos with explanations and links

## Suggested Documentation Layout
- docs/
  - overview.md (this document)
  - features/
    - react19.md
    - suspense.md
    - transitions.md
    - optimistic.md
    - actions-form-actions.md
    - rsc.md
  - patterns/
    - compound-components.md
    - context-and-reducers.md
    - data-fetching-strategies.md
    - state-management-comparison.md
  - apps/
    - vanlife.md
    - speakers.md
    - tic-tac-toe.md
    - todos.md
  - testing/
    - unit-integration.md
    - e2e.md
  - performance/
    - profiling.md
    - rerender-avoidance.md
  - a11y/
    - accessibility-checklist.md
  - roadmap.md

## Actionable Next Step
If you prefer a centralized README only, copy key sections from this document into README.md. Otherwise, continue building out docs/ with the structure above and keep roadmap.md up to date with tasks and status.