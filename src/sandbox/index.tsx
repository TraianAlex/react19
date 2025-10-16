import { Link, Outlet, useLocation } from 'react-router-dom';

const Sandbox: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === '/' + path;
  };

  return (
    <div className='container mt-5 pt-5'>
      <div className='row'>
        <div className='col'>
          <div className='card' style={{ width: '18rem' }}>
            <ul className='list-group list-group-flush'>
              <li
                className={`list-group-item ${
                  isActive('sandbox/playground') || isActive('sandbox')
                    ? 'active'
                    : ''
                }`}
              >
                <Link
                  to='playground'
                  className={
                    isActive('sandbox/playground') || isActive('sandbox')
                      ? 'text-white'
                      : ''
                  }
                >
                  Playground
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('sandbox/compound-components') ? 'active' : ''
                }`}
              >
                <Link
                  to='compound-components'
                  className={
                    isActive('sandbox/compound-components') ? 'text-white' : ''
                  }
                >
                  Compound Components
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('sandbox/flexible-compound-components')
                    ? 'active'
                    : ''
                }`}
              >
                <Link
                  to='flexible-compound-components'
                  className={
                    isActive('sandbox/flexible-compound-components')
                      ? 'text-white'
                      : ''
                  }
                >
                  Flexible Compound Components
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('sandbox/compound-components-simple') ? 'active' : ''
                }`}
              >
                <Link
                  to='compound-components-simple'
                  className={
                    isActive('sandbox/compound-components-simple')
                      ? 'text-white'
                      : ''
                  }
                >
                  Compound Components Simple
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('sandbox/increment-redux-hooks') ? 'active' : ''
                }`}
              >
                <Link
                  to='increment-redux-hooks'
                  className={
                    isActive('sandbox/increment-redux-hooks')
                      ? 'text-white'
                      : ''
                  }
                >
                  Increment Redux hooks
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('sandbox/game4') ? 'active' : ''
                }`}
              >
                <Link
                  to='game4'
                  className={isActive('sandbox/game4') ? 'text-white' : ''}
                >
                  Game 4
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('sandbox/game5') ? 'active' : ''
                }`}
              >
                <Link
                  to='game5'
                  className={isActive('sandbox/game5') ? 'text-white' : ''}
                >
                  Game 5
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('sandbox/game6') ? 'active' : ''
                }`}
              >
                <Link
                  to='game6'
                  className={isActive('sandbox/game6') ? 'text-white' : ''}
                >
                  Game 6
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

export default Sandbox;
