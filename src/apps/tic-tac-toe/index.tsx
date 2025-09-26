import { Link, Outlet } from 'react-router-dom';

const TicTacToe: React.FC = () => {
  return (
    <div className='container mt-5 pt-5'>
      <div className='row'>
        <div className='col'>
          <div className='card' style={{ width: '18rem' }}>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <Link to='game1'>Game 1</Link>
              </li>
              <li className='list-group-item'>
                <Link to='game2'>Game 2</Link>
              </li>
              <li className='list-group-item'>
                <Link to='game3'>Game 3</Link>
              </li>
              <li className='list-group-item'>
                <Link to='game4'>Game 4</Link>
              </li>
              <li className='list-group-item'>
                <Link to='game5'>Game 5</Link>
              </li>
              <li className='list-group-item'>
                <Link to='game6'>Game 6</Link>
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
