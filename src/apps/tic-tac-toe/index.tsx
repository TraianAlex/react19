import { Link, Outlet, useLocation } from 'react-router-dom';

const TicTacToe: React.FC = () => {
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
                  isActive('tic-tac-toe/game1') || isActive('tic-tac-toe')
                    ? 'active'
                    : ''
                }`}
              >
                <Link
                  to='game1'
                  className={
                    isActive('tic-tac-toe/game1') || isActive('tic-tac-toe')
                      ? 'text-white'
                      : ''
                  }
                >
                  Game 1
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
                  Game 2
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
                  Game 3
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
                  Game 4
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
                  Game 5
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

export default TicTacToe;
