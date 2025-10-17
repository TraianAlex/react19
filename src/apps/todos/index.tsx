import { Link, Outlet, useLocation } from 'react-router-dom';

const Todos: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === '/' + path;
  };

  return (
    <div className='container-fluid mt-5 pt-5'>
      <div className='row'>
        <div className='col'>
          <div className='card' style={{ width: '18rem' }}>
            <ul className='list-group list-group-flush'>
              <li
                className={`list-group-item ${
                  isActive('todos/todo1') || isActive('todos') ? 'active' : ''
                }`}
              >
                <Link
                  to='todo1'
                  className={
                    isActive('todos/todo1') || isActive('todos')
                      ? 'text-white'
                      : ''
                  }
                >
                  Todo 1
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos/todo2') ? 'active' : ''
                }`}
              >
                <Link
                  to='todo2'
                  className={isActive('todos/todo2') ? 'text-white' : ''}
                >
                  Todo 2
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos/todo3') ? 'active' : ''
                }`}
              >
                <Link
                  to='todo3'
                  className={isActive('todos/todo3') ? 'text-white' : ''}
                >
                  Todo 3
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

export default Todos;
