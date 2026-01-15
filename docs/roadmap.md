# Roadmap — React19 Practice Lab

This roadmap tracks gaps and planned work to broaden coverage of React capabilities and best practices, with a strong emphasis on performance and correctness.

Status labels suggestion:
- [ ] Todo
- [~] In progress
- [x] Done

## 1) Testing and Quality
- [ ] Configure Vitest (or Jest) + React Testing Library for unit/integration tests
- [ ] Add example tests for: hooks (useLocalStorage, useGeneralizedCrudMethods, useEffectOnUpdate)
- [ ] Add component tests (ErrorBoundary, loading-spinner, todos variants)
- [ ] Add integration tests exercising Suspense/transition/optimistic flows
- [ ] Add Playwright E2E scenarios for vanlife and todos
- [ ] Set coverage thresholds and collect coverage in CI
- [ ] GitHub Actions workflow for PR checks (build, lint, test)

## 2) Performance and Profiling
- [ ] Create a performance-lab POC with measurable render workloads
- [ ] Demonstrate useMemo/useCallback/memo tradeoffs and anti-patterns
- [ ] Integrate why-did-you-render for selective components to highlight re-renders
- [ ] Add Profiler traces and analyze flamegraphs
- [ ] Compare RSC boundaries vs client-only for perf characteristics

## 3) Data Fetching Strategies
- [ ] Add TanStack Query examples (basic, mutations, infinite queries)
- [ ] Demonstrate Suspense mode in TanStack Query and non-Suspense
- [ ] Add SWR example with optimistic updates and revalidation
- [ ] Compare native fetch + server actions vs client cache libraries
- [ ] Show invalidation patterns and cache scoping in nested routes

## 4) Forms Deep Dive
- [ ] Integrate React Hook Form (RHF) with schema validation (Zod or Yup)
- [ ] Controlled vs uncontrolled performance comparison
- [ ] React 19 form-actions examples with progressive enhancement
- [ ] Form-level optimistic updates and error recovery patterns

## 5) SSR, RSC and Streaming
- [ ] Add a Vite SSR demo with streaming + Suspense
- [ ] Expand RSC demos: data fetching, error boundaries, and client handoff
- [ ] Show co-location patterns and server-driven navigation

## 6) State Management Gallery
- [ ] Add Zustand-based todo variant
- [ ] Add Jotai-based todo variant
- [ ] Add Recoil-based example
- [ ] Explore Signals-based store (e.g., Preact signals or React Canary signals) with an adapter
- [ ] Comparative guide: ergonomics, performance, and testability vs Context/Redux

## 7) Accessibility (a11y)
- [ ] Add ARIA-compliant compound components (menu, tabs, accordion with keyboard support)
- [ ] Focus management and roving tabindex examples
- [ ] Integrate jest-axe into unit tests
- [ ] Add Playwright axe scans in CI
- [ ] Create an accessibility checklist doc and apply to apps

## 8) Animations and Interactions
- [ ] Framer Motion demo for route/page transitions
- [ ] React 19 View Transitions API example and comparison to Framer
- [ ] Combine transitions with Suspense/optimistic updates for smooth UX

## 9) Security and Auth Hardening
- [ ] Full auth flow with refresh tokens and secure cookies
- [ ] CSRF protection considerations for server actions and forms
- [ ] Protected routes with data preloading and fallback UIs
- [ ] Error serialization and retry policies for failed requests

## 10) Tooling and Developer Experience
- [ ] Add Prettier, lint-staged, and Husky pre-commit hooks
- [ ] Expand ESLint rules and TypeScript strictness
- [ ] Generate API docs via TypeDoc from TSDoc comments
- [ ] Add Storybook with interaction tests (Storybook Test Runner)

## 11) Documentation Hub
- [ ] Build a docs site (Docusaurus or VitePress) with navigation for apps, features, patterns
- [ ] Populate feature docs: Suspense, transitions, actions/form-actions, optimistic updates, RSC
- [ ] Link to existing notes (SUSPENSE_ANALYSIS.md, pocs/react19-features/FEATURES.md)
- [ ] Add code snippets and diagrams where relevant

---

Tip: Keep this roadmap updated as features land. Each completed item should link to the relevant folder, PR, or doc page.