import { Link, Outlet, useLocation } from 'react-router-dom';

const HooksLayout = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === '/' + path;
  };

  return (
    <div className='container-fluid mt-5 pt-5'>
      <div className='row d-flex gap-2'>
        <div className='col' style={{ flex: '0 0 auto', width: '18rem' }}>
          <div className='card'>
            <ul className='list-group list-group-flush'>
              <li
                className={`list-group-item ${
                  isActive('hooks/use-hook-notes-app') || isActive('hooks')
                    ? 'active '
                    : ''
                }`}
              >
                <Link
                  to='use-hook-notes-app'
                  className={
                    isActive('hooks/use-hook-notes-app') || isActive('hooks')
                      ? 'text-white'
                      : ''
                  }
                >
                  Use Hook Notes App (Example 2)
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('hooks/parallel-dashboard') ? 'active ' : ''
                }`}
              >
                <Link
                  to='parallel-dashboard'
                  className={
                    isActive('hooks/parallel-dashboard') ? 'text-white' : ''
                  }
                >
                  Parallel Dashboard (Example 3)
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('hooks/context-app') ? 'active ' : ''
                }`}
              >
                <Link
                  to='context-app'
                  className={isActive('hooks/context-app') ? 'text-white' : ''}
                >
                  Context App (Example 5)
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('hooks/progressive-note') ? 'active ' : ''
                }`}
              >
                <Link
                  to='progressive-note/1'
                  className={
                    isActive('hooks/progressive-note') ? 'text-white' : ''
                  }
                >
                  Progressive Note App (Example 6)
                </Link>
              </li>
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

export default HooksLayout;
