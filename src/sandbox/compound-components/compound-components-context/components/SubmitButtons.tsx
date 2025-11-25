import { useEditContactContext } from '../context/useEditContactContext';

export const SubmitButtons = () => {
  const { handleSubmit, isLoading, onCancel } = useEditContactContext();

  return (
    <div className='button-group mt-1'>
      <button
        className='btn btn-primary me-2'
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
      <button className='btn btn-secondary' onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};
