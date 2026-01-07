import { useActionState } from 'react';
import { saveNameAction } from './actions/save-name';
import SubmitButton from './submit-button';

export default function ServerForm() {
  const [state, formAction, isPending] = useActionState(saveNameAction, null);

  return (
    <form method='POST' action={formAction} className='mt-4'>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input id='name' name='name' type='text' className='form-control' />
      </div>
      <SubmitButton />
      {state?.ok && (
        <div className='alert alert-success mt-3'>Name saved successfully!</div>
      )}
    </form>
  );
}
