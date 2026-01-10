import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UseHookDemo } from './use-hook-demo/UseHookDemo';
import { ActionsDemo } from './actions-demo/ActionsDemo';
import { OptimisticDemo } from './optimistic-demo/OptimisticDemo';
import { FormActionsDemo } from './form-actions-demo/FormActionsDemo';
import { SuspenseDemo } from './suspense-demo/SuspenseDemo';
import { ConcurrentDemo } from './concurrent-demo/ConcurrentDemo';

type DemoType =
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

const demos: DemoInfo[] = [
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

export default function React19FeaturesApp() {
  const [selectedDemo, setSelectedDemo] = useState<DemoType>('use-hook');
  const [showOverview, setShowOverview] = useState(true);

  const currentDemo = demos.find((demo) => demo.id === selectedDemo);
  const CurrentComponent = currentDemo?.component;

  if (showOverview) {
    return (
      <div className='container-fluid'>
        <div className='row mb-3 mt-4'>
          <div className='col'>
            <nav aria-label='breadcrumb'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/' className='text-decoration-none'>
                    Home
                  </Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  React 19+ Features
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className='row mb-4'>
          <div className='col'>
            <h1 className='h3 mb-3'>React 19+ Features Demo Collection</h1>
            <p className='lead text-muted mb-4'>
              Explore the latest React 19 features through interactive
              demonstrations. Each demo showcases specific capabilities with
              practical examples.
            </p>

            <div className='d-flex gap-2 mb-4'>
              <button
                className='btn btn-outline-secondary btn-sm'
                onClick={() => setShowOverview(false)}
              >
                Go to Demos →
              </button>
            </div>
          </div>
        </div>

        <div className='row'>
          {demos.map((demo) => (
            <div key={demo.id} className='col-lg-6 mb-4'>
              <div className='card h-100'>
                <div className='card-body'>
                  <h5 className='card-title'>{demo.title}</h5>
                  <p className='card-text text-muted'>{demo.description}</p>

                  <div className='mb-3'>
                    <h6 className='small text-muted mb-2'>Key Features:</h6>
                    <div className='d-flex flex-wrap gap-1'>
                      {demo.features.map((feature) => (
                        <span
                          key={feature}
                          className='badge bg-light text-dark small'
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className='btn btn-primary btn-sm'
                    onClick={() => {
                      setSelectedDemo(demo.id);
                      setShowOverview(false);
                    }}
                  >
                    Try {demo.title} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='row mt-4'>
          <div className='col'>
            <div className='alert alert-info'>
              <h5 className='alert-heading'>About React 19</h5>
              <p className='mb-3'>
                React 19 introduces several groundbreaking features that improve
                developer experience and application performance:
              </p>
              <div className='row'>
                <div className='col-md-6'>
                  <ul className='small mb-0'>
                    <li>
                      <strong>Actions:</strong> Built-in async form handling
                    </li>
                    <li>
                      <strong>use() Hook:</strong> Promise and context
                      consumption
                    </li>
                    <li>
                      <strong>useOptimistic:</strong> Optimistic UI updates
                    </li>
                  </ul>
                </div>
                <div className='col-md-6'>
                  <ul className='small mb-0'>
                    <li>
                      <strong>Form Enhancements:</strong> useActionState &
                      useFormStatus
                    </li>
                    <li>
                      <strong>Suspense Improvements:</strong> Better error
                      handling
                    </li>
                    <li>
                      <strong>Server Components:</strong> Enhanced SSR
                      capabilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <h6 className='card-title'>Setup Requirements</h6>
                <div className='row'>
                  <div className='col-md-6'>
                    <strong>For most demos:</strong>
                    <ul className='small mb-0'>
                      <li>React 19.2.3+ (✓ Installed)</li>
                      <li>Internet connection for JSONPlaceholder API</li>
                      <li>Bootstrap 5 for styling (✓ Installed)</li>
                    </ul>
                  </div>
                  <div className='col-md-6'>
                    <strong>For Optimistic Updates demo:</strong>
                    <ul className='small mb-0'>
                      <li>json-server running on localhost:4000</li>
                      <li>
                        Run:{' '}
                        <code>npx json-server --watch db.json --port 4000</code>
                      </li>
                      <li>Or use the existing setup if available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid'>
      <div className='row mb-2 mt-4'>
        <div className='col'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb mb-2'>
              <li className='breadcrumb-item'>
                <Link to='/' className='text-decoration-none'>
                  Home
                </Link>
              </li>
              <li className='breadcrumb-item'>
                <button
                  className='btn btn-link p-0 text-decoration-none'
                  onClick={() => setShowOverview(true)}
                >
                  React 19+ Features
                </button>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                {currentDemo?.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col'>
          <nav className='d-flex align-items-center gap-3 mb-3'>
            <button
              className='btn btn-outline-secondary btn-sm'
              onClick={() => setShowOverview(true)}
            >
              ← Overview
            </button>

            <div className='btn-group' role='group'>
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  type='button'
                  className={`btn btn-sm ${
                    selectedDemo === demo.id
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => setSelectedDemo(demo.id)}
                >
                  {demo.title}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          {CurrentComponent ? <CurrentComponent key={selectedDemo} /> : null}
        </div>
      </div>
    </div>
  );
}
