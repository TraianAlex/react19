import { Link, Outlet, useLocation } from 'react-router-dom';

const RscLayout = () => {
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
                  isActive('rsc/rsc-simple') || isActive('rsc') ? 'active ' : ''
                }`}
              >
                <Link
                  to='rsc-simple'
                  className={
                    isActive('rsc/rsc-simple') || isActive('rsc')
                      ? 'text-white'
                      : ''
                  }
                >
                  Simple RSC
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

export default RscLayout;
