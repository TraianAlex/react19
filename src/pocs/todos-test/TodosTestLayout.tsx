import { Link, Outlet, useLocation } from 'react-router-dom';

const TodosTestLayout = () => {
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
                  Todos state 3 the last
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-actions') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-actions'
                  className={
                    isActive('todos-test/todos-actions') ? 'text-white' : ''
                  }
                >
                  Todos Actions
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-server-actions') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-server-actions'
                  className={
                    isActive('todos-test/todos-server-actions')
                      ? 'text-white'
                      : ''
                  }
                >
                  Server fn with Form Actions
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-action-state') ? 'active' : ''
                }`}
              >
                <Link
                  to='todos-action-state'
                  className={
                    isActive('todos-test/todos-action-state')
                      ? 'text-white'
                      : ''
                  }
                >
                  Todos useActionState
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
              <li
                className={`list-group-item ${
                  isActive('todos-test/todos-context-fakeapi-localstorage')
                    ? 'active'
                    : ''
                }`}
              >
                <Link
                  to='todos-context-fakeapi-localstorage'
                  className={
                    isActive('todos-test/todos-context-fakeapi-localstorage')
                      ? 'text-white'
                      : ''
                  }
                >
                  Todos Context FakeAPI LocalStorage
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

export default TodosTestLayout;
