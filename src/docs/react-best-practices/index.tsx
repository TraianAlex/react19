import { Link } from 'react-router-dom';

const ReactBestPracticesIndex = () => {
  const examples = [
    {
      category: 'State Architecture',
      items: [
        { path: 'state-classify', title: '1. Classify State by Layer', description: 'Demonstrates proper state classification: server, global, local, and URL state.' },
        { path: 'server-state', title: '2. Server State Management', description: 'Using React Query for server state instead of useState.' },
        { path: 'global-state', title: '3. Global Client State', description: 'When and how to use global state vs local state.' },
        { path: 'local-state', title: '4. Local Component State', description: 'Proper use of local component state with useState.' },
        { path: 'url-state', title: '5. URL State', description: 'Managing state in URL for shareable, bookmarkable views.' },
      ],
    },
    {
      category: 'Component Architecture',
      items: [
        { path: 'container-presentational', title: '6. Container vs Presentational', description: 'Separating business logic from presentation components.' },
        { path: 'custom-hooks', title: '7. Custom Hooks', description: 'Extracting reusable logic into well-designed custom hooks.' },
        { path: 'component-boundaries', title: '8. Component Boundaries', description: 'Creating proper boundaries between components.' },
      ],
    },
    {
      category: 'Component Layer',
      items: [
        { path: 'clean-jsx', title: '12. Clean JSX', description: 'Writing readable JSX with named functions instead of inline handlers.' },
        { path: 'fragments', title: '13. Fragment Usage', description: 'Using fragments to avoid unnecessary wrapper divs.' },
        { path: 'props-api', title: '14. Props API', description: 'Designing component APIs with prop destructuring and defaults.' },
        { path: 'prop-validation', title: '15. Prop Validation', description: 'Using PropTypes and TypeScript for prop validation.' },
        { path: 'compound-components', title: '16. Compound Components', description: 'Building flexible UI patterns with compound components.' },
      ],
    },
    {
      category: 'Performance Optimization',
      items: [
        { path: 'measure-first', title: '17. Measure First', description: 'Using React DevTools Profiler before optimizing.' },
        { path: 'react-memo', title: '18. React.memo', description: 'Using React.memo for components with stable props.' },
        { path: 'code-splitting', title: '19. Code Splitting', description: 'Splitting code at feature boundaries with lazy loading.' },
        { path: 'dynamic-imports', title: '20. Dynamic Imports', description: 'Dynamically importing heavy libraries when needed.' },
      ],
    },
    {
      category: 'Code Quality',
      items: [
        { path: 'error-boundaries', title: '27. Error Boundaries', description: 'Isolating errors at component level with error boundaries.' },
        { path: 'defensive-programming', title: '28. Defensive Programming', description: 'Handling imperfect data gracefully with optional chaining.' },
        { path: 'loading-error-states', title: '29. Loading & Error States', description: 'Treating loading and error states as first-class UI concerns.' },
        { path: 'type-safety', title: '30. Type Safety', description: 'Using TypeScript to express intent and catch errors early.' },
        { path: 'generic-types', title: '31. Generic Types', description: 'Creating reusable patterns with generic types.' },
      ],
    },
    {
      category: 'Accessibility',
      items: [
        { path: 'semantic-html', title: '32. Semantic HTML', description: 'Using semantic HTML elements for built-in accessibility.' },
        { path: 'form-labels', title: '33. Form Labels', description: 'Properly associating form inputs with labels.' },
        { path: 'aria-attributes', title: '34. ARIA Attributes', description: 'Using ARIA when HTML semantics aren\'t enough.' },
        { path: 'focus-management', title: '35. Focus Management', description: 'Managing focus in modals and interactive components.' },
        { path: 'focus-trap', title: '36. Focus Trap', description: 'Creating reusable focus trap hooks for modals.' },
      ],
    },
  ];

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='mb-4'>React Best Practices Examples</h1>
          <p className='lead mb-4'>
            This collection demonstrates React best practices through working examples.
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
              Some practices like <strong>Code Organization</strong>, <strong>Naming Conventions</strong>, 
              and <strong>Event Handler Naming</strong> are applied throughout all examples rather than 
              having dedicated demos. <strong>Testing Strategies</strong> and <strong>DevOps</strong> 
              practices are configuration-based and don't require runtime examples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactBestPracticesIndex;
