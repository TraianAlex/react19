import { useEffect, useTransition } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchUsersThunk, getUserProfileThunk } from '../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import Pagination from './Pagination';
import LoadingSpinner from '../../../components/loading-spinner';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isPending, startTransition] = useTransition();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page') ?? '1');
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  // const {
  //   data: usersResponse,
  //   isLoading,
  //   error,
  // } = useQuery<{ users: User[]; page: number; totalPages: number }>({
  //   queryKey: ['users', page],
  //   queryFn: async () => {
  //     const response = await fetchUsers(page);
  //     return response;
  //   },
  // });
  const { users, loading, error, totalPages } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(fetchUsersThunk({ page }));
  }, [dispatch, page]);

  if (loading || isPending) {
    return (
      <div className='mt-5'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const totalPages = users?.totalPages ?? 1;

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: String(nextPage) });
  };

  return (
    <div className='container-fluid mt-5 pt-3'>
      <h2>
        Users{' '}
        <span style={{ fontSize: '0.5em' }}>
          fetched by the <code>fetchUsersThunk</code> action.
        </span>
      </h2>
      <div className='row'>
        {users.map((user) => (
          <div className='col-md-4' key={user.id}>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{user.name}</h5>
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className='card-footer'>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    startTransition(async () => {
                      await dispatch(getUserProfileThunk(user.id));
                    });
                    navigate(`/profile/${user.id}`);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Users;
