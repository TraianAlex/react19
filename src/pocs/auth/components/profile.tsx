import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../state/store';
import { getUserProfileThunk } from '../state/authSlice';
import LoadingSpinner from '../../../components/loading-spinner';

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfileThunk());
    }

    // Add a 1-second delay for local loading
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, user]);

  if (loading || localLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <h2>Error</h2>
        <p>Error fetching profile information. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card'>
        <img src={user.avatar} alt={`${user.name}'s Avatar`} />
        <div className='card-body'>
          <p>
            <span>Name:</span> {user.name}
          </p>
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>User ID:</span> {user.id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
