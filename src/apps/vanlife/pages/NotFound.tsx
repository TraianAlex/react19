import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <h1 aria-live='assertive'>
        Sorry, the page you were looking for was not found.
      </h1>
      <Link to='/vanlife' className='link-button'>
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
