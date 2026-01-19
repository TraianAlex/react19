import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import SubmitButton from './SubmitButton';
import ContactSubmitButton from './ContactSubmitButton';
import { contactFormAction, createPostAction } from './actions';

function FormStatusIndicator() {
  const { pending, data, method } = useFormStatus();

  if (!pending && !data && !method) return null;

  return (
    <div className='mt-2'>
      <small className='text-muted'>
        Status: {pending ? 'Submitting...' : 'Ready'} | Method:{' '}
        {method || 'None'} | Data: {data ? 'Present' : 'None'}
      </small>
    </div>
  );
}

const initialState = {
  success: false,
  error: undefined,
};

export function FormActionsDemo() {
  const [postState, postAction] = useActionState(
    createPostAction,
    initialState
  );

  const [contactState, contactAction] = useActionState(
    contactFormAction,
    initialState
  );

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col'>
          <h2 className='h4 mb-3'>React 19 Form Actions Demo</h2>
          <p className='text-muted mb-3'>
            React 19 introduces enhanced form handling with actions,
            useActionState, and useFormStatus. These provide built-in pending
            states, error handling, and progressive enhancement.
          </p>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6'>
          <h5>Create Post Form</h5>
          <div className='card p-3 mb-4'>
            <form action={postAction}>
              <div className='mb-3'>
                <label htmlFor='postTitle' className='form-label'>
                  Title
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='postTitle'
                  name='title'
                  required
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='postBody' className='form-label'>
                  Body
                </label>
                <textarea
                  className='form-control'
                  id='postBody'
                  name='body'
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className='mb-3'>
                <label htmlFor='postUserId' className='form-label'>
                  User ID
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='postUserId'
                  name='userId'
                  defaultValue={1}
                  min={1}
                  required
                />
              </div>

              <SubmitButton />
              <FormStatusIndicator />
            </form>

            {postState.error && (
              <div className='alert alert-danger mt-3'>{postState.error}</div>
            )}

            {postState.success && postState.data && (
              <div className='alert alert-success mt-3'>
                <h6 className='alert-heading'>Post Created Successfully!</h6>
                <p className='mb-1'>
                  <strong>Title:</strong> {postState.data.title}
                </p>
                <p className='mb-1'>
                  <strong>ID:</strong> {postState.data.id}
                </p>
                <p className='mb-0'>
                  <strong>User ID:</strong> {postState.data.userId}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className='col-lg-6'>
          <h5>Contact Form</h5>
          <div className='card p-3 mb-4'>
            <form action={contactAction}>
              <div className='mb-3'>
                <label htmlFor='contactName' className='form-label'>
                  Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='contactName'
                  name='name'
                  required
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='contactEmail' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='contactEmail'
                  name='email'
                  required
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='contactMessage' className='form-label'>
                  Message
                </label>
                <textarea
                  className='form-control'
                  id='contactMessage'
                  name='message'
                  rows={4}
                  required
                ></textarea>
              </div>

              <ContactSubmitButton />
            </form>

            {contactState.error && (
              <div className='alert alert-danger mt-3'>
                {contactState.error}
              </div>
            )}

            {contactState.success && contactState.data && (
              <div className='alert alert-success mt-3'>
                <h6 className='alert-heading'>Message Sent!</h6>
                <p className='mb-1'>
                  <strong>Name:</strong> {contactState.data.name}
                </p>
                <p className='mb-0'>
                  <strong>Email:</strong> {contactState.data.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <div className='alert alert-info'>
            <h6 className='alert-heading'>React 19 Form Actions Features:</h6>
            <ul className='mb-0 small'>
              <li>
                <strong>useActionState:</strong> Manages form state and actions
                with built-in error handling
              </li>
              <li>
                <strong>useFormStatus:</strong> Provides pending state and form
                metadata
              </li>
              <li>
                <strong>Progressive Enhancement:</strong> Forms work without
                JavaScript
              </li>
              <li>
                <strong>Automatic Error Boundaries:</strong> Built-in error
                handling for actions
              </li>
              <li>
                <strong>Server Actions:</strong> Seamless server-side form
                processing (simulated here)
              </li>
              <li>
                <strong>Optimistic Updates:</strong> Can be combined with
                useOptimistic
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col'>
          <h6>Form Status Details</h6>
          <div className='card p-3'>
            <div className='row'>
              <div className='col-md-6'>
                <h6 className='small'>Post Form State:</h6>
                <pre className='small bg-light p-2 rounded'>
                  {JSON.stringify(postState, null, 2)}
                </pre>
              </div>
              <div className='col-md-6'>
                <h6 className='small'>Contact Form State:</h6>
                <pre className='small bg-light p-2 rounded'>
                  {JSON.stringify(contactState, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
