# Task Tracker

A small Next.js + TypeScript task tracker demonstrating client-side state, filtering, and local persistence.

## Setup instructions

- Install dependencies:

```bash
npm install
```

- Run in development:

```bash
npm run dev
```

- Build and run production:

```bash
npm run build
npm run start
```

- Run unit tests (Vitest):

```bash
npx vitest
```

Note: If Vitest cannot resolve the `@/` path alias, add an alias to `vitest.config.ts` or use `vite-tsconfig-paths`.

## Architectural decisions

- **Folder structure**
  - `app/`: Next.js routes and top-level pages.
  - `components/`: Reusable UI components (shared fields, modal, etc.).
  - `modules/tasks/`: Domain code for tasks — `components/`, `hooks/`, `schema/`, `services/`, `store/`, and `utils.ts`.
  - `lib/`: Small cross-cutting utilities such as `lib/storage.ts`.

- **State management approach**
  - `zustand` is used for client state (`modules/tasks/store/useTaskStore.ts`).
  - Why: lightweight and minimal boilerplate for small-to-medium apps. It keeps components decoupled from persistence logic while offering simple, performant updates and selective subscriptions.

- **Data flow**
  - Source of truth is the `useTaskStore` store holding `tasks` and `filters`.
  - Persistence is handled by `taskService` which reads/writes via `lib/storage.ts` (localStorage).
  - UI components dispatch store actions (`addTask`, `updateTask`, `setFilters`) → store updates → persistence.

- **Component organization**
  - Task domain UI lives under `modules/tasks/components/` (e.g., `TaskBoard`, `TaskCard`, `TaskFormModal`) to keep domain logic grouped.
  - Shared controls (form fields, modal) live in `components/common/` for reuse.
  - Business logic (filtering, small utilities) is implemented in `modules/tasks/utils.ts` and tested independently.

## What I would improve with more time

- Increase test coverage: add unit tests for utilities (`filterTasks`, `extractValues`, `getTaskLabel`), store behaviors (mocking `taskService`), and integration tests for component+store flows. Add CI to run tests.
- Make the persistence layer pluggable and add optional server sync (API) instead of direct `localStorage` access.
- Improve error handling and user-facing feedback for storage or service failures.
- Accessibility and polish: keyboard navigation, ARIA attributes, and visual refinements.
- Performance: memoize heavy transforms, virtualize long lists, and add profiling.
- Types: further tighten TypeScript types and add exhaustive checks for enums (status, priority).

---

If you want, I can also add the Vitest alias fix to `vitest.config.ts` so tests can resolve `@/` imports, or run and confirm tests locally. Which would you prefer next?
