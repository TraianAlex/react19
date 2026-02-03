import { Link, Outlet, useLocation } from 'react-router-dom';

const ReactBestPracticesLayout = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return (
      location.pathname === `/docs/${path}` ||
      location.pathname.startsWith(`/docs/${path}/`)
    );
  };

  const examples = [
    {
      path: 'react-best-practices/overview',
      label: 'Overview',
      section: 'main',
    },
    // State Architecture
    {
      path: 'react-best-practices/state-classify',
      label: '1. Classify State by Layer',
      section: 'state',
    },
    {
      path: 'react-best-practices/server-state',
      label: '2. Server State Management',
      section: 'state',
    },
    {
      path: 'react-best-practices/global-state',
      label: '3. Global Client State',
      section: 'state',
    },
    {
      path: 'react-best-practices/local-state',
      label: '4. Local Component State',
      section: 'state',
    },
    {
      path: 'react-best-practices/url-state',
      label: '5. URL State',
      section: 'state',
    },
    // Component Architecture
    {
      path: 'react-best-practices/container-presentational',
      label: '6. Container vs Presentational',
      section: 'component',
    },
    {
      path: 'react-best-practices/custom-hooks',
      label: '7. Custom Hooks',
      section: 'component',
    },
    {
      path: 'react-best-practices/component-boundaries',
      label: '8. Component Boundaries',
      section: 'component',
    },
    // Component Layer
    {
      path: 'react-best-practices/clean-jsx',
      label: '12. Clean JSX',
      section: 'layer',
    },
    {
      path: 'react-best-practices/fragments',
      label: '13. Fragment Usage',
      section: 'layer',
    },
    {
      path: 'react-best-practices/props-api',
      label: '14. Props API',
      section: 'layer',
    },
    {
      path: 'react-best-practices/prop-validation',
      label: '15. Prop Validation',
      section: 'layer',
    },
    {
      path: 'react-best-practices/compound-components',
      label: '16. Compound Components',
      section: 'layer',
    },
    // Performance
    {
      path: 'react-best-practices/measure-first',
      label: '17. Measure First',
      section: 'performance',
    },
    {
      path: 'react-best-practices/react-memo',
      label: '18. React.memo',
      section: 'performance',
    },
    {
      path: 'react-best-practices/code-splitting',
      label: '19. Code Splitting',
      section: 'performance',
    },
    {
      path: 'react-best-practices/dynamic-imports',
      label: '20. Dynamic Imports',
      section: 'performance',
    },
    // Code Quality
    {
      path: 'react-best-practices/error-boundaries',
      label: '27. Error Boundaries',
      section: 'quality',
    },
    {
      path: 'react-best-practices/defensive-programming',
      label: '28. Defensive Programming',
      section: 'quality',
    },
    {
      path: 'react-best-practices/loading-error-states',
      label: '29. Loading & Error States',
      section: 'quality',
    },
    {
      path: 'react-best-practices/type-safety',
      label: '30. Type Safety',
      section: 'quality',
    },
    {
      path: 'react-best-practices/generic-types',
      label: '31. Generic Types',
      section: 'quality',
    },
    // Accessibility
    {
      path: 'react-best-practices/semantic-html',
      label: '32. Semantic HTML',
      section: 'accessibility',
    },
    {
      path: 'react-best-practices/form-labels',
      label: '33. Form Labels',
      section: 'accessibility',
    },
    {
      path: 'react-best-practices/aria-attributes',
      label: '34. ARIA Attributes',
      section: 'accessibility',
    },
    {
      path: 'react-best-practices/focus-management',
      label: '35. Focus Management',
      section: 'accessibility',
    },
    {
      path: 'react-best-practices/focus-trap',
      label: '36. Focus Trap',
      section: 'accessibility',
    },
  ];

  return (
    <div className='container-fluid pt-2'>
      <div className='row d-flex gap-2'>
        <div className='col' style={{ flex: '0 0 auto', width: '18rem' }}>
          <div className='card'>
            <div className='card-header'>
              <h5 className='mb-0'>React Best Practices</h5>
            </div>
            <ul className='list-group list-group-flush'>
              {examples.map((example) => (
                <li
                  key={example.path}
                  className={`list-group-item ${
                    isActive(example.path) ? 'active' : ''
                  }`}
                >
                  <Link
                    to={example.path.replace('react-best-practices/', '')}
                    className={
                      isActive(example.path)
                        ? 'text-white text-decoration-none'
                        : 'text-decoration-none'
                    }
                  >
                    {example.label}
                  </Link>
                </li>
              ))}
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

export default ReactBestPracticesLayout;
