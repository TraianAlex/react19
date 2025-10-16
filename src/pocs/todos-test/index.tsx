import { Link, Outlet, useLocation } from 'react-router-dom';

const TodosTest: React.FC = () => {
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
                  isActive('todos-test/todos-basic') || isActive('todos-test')
                    ? 'active '
                    : ''
                }`}
              >
                <Link
                  to='todos-basic'
                  className={
                    isActive('todos-test/todos-basic') || isActive('todos-test')
                      ? 'text-white'
                      : ''
                  }
                >
                  Todos Basic
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-state1') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-state1'
                  className={
                    isActive('todos-test/todos-state1') ? 'text-white' : ''
                  }
                >
                  Todos state 1
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-state2') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-state2'
                  className={
                    isActive('todos-test/todos-state2') ? 'text-white' : ''
                  }
                >
                  Todos state 2
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-state3') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-state3'
                  className={
                    isActive('todos-test/todos-state3') ? 'text-white' : ''
                  }
                >
                  Todos state 3
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/game3') ? 'active' : ''
                }`}
              >
                <Link
                  to='game3'
                  className={isActive('todos-test/game3') ? 'text-white' : ''}
                >
                  Game 3
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/game4') ? 'active' : ''
                }`}
              >
                <Link
                  to='game4'
                  className={isActive('todos-test/game4') ? 'text-white' : ''}
                >
                  Game 4
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todo-context') ? 'active' : ''
                }`}
              >
                <Link
                  to='todo-context'
                  className={
                    isActive('todos-test/todo-context') ? 'text-white' : ''
                  }
                >
                  Todos Context
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-flux') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-flux'
                  className={
                    isActive('todos-test/todos-flux') ? 'text-white' : ''
                  }
                >
                  Todos Flux
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-redux') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-redux'
                  className={
                    isActive('todos-test/todos-redux') ? 'text-white' : ''
                  }
                >
                  Todos Redux
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

export default TodosTest;
