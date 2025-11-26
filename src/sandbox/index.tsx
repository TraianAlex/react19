import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sandbox = () => {
  const location = useLocation();
  const [isCompoundComponentsOpen, setIsCompoundComponentsOpen] =
    useState(false);

  const isCompoundComponentsActive = () => {
    return (
      isActive('sandbox/compound-components') ||
      isActive('sandbox/flexible-compound-components') ||
      isActive('sandbox/compound-components-simple')
    );
  };

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
                  onClick={() => setIsCompoundComponentsOpen(false)}
                >
                  Playground
                </Link>
              </li>
              <li className='list-group-item p-0'>
                <button
                  className={`list-group-item list-group-item-action w-100 border-0 ${
                    !isCompoundComponentsOpen && isCompoundComponentsActive()
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setIsCompoundComponentsOpen(!isCompoundComponentsOpen)
                  }
                  style={{
                    textAlign: 'left',
                  }}
                >
                  Compound Components
                  <span className='float-end'>
                    {isCompoundComponentsOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`collapse ${
                    isCompoundComponentsOpen ? 'show' : ''
                  }`}
                >
                  <ul className='list-group list-group-flush'>
                    <li
                      className={`list-group-item ps-4 ${
                        isActive('sandbox/compound-components') ? 'active' : ''
                      }`}
                    >
                      <Link
                        to='compound-components'
                        className={
                          isActive('sandbox/compound-components')
                            ? 'text-white'
                            : ''
                        }
                        onClick={() => setIsCompoundComponentsOpen(true)}
                      >
                        Compound Components
                      </Link>
                    </li>
                    <li
                      className={`list-group-item ps-4 ${
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
                        onClick={() => setIsCompoundComponentsOpen(true)}
                      >
                        Flexible Compound Components
                      </Link>
                    </li>
                    <li
                      className={`list-group-item ps-4 ${
                        isActive('sandbox/compound-components-simple')
                          ? 'active'
                          : ''
                      }`}
                    >
                      <Link
                        to='compound-components-simple'
                        className={
                          isActive('sandbox/compound-components-simple')
                            ? 'text-white'
                            : ''
                        }
                        onClick={() => setIsCompoundComponentsOpen(true)}
                      >
                        Compound Components Simple
                      </Link>
                    </li>
                  </ul>
                </div>
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
                  onClick={() => setIsCompoundComponentsOpen(false)}
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
                  onClick={() => setIsCompoundComponentsOpen(false)}
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
                  onClick={() => setIsCompoundComponentsOpen(false)}
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
                  onClick={() => setIsCompoundComponentsOpen(false)}
                >
                  Game 6
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col flex-shrink-1 flex-grow-1 flex-basis-0'>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
