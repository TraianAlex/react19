import { Link, Outlet, useLocation } from 'react-router-dom';

const FrontendBestPracticesLayout = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === 'frontend-best-practices') {
      return location.pathname === '/frontend-best-practices';
    }
    const routePath = path.replace('frontend-best-practices/', '');
    return location.pathname === `/frontend-best-practices/${routePath}`;
  };

  const examples = [
    { path: 'frontend-best-practices', label: 'Overview', section: 'main' },
    // State Architecture
    { path: 'frontend-best-practices/local-vs-global-state', label: '1. Local vs Global State', section: 'state' },
    { path: 'frontend-best-practices/normalize-state', label: '2. Normalize State Structure', section: 'state' },
    { path: 'frontend-best-practices/state-machines', label: '3. State Machines', section: 'state' },
    // Component Design Patterns
    { path: 'frontend-best-practices/container-presentational', label: '4. Container/Presentational', section: 'component' },
    { path: 'frontend-best-practices/compound-components', label: '5. Compound Components', section: 'component' },
    { path: 'frontend-best-practices/render-props', label: '6. Render Props', section: 'component' },
    // Performance
    { path: 'frontend-best-practices/memoization', label: '7. Memoization Strategy', section: 'performance' },
    { path: 'frontend-best-practices/code-splitting', label: '8. Code Splitting', section: 'performance' },
    { path: 'frontend-best-practices/virtualization', label: '9. Virtualization', section: 'performance' },
    // Error Handling
    { path: 'frontend-best-practices/error-boundaries', label: '10. Error Boundaries', section: 'error' },
    { path: 'frontend-best-practices/async-error-handling', label: '11. Async Error Handling', section: 'error' },
    { path: 'frontend-best-practices/request-cancellation', label: '12. Request Cancellation', section: 'error' },
    // Code Organization
    { path: 'frontend-best-practices/custom-hooks', label: '14. Custom Hooks', section: 'organization' },
    { path: 'frontend-best-practices/constants', label: '15. Constants & Config', section: 'organization' },
    // Type Safety
    { path: 'frontend-best-practices/strict-typescript', label: '16. Strict TypeScript', section: 'type' },
    { path: 'frontend-best-practices/discriminated-unions', label: '17. Discriminated Unions', section: 'type' },
    // Accessibility
    { path: 'frontend-best-practices/semantic-html', label: '18. Semantic HTML', section: 'accessibility' },
    { path: 'frontend-best-practices/aria-attributes', label: '19. ARIA Attributes', section: 'accessibility' },
    { path: 'frontend-best-practices/keyboard-navigation', label: '20. Keyboard Navigation', section: 'accessibility' },
    // API Integration
    { path: 'frontend-best-practices/api-client', label: '23. Centralized API Client', section: 'api' },
    { path: 'frontend-best-practices/interceptors', label: '24. Request/Response Interceptors', section: 'api' },
    // Code Reusability
    { path: 'frontend-best-practices/hoc', label: '25. Higher-Order Components', section: 'reusability' },
    { path: 'frontend-best-practices/composition', label: '26. Composition', section: 'reusability' },
  ];

  const sections = {
    main: 'Main',
    state: 'State Architecture',
    component: 'Component Design',
    performance: 'Performance',
    error: 'Error Handling',
    organization: 'Code Organization',
    type: 'Type Safety',
    accessibility: 'Accessibility',
    api: 'API Integration',
    reusability: 'Code Reusability',
  };

  const groupedExamples = examples.reduce((acc, example) => {
    if (!acc[example.section]) {
      acc[example.section] = [];
    }
    acc[example.section].push(example);
    return acc;
  }, {} as Record<string, typeof examples>);

  return (
    <div className='container-fluid mt-5 pt-5'>
      <div className='row d-flex gap-2'>
        <div className='col' style={{ flex: '0 0 auto', width: '18rem' }}>
          <div className='card'>
            <div className='card-header'>
              <h5 className='mb-0'>Frontend Best Practices</h5>
            </div>
            <ul className='list-group list-group-flush'>
              {Object.entries(groupedExamples).map(([section, items]) => [
                <li key={`section-${section}`} className='list-group-item bg-light'>
                  <strong className='text-muted'>{sections[section as keyof typeof sections]}</strong>
                </li>,
                ...items.map((example) => (
                  <li
                    key={example.path}
                    className={`list-group-item ${
                      isActive(example.path) ? 'active' : ''
                    }`}
                  >
                    <Link
                      to={example.path.replace('frontend-best-practices/', '')}
                      className={
                        isActive(example.path)
                          ? 'text-white text-decoration-none'
                          : 'text-decoration-none'
                      }
                    >
                      {example.label}
                    </Link>
                  </li>
                )),
              ]).flat()}
            </ul>
          </div>
        </div>
        <div className='col'>
          <div className='mt-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendBestPracticesLayout;
