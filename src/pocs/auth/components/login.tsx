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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     await dispatch(loginUserThunk({ email, password })).unwrap();
  //     navigate('/profile');
  //   } catch (err) {
  //     setError('Login failed. Please try again.');
  //   }
  // };

  // FormActions 19.0+
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      navigate('/profile');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='d-flex justify-content-center vh-100'>
      <form
        action={handleSubmit}
        className='d-flex flex-column gap-2 w-25 justify-content-center align-items-center'
      >
        <input
          type='email'
          name='email'
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
          name='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit' className='btn btn-primary ms-2 w-100'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
