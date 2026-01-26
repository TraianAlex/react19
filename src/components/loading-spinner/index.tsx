export const LoadingSpinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-start vh-100'>
      <div
        className='spinner-border text-info'
        style={{ width: '5rem', height: '5rem' }}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
