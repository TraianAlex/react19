import { UseHookDemo } from './use-hook-demo/UseHookDemo';
import { ActionsDemo } from './actions-demo/ActionsDemo';
import { OptimisticDemo } from './optimistic-demo/OptimisticDemo';
import { FormActionsDemo } from './form-actions-demo/FormActionsDemo';
import { SuspenseDemo } from './suspense-demo/SuspenseDemo';
import { ConcurrentDemo } from './concurrent-demo/ConcurrentDemo';

export type DemoType =
  | 'use-hook'
  | 'actions'
  | 'optimistic'
  | 'form-actions'
  | 'suspense'
  | 'concurrent';

interface DemoInfo {
  id: DemoType;
  title: string;
  description: string;
  component: React.ComponentType;
  features: string[];
}

export const demos: DemoInfo[] = [
  {
    id: 'use-hook',
    title: 'use() Hook',
    description:
      'New hook for consuming promises and context directly in components',
    component: UseHookDemo,
    features: [
      'Promise consumption',
      'Suspense integration',
      'Context alternative',
      'Concurrent features',
    ],
  },
  {
    id: 'actions',
    title: 'Actions',
    description: 'Server Actions and async form handling with built-in states',
    component: ActionsDemo,
    features: [
      'Server Actions',
      'Form handling',
      'Pending states',
      'Error handling',
    ],
  },
  {
    id: 'optimistic',
    title: 'Optimistic Updates',
    description:
      'useOptimistic hook for immediate UI updates with rollback capability',
    component: OptimisticDemo,
    features: [
      'Immediate updates',
      'Automatic rollback',
      'Better UX',
      'Error recovery',
    ],
  },
  {
    id: 'form-actions',
    title: 'Form Actions',
    description: 'Enhanced form handling with useActionState and useFormStatus',
    component: FormActionsDemo,
    features: [
      'useActionState',
      'useFormStatus',
      'Progressive enhancement',
      'Built-in validation',
    ],
  },
  {
    id: 'suspense',
    title: 'Suspense Improvements',
    description:
      'Better Suspense boundaries with error handling and nested loading',
    component: SuspenseDemo,
    features: [
      'Nested boundaries',
      'Error integration',
      'Concurrent loading',
      'Better performance',
    ],
  },
  {
    id: 'concurrent',
    title: 'Concurrent Features',
    description:
      'useTransition, useDeferredValue, and automatic batching for better performance',
    component: ConcurrentDemo,
    features: [
      'useTransition',
      'useDeferredValue',
      'Automatic batching',
      'Non-blocking updates',
    ],
  },
];
