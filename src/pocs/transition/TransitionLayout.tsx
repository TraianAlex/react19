import { Link, Outlet, useLocation } from 'react-router-dom';

const TransitionLayout = () => {
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
                  isActive('transition/transition-tabs') ||
                  isActive('transition')
                    ? 'active '
                    : ''
                }`}
              >
                <Link
                  to='transition-tabs'
                  className={
                    isActive('transition/transition-tabs') ||
                    isActive('transition')
                      ? 'text-white'
                      : ''
                  }
                >
                  Transition Tabs with delay
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('transition/transition-optimistic') ? 'active ' : ''
                }`}
              >
                <Link
                  to='transition-optimistic'
                  className={
                    isActive('transition/transition-optimistic')
                      ? 'text-white'
                      : ''
                  }
                >
                  Transition Tabs with optimistic
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('transition/transition-suspense') ? 'active ' : ''
                }`}
              >
                <Link
                  to='transition-suspense'
                  className={
                    isActive('transition/transition-suspense')
                      ? 'text-white'
                      : ''
                  }
                >
                  Transition Tabs with suspense
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

export default TransitionLayout;
