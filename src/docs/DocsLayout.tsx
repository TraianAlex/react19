import { Link, Outlet, useLocation } from 'react-router-dom';

const DocsLayout = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return (
      location.pathname === `/docs/${path}` ||
      location.pathname.startsWith(`/docs/${path}/`)
    );
  };

  return (
    <div className='container-fluid mt-5 pt-5'>
      <div className='row mb-3'>
        <div className='col'>
          <nav className='d-flex align-items-center gap-3 mb-3'>
            <div className='btn-group' role='group'>
              <Link
                to='react19-features'
                className={`btn btn-sm ${
                  isActive('react19-features')
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                }`}
              >
                React 19 Features
              </Link>
              <Link
                to='react-best-practices'
                className={`btn btn-sm ${
                  isActive('react-best-practices')
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                }`}
              >
                React Best Practices
              </Link>
              <Link
                to='frontend-best-practices'
                className={`btn btn-sm ${
                  isActive('frontend-best-practices')
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                }`}
              >
                Front-end Best Practices
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
