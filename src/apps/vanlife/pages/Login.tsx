import { useEffect } from 'react';
import {
  useNavigate,
  useNavigation,
  useLocation,
  useActionData,
  Form,
} from 'react-router-dom';
import { loginUser } from '../api';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem('loggedin', JSON.stringify(true));
    return data;
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'An unknown error occurred',
    };
  }
};

const Login = () => {
  const data = useActionData();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const from = location.state?.from || '/vanlife/host';

  useEffect(() => {
    if (data?.token) {
      navigate(from, { replace: true });
    }
  }, [data, navigate, from]);

  return (
    <div className='login-container'>
      {location.state?.message && (
        <h3 className='login-error'>{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {data?.error && <h3 className='login-error'>{data.error}</h3>}
      <Form method='post' className='login-form'>
        <input name='email' type='email' placeholder='Email address (b@b.com)' />
        <input name='password' type='password' placeholder='Password (p123)' />
        <button disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </Form>
    </div>
  );
};

export default Login;
