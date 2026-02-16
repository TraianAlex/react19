import { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../state/store';
import { getUserProfileThunk } from '../state/authSlice';
import LoadingSpinner from '../../../components/loading-spinner';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, totalUsers } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isPending, startTransition] = useTransition();

  const handleNavigate = (targetId: number) => {
    startTransition(async () => {
      await dispatch(getUserProfileThunk(targetId));
    });
    navigate(`/profile/${targetId}`);
  };

  if ((loading && !user?.id) || isPending) {
    return (
      <div className='mt-5'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!id || !user?.id) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <h2 className='text-danger'>Error fetching profile information.</h2>
        <p className='text-muted'>Please try again later.</p>
      </div>
    );
  }

  const currentId = Number(id);
  const prevId = currentId - 1;
  const nextId = currentId + 1;
  const isLastUser = totalUsers > 0 ? currentId >= totalUsers : false;

  return (
    <>
      <div className='container-fluid mt-5 pt-3 text-center'>
        Fetched by the <code>getUserProfileThunk</code> action.
      </div>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <button
          type='button'
          className='btn btn-outline-primary me-5 d-flex align-items-center gap-2 shadow-sm'
          disabled={prevId === 0}
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
          disabled={isLastUser}
          onClick={() => handleNavigate(nextId)}
        >
          Next
          <span aria-hidden='true'>→</span>
        </button>
      </div>
    </>
  );
};

export default Profile;
