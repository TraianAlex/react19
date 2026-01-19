import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type='submit' className='btn btn-primary' disabled={pending}>
      {pending ? (
        <>
          <span className='spinner-border spinner-border-sm me-2' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </span>
          Creating Post...
        </>
      ) : (
        'Create Post'
      )}
    </button>
  );
}
