import { Link, Outlet, useLocation } from 'react-router-dom';

const TicTacToeLayout: React.FC = () => {
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
                  isActive('tic-tac-toe/star-match') || isActive('tic-tac-toe')
                    ? 'active'
                    : ''
                }`}
              >
                <Link
                  to='star-match'
                  className={
                    isActive('tic-tac-toe/star-match') ||
                    isActive('tic-tac-toe')
                      ? 'text-white'
                      : ''
                  }
                >
                  Star Match
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('tic-tac-toe/game1') ? 'active' : ''
                }`}
              >
                <Link
                  to='game1'
                  className={isActive('tic-tac-toe/game1') ? 'text-white' : ''}
                >
                  Tic Tac Toe 1
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('tic-tac-toe/game2') ? 'active' : ''
                }`}
              >
                <Link
                  to='game2'
                  className={isActive('tic-tac-toe/game2') ? 'text-white' : ''}
                >
                  Tic Tac Toe 2
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('tic-tac-toe/game3') ? 'active' : ''
                }`}
              >
                <Link
                  to='game3'
                  className={isActive('tic-tac-toe/game3') ? 'text-white' : ''}
                >
                  Tic Tac Toe 3
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('tic-tac-toe/game4') ? 'active' : ''
                }`}
              >
                <Link
                  to='game4'
                  className={isActive('tic-tac-toe/game4') ? 'text-white' : ''}
                >
                  Tic Tac Toe 4
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('tic-tac-toe/game5') ? 'active' : ''
                }`}
              >
                <Link
                  to='game5'
                  className={isActive('tic-tac-toe/game5') ? 'text-white' : ''}
                >
                  Tic Tac Toe 5
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  isActive('tic-tac-toe/game6') ? 'active' : ''
                }`}
              >
                <Link
                  to='game6'
                  className={isActive('tic-tac-toe/game6') ? 'text-white' : ''}
                >
                  Tic Tac Toe 6
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

export default TicTacToeLayout;
