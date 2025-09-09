import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../pocs/auth/state/store';
import {
  getUserProfileThunk,
  logoutUserThunk,
} from '../../pocs/auth/state/authSlice';

export const NavigationBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUserProfileThunk());
    }
  }, [dispatch, isAuthenticated, user]);

  const handleLogout = () => {
    dispatch(logoutUserThunk()).then(() => {
      navigate('/login');
    });
  };

  return (
    <>
      <nav
        className='navbar fixed-top navbar-expand-lg bg-body-tertiary'
        data-bs-theme='dark'
      >
        <div className='container-fluid'>
          <a
            className='navbar-brand'
            data-bs-toggle='offcanvas'
            href='#offcanvasExample'
            role='button'
            aria-controls='offcanvasExample'
          >
            Components
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/' className='nav-link active' aria-current='page'>
                  Home
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  POCs
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <Link className='dropdown-item' to='profile'>
                      Auth
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Apps
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <Link className='dropdown-item' to='todos'>
                      Todos
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-item' to='watch-list'>
                      WatchList
                    </Link>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <a className='nav-link disabled' aria-disabled='true'>
                  Disabled
                </a>
              </li>
            </ul>
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button className='btn btn-outline-success' type='submit'>
                Search
              </button>
            </form>
            <ul className='navbar-nav'>
              {isAuthenticated && (
                <li className='nav-item'>
                  <Link
                    to='profile'
                    className='nav-link active'
                    aria-current='page'
                  >
                    Profile
                  </Link>
                </li>
              )}
              {isAuthenticated && user ? (
                <button
                  className='btn btn-outline-light'
                  type='submit'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <li className='nav-item'>
                  <Link
                    to='login'
                    className='nav-link active'
                    aria-current='page'
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div
        className='offcanvas offcanvas-start'
        tab-index='-1'
        id='offcanvasExample'
        aria-labelledby='offcanvasExampleLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasExampleLabel'>
            Components
          </h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <div>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </div>
          <div className='dropdown mt-3'>
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
            >
              Dropdown button
            </button>
            <ul className='dropdown-menu'>
              <li>
                <a className='dropdown-item' href='#'>
                  Action
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Another action
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='#'>
                  Something else here
                </a>
              </li>
            </ul>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='loading-spinner' className='nav-link active' aria-current='page'>
                  Loading Spinner
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
