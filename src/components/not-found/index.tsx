import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <button className='btn btn-primary' onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default NotFound;
