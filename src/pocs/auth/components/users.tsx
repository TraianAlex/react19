import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchUsersThunk, getUserProfileThunk } from '../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchUsersThunk({ page }));
  }, [dispatch, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const totalPages = users?.totalPages ?? 1;

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: String(nextPage) });
  };

  return (
    <div>
      <h1>Users</h1>
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
                    dispatch(getUserProfileThunk(user.id));
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
      <nav className='d-flex justify-content-center mt-4' aria-label='Users'>
        <ul className='pagination mb-0'>
          <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
            <button
              type='button'
              className='page-link'
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </button>
          </li>
          <li className='page-item active'>
            <span className='page-link'>
              {page} / {totalPages}
            </span>
          </li>
          <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
            <button
              type='button'
              className='page-link'
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Users;
