import { Link } from 'react-router-dom';

const FrontendBestPracticesIndex = () => {
  const examples = [
    {
      category: 'State Architecture',
      items: [
        { path: 'local-vs-global-state', title: '1. Separate Local vs Global State', description: 'Use local state for component-specific data and global state only for shared data.' },
        { path: 'normalize-state', title: '2. Normalize State Structure', description: 'Keep state flat and normalized to make updates simpler.' },
        { path: 'state-machines', title: '3. Use State Machines for Complex State', description: 'Use state machines to make complex state transitions explicit.' },
      ],
    },
    {
      category: 'Component Design Patterns',
      items: [
        { path: 'container-presentational', title: '4. Container/Presentational Pattern', description: 'Separate data logic from presentation components.' },
        { path: 'compound-components', title: '5. Compound Components', description: 'Create components that work together as a unit while maintaining flexibility.' },
        { path: 'render-props', title: '6. Render Props Pattern', description: 'Share code between components using a prop whose value is a function.' },
      ],
    },
    {
      category: 'Performance Optimization',
      items: [
        { path: 'memoization', title: '7. Memoization Strategy', description: 'Use React.memo, useMemo, and useCallback appropriately.' },
        { path: 'code-splitting', title: '8. Code Splitting and Lazy Loading', description: 'Split code into smaller chunks and load them on demand.' },
        { path: 'virtualization', title: '9. Virtualization for Long Lists', description: 'Use virtualization for rendering large lists to maintain performance.' },
      ],
    },
    {
      category: 'Error Handling',
      items: [
        { path: 'error-boundaries', title: '10. Error Boundaries', description: 'Use Error Boundaries to catch errors and display fallback UI.' },
        { path: 'async-error-handling', title: '11. Async Error Handling', description: 'Always handle errors in async operations and provide user feedback.' },
        { path: 'request-cancellation', title: '12. Request Cancellation', description: 'Cancel in-flight requests to prevent memory leaks and race conditions.' },
      ],
    },
    {
      category: 'Code Organization',
      items: [
        { path: 'custom-hooks', title: '14. Custom Hooks for Logic Reuse', description: 'Extract reusable logic into custom hooks.' },
        { path: 'constants', title: '15. Constants and Configuration', description: 'Extract magic numbers and strings into constants.' },
      ],
    },
    {
      category: 'Type Safety',
      items: [
        { path: 'strict-typescript', title: '16. Strict TypeScript Configuration', description: 'Use strict TypeScript settings and avoid any type.' },
        { path: 'discriminated-unions', title: '17. Discriminated Unions', description: 'Use discriminated unions for type-safe state management.' },
      ],
    },
    {
      category: 'Accessibility',
      items: [
        { path: 'semantic-html', title: '18. Semantic HTML', description: 'Use semantic HTML elements for better accessibility and SEO.' },
        { path: 'aria-attributes', title: '19. ARIA Attributes', description: 'Use ARIA attributes when semantic HTML isn\'t sufficient.' },
        { path: 'keyboard-navigation', title: '20. Keyboard Navigation', description: 'Ensure all interactive elements are keyboard accessible.' },
      ],
    },
    {
      category: 'API Integration',
      items: [
        { path: 'api-client', title: '23. Centralized API Client', description: 'Create a centralized API client with consistent error handling.' },
        { path: 'interceptors', title: '24. Request/Response Interceptors', description: 'Use interceptors for common concerns like authentication.' },
      ],
    },
    {
      category: 'Code Reusability',
      items: [
        { path: 'hoc', title: '25. Higher-Order Components (HOCs)', description: 'Use HOCs to share logic between components.' },
        { path: 'composition', title: '26. Composition Over Inheritance', description: 'Prefer composition and component composition over inheritance.' },
      ],
    },
  ];

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='mb-4'>Frontend Best Practices Examples</h1>
          <p className='lead mb-4'>
            This collection demonstrates frontend best practices through working examples.
            Each example includes both the problematic approach and the recommended solution.
          </p>

          {examples.map((category) => (
            <div key={category.category} className='mb-5'>
              <h2 className='h3 mb-3 border-bottom pb-2'>{category.category}</h2>
              <div className='row g-3'>
                {category.items.map((item) => (
                  <div key={item.path} className='col-md-6 col-lg-4'>
                    <div className='card h-100'>
                      <div className='card-body'>
                        <h5 className='card-title'>{item.title}</h5>
                        <p className='card-text text-muted small'>{item.description}</p>
                        <Link
                          to={item.path}
                          className='btn btn-primary btn-sm'
                        >
                          View Example
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className='alert alert-info mt-4'>
            <h5 className='alert-heading'>Note</h5>
            <p className='mb-0'>
              Some practices like <strong>Feature-Based Folder Structure</strong> (#13), 
              <strong>Testing Strategies</strong> (#21-22), <strong>Environment Variables</strong> (#27),
              <strong>Naming Conventions</strong> (#28), and <strong>Documentation</strong> (#29) 
              are applied throughout all examples rather than having dedicated demos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendBestPracticesIndex;
