import { Link, Outlet } from 'react-router-dom';

const Todos: React.FC = () => {
  return (
    <div className='container mt-5 pt-5'>
      <div className='row'>
        <div className='col'>
          <div className='card' style={{ width: '18rem' }}>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <Link to='todo1'>Todo 1</Link>
              </li>
              <li className='list-group-item'>
                <Link to='todo2'>Todo 2</Link>
              </li>
              <li className='list-group-item'>A third item</li>
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
