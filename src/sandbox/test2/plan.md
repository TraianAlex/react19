# ToDo App Implementation Plan: Hooks + Reducer + Context

**Context:**
The objective is to build a minimal ToDo list application within the `Sandbox/test2` directory. This implementation serves as a demonstration of advanced state management patterns in React. The core principle is separating concerns: all state mutation logic must live in a reducer (managed by a Context Provider), all data access and business logic must be abstracted into a custom hook, and the UI must consume this hook/context.

**Problem Addressed:**
This pattern ensures that the UI components (presentation layer) are highly decoupled from the state management implementation (logic layer), leading to more testable and maintainable code, which is a common requirement for complex feature additions.

**Intended Outcome:**
A functional ToDo list capable of adding, deleting, and marking tasks as complete, styled entirely with React-Bootstrap, and structured according to modern React patterns (Hooks/Context/Reducer).

**Files to be Created/Modified:**
1.  `Sandbox/test2/TodoContext.tsx`: This file will house the Context definition, the reducer function (`todoReducer`), and the Context Provider component (`TodoProvider`).
2.  `Sandbox/test2/useTodo.ts`: This file will contain the custom hook (`useTodo`) responsible for reading the state and providing all actions (`addTodo`, `toggleTodo`, `deleteTodo`) to the consuming components. It will consume the context created in `TodoContext.tsx`.
3.  `Sandbox/test2/index.tsx`: This will be the main application component. It will wrap the `TodoProvider` and render the main UI component, consuming the `useTodo` hook.

**Implementation Steps:**

**Phase 1: State Management Core (`TodoContext.tsx`)**
1.  Define the initial state structure (array of todo items).
2.  Define the `todoReducer(state, action)` function that handles 'ADD', 'TOGGLE', and 'DELETE' actions immutably.
3.  Create the `TodosContext` and the `TodoProvider` component, setting the state via `useReducer` and wrapping the app root.

**Phase 2: Action Abstraction (`useTodo.ts`)**
1.  Create the custom hook `useTodo()`.
2.  This hook will utilize `useContext` to access the state and dispatch function from `TodosContext`.
3.  It will expose cleaner, action-oriented functions (e.g., `addTodo(text: string)`, `toggleTodo(id: string)`) to simplify component usage.

**Phase 3: UI Assembly (`index.tsx`)**
1.  Wrap the entire application structure in `<TodoProvider>`.
2.  Use React-Bootstrap components (`Container`, `Row`, `Card`, `Button`, etc.) for layout and styling.
3.  Call the `useTodo()` hook to get state and actions.
4.  Render the input field (for adding tasks) and map over the state to render individual todo items, making sure each button (delete/toggle) correctly calls the dispatched action via the hook.
