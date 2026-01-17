import { useFormStatus } from 'react-dom';

// Separate submit button for contact form
export default function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type='submit' className='btn btn-success' disabled={pending}>
      {pending ? (
        <>
          <span className='spinner-border spinner-border-sm me-2' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </span>
          Sending...
        </>
      ) : (
        'Send Message'
      )}
    </button>
  );
}
