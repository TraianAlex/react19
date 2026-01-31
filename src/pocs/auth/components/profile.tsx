import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../state/store';
import { getUserProfileThunk } from '../state/authSlice';
import LoadingSpinner from '../../../components/loading-spinner';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (!id || !user) {
      dispatch(getUserProfileThunk(id ?? '2'));
    }
    // Add a 1-second delay for local loading
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, user]);

  if (loading || localLoading) {
    return (
      <div className='mt-5'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!id || !user) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <h2 className='text-danger'>Error fetching profile information.</h2>
        <p className='text-muted'>Please try again later.</p>
      </div>
    );
  }

  const currentId = Number(id ?? user.id ?? 0);
  const prevId = String(currentId - 1);
  const nextId = String(currentId + 1);

  const handleNavigate = (targetId: string) => {
    dispatch(getUserProfileThunk(targetId)).then(() =>
      navigate(`/profile/${targetId}`)
    );
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <button
        type='button'
        className='btn btn-outline-primary me-5 d-flex align-items-center gap-2 shadow-sm'
        onClick={() => handleNavigate(prevId)}
      >
        <span aria-hidden='true'>←</span>
        Previous
      </button>
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
      <button
        type='button'
        className='btn btn-outline-primary ms-5 d-flex align-items-center gap-2 shadow-sm'
        onClick={() => handleNavigate(nextId)}
      >
        Next
        <span aria-hidden='true'>→</span>
      </button>
    </div>
  );
};

export default Profile;
