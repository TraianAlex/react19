import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../state/store';
import { loginUserThunk } from '../state/authSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Access authentication state
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [email, setEmail] = useState('eve.holt@reqres.in'); // Pre-filled for testing purposes
  const [password, setPassword] = useState('cityslicka'); // Pre-filled for testing purposes
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to profile if the user is already authenticated
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      navigate('/profile');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <form onSubmit={handleSubmit} className='d-flex'>
        <input
          type='email'
          className='form-control'
          placeholder='Email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <input
          type='password'
          className='form-control ms-2'
          placeholder='Password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit' className='btn btn-primary ms-2'>Login</button>
      </form>
    </div>
  );
};

export default Login;
