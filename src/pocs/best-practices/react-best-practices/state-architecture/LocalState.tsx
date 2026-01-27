import { useState } from 'react';

const LocalState = () => {
  return (
    <div className='container-fluid'>
      <h1 className='mb-4'>4. Local Component State</h1>

      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='card border-success mb-4'>
            <div className='card-header bg-success text-white'>
              <h5 className='mb-0'>✅ Good: Local state for component-specific concerns</h5>
            </div>
            <div className='card-body'>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Explanation</h5>
            </div>
            <div className='card-body'>
              <p>
                Local component state belongs in useState or useReducer when scoped to a single 
                component and maybe its immediate children. Think about a modal's open/close flag, 
                a form's current values, or a spinner showing while a component is doing its work.
              </p>
              <p>
                These kinds of state don't need to escape the component, makes sense? Keeping them 
                local reduces noise in the bigger picture and keeps your mental model simpler.
              </p>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header'>
              <h5 className='mb-0'>Code Example</h5>
            </div>
            <div className='card-body'>
              <pre className='bg-light p-3 rounded' style={{ fontSize: '0.875rem' }}>
                <code>{`// ✅ Good: Local state for component-specific concerns
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // These don't need to escape the component
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Good: Local state for component-specific concerns
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    alert(`Login attempted with:\nEmail: ${email}\nPassword: ${password}`);
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <div className='input-group'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
            <button
              type='button'
              className='btn btn-outline-secondary'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          type='submit'
          className='btn btn-primary w-100'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className='mt-3'>
        <small className='text-muted'>
          <strong>Local State Used:</strong>
          <ul className='mb-0 mt-2'>
            <li><code>email</code> - form input value (component-specific)</li>
            <li><code>password</code> - form input value (component-specific)</li>
            <li><code>isSubmitting</code> - loading state (component-specific)</li>
            <li><code>showPassword</code> - UI toggle (component-specific)</li>
          </ul>
          <p className='mb-0 mt-2'>
            These don't need to escape the component - they're only relevant to this form.
            No need to lift them to global state or pass them around.
          </p>
        </small>
      </div>
    </div>
  );
};

export default LocalState;
