import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '../state/authSlice';
import { fetchUsers } from '../services/authService';

const Users = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await fetchUsers();
      return response;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <div className='row'>
        {users?.map((user) => (
          <div className='col-md-4' key={user.id}>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{user.name}</h5>
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className='card-footer'>
                <button
                  className='btn btn-primary'
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
